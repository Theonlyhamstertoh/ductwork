"use client";
import Image from "next/image";
import React, { DragEvent, DragEventHandler, useCallback, useMemo, useRef, useState } from "react";
import ReactFlow, {
    Controls,
    MiniMap,
    NodeResizer,
    NodeToolbar,
    useNodesState,
    useEdgesState,
    addEdge,
    Background,
    BackgroundVariant,
    Edge,
    EdgeProps,
    Node,
    OnConnect,
    EdgeTypes,
    getBezierPath,
    BaseEdge,
    EdgeLabelRenderer,
    Handle,
    Position,
    NodeProps,
    Panel,
    useReactFlow,
    ReactFlowProvider,
    OnConnectStart,
    ReactFlowInstance,
    OnConnectEnd,
} from "reactflow";
import clsx from "clsx";
import "reactflow/dist/style.css";
import Handles from "@/components/Handles";
import RotateButton from "@/components/RotateButton";
import DuctShape from "@/components/DuctShape";
import Panels from "@/components/Panels";
import Sidebar from "@/components/Sidebar";
import CustomNode from "@/components/CustomNode";
import CustomEdge from "@/components/CustomEdge";
import CustomConnectionLine from "@/components/CustomConnectionLine";

const initialNodes: Node[] = [
    {
        id: "0",
        type: "custom",
        data: { type: "rect" },
        position: { x: 0, y: 50 },
    },
    // {
    //     id: "2",
    //     type: "custom",
    //     data: { type: "two-duct" },

    //     position: { x: -200, y: 200 },
    // },
    // {
    //     id: "3",
    //     type: "custom",
    //     data: { type: "duct-end" },
    //     position: { x: 200, y: 200 },
    // },
    // {
    //     id: "4",
    //     type: "custom",
    //     data: { type: "rect" },
    //     position: { x: 50, y: 200 },
    // },
];
// const initialEdges: Edge[] = [{ id: '1-2', source: '1', target: '2', label: "to the", type: "step" }];
const initialEdges: Edge[] = [
    // {
    //     id: "e1-2",
    //     source: "1",
    //     target: "2",
    //     type: "straight",
    // },
    // {
    //     id: "e1-3",
    //     source: "1",
    //     target: "3",
    //     type: "straight",
    // },
];

let id = 1;
const getId = () => `${id++}`;

export function Flow(props) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
    // const edgeTypes = useMemo(() => ({ custom: CustomEdge }));
    const connectingNodeId = useRef<string | null>(null);
    const { project } = useReactFlow();

    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: DragEvent) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current!.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");

            console.log(type);
            // check if the dropped element is valid
            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = reactFlowInstance!.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode: Node = {
                id: getId(),
                type: "custom",
                position,
                data: { type },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    // const edgeTypes = useMemo(() => ({ special: CustomEdge }), []);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
        console.log(" on connect start", nodeId);
    }, []);

    const onConnectEnd: OnConnectEnd = useCallback(
        (event) => {
            const targetIsPane = event.target!.classList.contains("react-flow__pane");

            if (targetIsPane) {
                // we need to remove the wrapper bounds, in order to get the correct position
                const { top, left } = reactFlowWrapper.current!.getBoundingClientRect();
                const id = getId();
                const newNode = {
                    id,
                    type: "custom",
                    // we are removing the half of the node width (75) to center the new node
                    position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
                    data: { type: "rect" },
                };

                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) =>
                    eds.concat({
                        id,
                        source: connectingNodeId.current,
                        type: "custom",
                        target: id,
                    })
                );
            }
        },
        [project]
    );
    // const onConnectEnd = useCallback((event) => {});
    return (
        <div className="w-screen h-[100dvh]" ref={reactFlowWrapper}>
            <ReactFlow
                fitView
                className="bg-teal-50 touchdevice-flow"
                nodeTypes={nodeTypes}
                snapGrid={[14, 14]}
                onInit={setReactFlowInstance}
                snapToGrid
                nodes={nodes}
                onConnectEnd={onConnectEnd}
                // connectionLineComponent={CustomConnectionLine}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnectStart={onConnectStart}
                onConnect={onConnect}
                onDrop={onDrop}
                // edgeTypes={{ custom: CustomEdge }}
                onDragOver={onDragOver}
            >
                <MiniMap />
                <NodeResizer />
                <Sidebar />
                {/* <Panels /> */}
                <Background variant={"dots" as BackgroundVariant} gap={14} size={1} color="#ccc" />
                <NodeToolbar />
                <Controls />
            </ReactFlow>
        </div>
    );
}
export default function App() {
    return (
        <div>
            <FlowWithProvider />
        </div>
    );
}

function FlowWithProvider() {
    return (
        <ReactFlowProvider>
            <Flow />
        </ReactFlowProvider>
    );
}
