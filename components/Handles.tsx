import { Handle, Position } from "reactflow";

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
    } else if (type === "rect") {
        return (
            <>
                <Handle
                    id="a"
                    type="source"
                    position={Position.Top}
                    className="!bg-green-400 !shadow  !w-6 !h-2 !rounded-sm"
                    isConnectable={isConnectable}
                />
                <Handle
                    id="b"
                    type="source"
                    position={Position.Left}
                    className=" !bg-green-400 !shadow  !w-2 !h-6 !rounded-sm "
                    isConnectable={isConnectable}
                />
                <Handle
                    id="c"
                    type="source"
                    position={Position.Right}
                    className=" !bg-green-400 !shadow  !w-2 !h-6 !rounded-sm"
                    isConnectable={isConnectable}
                />
                <Handle
                    id="d"
                    type="source"
                    position={Position.Bottom}
                    className=" !bg-green-400 !shadow  !w-6 !h-2 !rounded-sm "
                    isConnectable={isConnectable}
                />
                {/* <Handle id="b" type="source" position={Position.Bottom} className="!bg-green-400 !rounded-sm" isConnectable={isConnectable}/> */}
            </>
        );
    }
    return null;
};

export default Handles;
