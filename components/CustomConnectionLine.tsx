import React from "react";
import { ConnectionLineComponentProps } from "reactflow";

const CustomConnectionLine = ({
    fromX,
    fromY,
    fromPosition,
    toX,
    toY,
    toPosition,
    connectionLineType,
    connectionLineStyle,
    fromHandle,
    fromNode,
}: ConnectionLineComponentProps) => {
    console.log(
        "fromX",
        fromX,
        "fromY",
        fromY,
        "toX",
        toX,
        "toY",
        toY,
        "fromHandle",
        fromHandle,
        "fromNode",
        fromNode
    );
    const isVertical = fromX === toX;
    const isHorizontal = fromY === toY;
    const isMovingUp = fromY > toY;
    const isMovingDown = fromY < toY;
    const isMovingLeft = fromX > toX;
    const isMovingRight = fromX < toX;

    let dAttribute = `M${fromX},${fromY}`;

    if (fromHandle?.position === "top") {
        // Diagonal line from top (can only move down or horizontally)
        dAttribute = `M${fromX},${fromY} V${toY}`;
    } else if (fromHandle?.position === "bottom") {
        // Diagonal line from bottom (can only move up or horizontally)
        dAttribute = `M${fromX},${fromY} V${toY}`;
    } else if (fromHandle?.position === "left") {
        // Diagonal line from left (can only move right or vertically)
        dAttribute = `M${fromX},${fromY} H${toX}`;
    } else if (fromHandle?.position === "right") {
        // Diagonal line from right (can only move left or vertically)
        dAttribute = `M${fromX},${fromY} H${toX}`;
    }

    return (
        <>
            <g>
                <path
                    fill="none"
                    className="animated stroke-green-400 stroke-[20px]"
                    d={dAttribute}
                />
                <circle cx={toX} cy={toY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
            </g>
        </>
    );
};

export default CustomConnectionLine;
