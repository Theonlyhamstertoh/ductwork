import { useState } from "react";
import DuctShape from "./DuctShape";
import Handles from "./Handles";
import RotateButton from "./RotateButton";
import { NodeProps } from "reactflow";
import clsx from "clsx";

const CustomNode = ({ data, isConnectable }: NodeProps) => {
    const [rotation, setRotation] = useState(0);

    const onRotateHandler = () => {
        setRotation((prev) => prev + 90);
    };
    return (
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
    );
};

export default CustomNode;
