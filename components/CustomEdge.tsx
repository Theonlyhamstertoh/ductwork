import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, getStraightPath } from "reactflow";

// const onEdgeClick = (evt, id) => {
//     evt.stopPropagation();
//     alert(`remove ${id}`);
// };

// 1 foot === 14 pixels

const PIXELS_PER_FOOT = 42; // Conversion factor: 1 foot = 14 pixels

function calculateLengthInFeet(sourceX: number, sourceY: number, targetX: number, targetY: number) {
    // Vertical line
    const distanceInPixels = Math.abs(targetX - sourceX);
    const lengthInFeet = distanceInPixels / PIXELS_PER_FOOT;
    return lengthInFeet.toFixed(0); // Rounding the length to 2 decimal places
}

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) {
    // const isVertical = sourceX === targetX;
    // const isHorizontal = sourceY === targetY;
    // const isMovingUp = sourceY > targetY;
    // const isMovingDown = sourceY < targetY;
    // const isMovingLeft = sourceX > targetX;
    // const isMovingRight = sourceX < targetX;

    // let edgePath = `M${sourceX},${sourceY}`;

    // if (isVertical && isMovingUp) {
    //     // Vertical line moving up
    //     edgePath += `V${targetY}`;
    // } else if (isVertical && isMovingDown) {
    //     // Vertical line moving down
    //     edgePath += `V${targetY}`;
    // } else if (isHorizontal && isMovingLeft) {
    //     // Horizontal line moving left
    //     edgePath += `H${targetX}`;
    // } else if (isHorizontal && isMovingRight) {
    //     // Horizontal line moving right
    //     edgePath += `H${targetX}`;
    // } else if (sourcePosition === "top") {
    //     // Diagonal line from top (can only move down or horizontally)
    //     edgePath = `M${sourceX},${sourceY} V${targetY}`;
    // } else if (sourcePosition === "bottom") {
    //     // Diagonal line from bottom (can only move up or horizontally)
    //     edgePath = `M${sourceX},${sourceY} V${targetY}`;
    // } else if (sourcePosition === "left") {
    //     // Diagonal line from left (can only move right or vertically)
    //     edgePath = `M${sourceX},${sourceY} H${targetX}`;
    // } else if (sourcePosition === "right") {
    //     // Diagonal line from right (can only move left or vertically)
    //     edgePath = `M${sourceX},${sourceY} H${targetX}`;
    // }

    const lengthInFeet = calculateLengthInFeet(sourceX, sourceY, targetX, targetY);

    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    return (
        <>
            <path
                id={id}
                style={style}
                className="stroke-[20px] stroke-blue-600 fill-none "
                d={edgePath}
                markerEnd={markerEnd}
            />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        top: (sourceY + targetY) / 2,
                        left: (sourceX + targetX) / 2,
                        transform: `translate(-50%, -30%)`,
                    }}
                    className="nodrag nopan text-xs text-white  bg-blue-600"
                >
                    Length: {lengthInFeet} feet
                </div>
            </EdgeLabelRenderer>
            {/* <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} /> */}
            {/* <EdgeLabelRenderer>
                <div
                    style={{
                        position: "absolute",
                        // transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: 12,
                        // everything inside EdgeLabelRenderer has no pointer events by default
                        // if you have an interactive element, set pointer-events: all
                        pointerEvents: "all",
                    }}
                    className="nodrag nopan"
                >
                    <button className="bg-green-100 " onClick={(event) => onEdgeClick(event, id)}>
                        ×
                    </button>
                </div>
            </EdgeLabelRenderer> */}
        </>
    );
}
