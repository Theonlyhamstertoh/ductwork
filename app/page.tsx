"use client";
import Image from "next/image";
import React, { useCallback, useMemo, useRef, useState } from "react";
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
} from "reactflow";
import clsx from "clsx";
import "reactflow/dist/style.css";

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

export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const reactFlowWrapper = useRef(null);

    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
    // const edgeTypes = useMemo(() => ({ special: CustomEdge }), []);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    return (
        <div className="w-screen h-screen" ref={reactFlowWrapper}>
            <ReactFlow
                fitView
                className="bg-teal-50"
                nodeTypes={nodeTypes}
                snapGrid={[14, 14]}
                snapToGrid
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <MiniMap />
                {/* <Handle type="target" position={Position.Left} />
          <Handle type="target" position={Position.Right} /> */}
                <NodeResizer />
                <Panel position="top-left">Top left</Panel>
                <Background variant={"dots" as BackgroundVariant} gap={14} size={1} color="#ccc" />
                <NodeToolbar />
                <Controls />
            </ReactFlow>
        </div>
    );
}

function CustomNode({ data, isConnectable }: NodeProps) {
    const [rotation, setRotation] = useState(0);
    const width = data.type === "two-duct" ? 84 : 126;

    console.log(rotation);
    const onHoverHandler = () => {};
    return (
        <div className="relative group">
            <div
                onMouseOver={onHoverHandler}
                className={clsx(
                    "flex relative",
                    rotation % 360 === 0 && "rotate-0",
                    rotation % 360 === 90 && "rotate-90",
                    rotation % 360 === 180 && "rotate-180",
                    rotation % 360 === 270 && "-rotate-90"
                )}
            >
                <Image
                    src={`${data.type}.svg`}
                    width={width}
                    height="100"
                    alt="Tri duct connector"
                />
                <button
                    onClick={() => setRotation((prev) => prev + 90)}
                    className={`absolute m-auto w-fit left-0 bottom-2.5 active:scale-105 active:bg-green-300 outline outline-blue-600 bg-white rounded-full p-1 right-0 `}
                >
                    <Image src="rotate.svg" width="14" height="14" alt="Rotate Duct Pipe" />
                </button>
                <Handles type={data.type} isConnectable={isConnectable} />
                {/* <Handle id="b" type="source"  position={Position.Top} style={{left: 5}} className=" !bg-green-400 !rounded-sm" isConnectable={isConnectable}/> */}
                {/* <Handle type="source" position={Position.Left} className="!h-4 !rounded-none !border-none !bg-green-400 !rounded-sm" /> */}
                {/* <Handle type="target" position={Position.Right} className="!h-4 !w-[0.1px] !translate-y-[0.3px] !rounded-none !border-none" /> */}
                {/* <Handle id="b" type="source" position={Position.Left} className=" !bg-green-400 !rounded-sm" isConnectable={isConnectable}/> */}
                {/* <Handle  id="c" type="source" position={Position.Right} className=" !bg-green-400 !rounded-sm" isConnectable={isConnectable}/> */}
            </div>
        </div>
    );
}

const Handles = ({ type, isConnectable }: { type: string; isConnectable: boolean }) => {
    if (type === "duct-end") {
        return (
            <>
                <Handle
                    id="a"
                    type="source"
                    position={Position.Top}
                    className="!bg-green-400  !shadow  !w-6 !h-2 !rounded-sm"
                    isConnectable={isConnectable}
                />
                <Handle
                    id="b"
                    type="source"
                    position={Position.Bottom}
                    className="!bg-green-400  !shadow  !w-6 !h-2  !rounded-sm"
                    isConnectable={isConnectable}
                />
            </>
        );
    } else if (type === "tri-duct") {
        return (
            <>
                <Handle
                    id="a"
                    type="source"
                    position={Position.Top}
                    className="!bg-green-400 !shadow  !w-6 !h-2  !rounded-sm"
                    isConnectable={isConnectable}
                />
                <Handle
                    id="b"
                    type="source"
                    position={Position.Left}
                    className="!bg-green-400 !shadow  !w-2 !h-6 !rounded-sm !top-16"
                    isConnectable={isConnectable}
                />
                <Handle
                    id="c"
                    type="source"
                    position={Position.Right}
                    className="!bg-green-400 !shadow  !w-2 !h-6 !rounded-sm !top-16"
                    isConnectable={isConnectable}
                />
                {/* <Handle id="b" type="source" position={Position.Bottom} className="!bg-green-400 !rounded-sm" isConnectable={isConnectable}/> */}
            </>
        );
    } else if (type === "two-duct") {
        return (
            <>
                <Handle
                    id="a"
                    type="source"
                    position={Position.Top}
                    className="!bg-green-400 !shadow  !w-6 !h-2 !rounded-sm !left-[3.75rem]"
                    isConnectable={isConnectable}
                />
                <Handle
                    id="b"
                    type="source"
                    position={Position.Left}
                    className=" !bg-green-400 !shadow  !w-2 !h-6 !rounded-sm  !top-16"
                    isConnectable={isConnectable}
                />
                {/* <Handle id="b" type="source" position={Position.Bottom} className="!bg-green-400 !rounded-sm" isConnectable={isConnectable}/> */}
            </>
        );
    }
    return null;
};
