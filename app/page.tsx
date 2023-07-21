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
} from "reactflow";
import clsx from "clsx";
import "reactflow/dist/style.css";
import Handles from "@/components/Handles";
import RotateButton from "@/components/RotateButton";
import DuctShape from "@/components/DuctShape";
import Panels from "@/components/Panels";

const initialNodes: Node[] = [
    {
        id: "1",
        type: "custom",
        data: { type: "tri-duct" },
        position: { x: 0, y: 50 },
    },
    {
        id: "2",
        type: "custom",
        data: { type: "two-duct" },

        position: { x: -200, y: 200 },
    },
    {
        id: "3",
        type: "custom",
        data: { type: "duct-end" },
        position: { x: 200, y: 200 },
    },
    {
        id: "4",
        type: "custom",
        data: { type: "rect" },
        position: { x: 50, y: 200 },
    },
];
// const initialEdges: Edge[] = [{ id: '1-2', source: '1', target: '2', label: "to the", type: "step" }];
const initialEdges: Edge[] = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        type: "straight",
    },
    {
        id: "e1-3",
        source: "1",
        target: "3",
        type: "straight",
    },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
    const connectingNodeId = useRef<string | null>(null);

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

    // const onConnectEnd = useCallback((event) => {});
    return (
        <div className="">
            <ReactFlowProvider>
                <div className="w-screen h-[100dvh]" ref={reactFlowWrapper}>
                    <ReactFlow
                        fitView
                        className="bg-teal-50 touchdevice-flow"
                        nodeTypes={nodeTypes}
                        snapGrid={[14, 14]}
                        onInit={setReactFlowInstance}
                        snapToGrid
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnectStart={onConnectStart}
                        onConnect={onConnect}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                    >
                        <MiniMap />
                        <NodeResizer />
                        <Sidebar />
                        {/* <Panels /> */}
                        <Background
                            variant={"dots" as BackgroundVariant}
                            gap={14}
                            size={1}
                            color="#ccc"
                        />
                        <NodeToolbar />
                        <Controls />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
}

function CustomNode({ data, isConnectable }: NodeProps) {
    const [rotation, setRotation] = useState(0);

    const onRotateHandler = () => {
        setRotation((prev) => prev + 90);
    };
    return (
        <div className="relative group">
            <div
                className={clsx(
                    "flex relative",
                    rotation % 360 === 0 && "rotate-0",
                    rotation % 360 === 90 && "rotate-90",
                    rotation % 360 === 180 && "rotate-180",
                    rotation % 360 === 270 && "-rotate-90"
                )}
            >
                <DuctShape type={data.type} />
                <RotateButton onRotateHandler={onRotateHandler} type={data.type} />
                <Handles type={data.type} isConnectable={isConnectable} />
            </div>
        </div>
    );
}

export const Sidebar = () => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        const ductType = event.currentTarget.dataset.type;
        event.dataTransfer.setData("application/reactflow", ductType!);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside className="absolute z-50 flex gap-2 mt-4 ml-4">
            <DuctDraggable type="rect" onDragStart={onDragStart} />
            <DuctDraggable type="two-duct" onDragStart={onDragStart} />
            <DuctDraggable type="tri-duct" onDragStart={onDragStart} />
            <DuctDraggable type="duct-end" onDragStart={onDragStart} />
        </aside>
    );
};

const DuctDraggable = ({
    type,
    onDragStart,
}: {
    type: string;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}) => {
    return (
        <div
            data-type={type}
            onDragStart={onDragStart}
            draggable
            className="bg-green-200 outline outline-2 outline-white rounded-lg w-12 p-2 h-12 flex justify-center items-center"
        >
            <DuctShape type={type} />
        </div>
    );
};
