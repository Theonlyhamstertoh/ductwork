import clsx from "clsx";
import Image from "next/image";

const RotateButton = ({ onRotateHandler, type }: { onRotateHandler: () => void; type: string }) => {
    return (
        <button
            onClick={onRotateHandler}
            className={clsx(
                `absolute m-auto w-fit left-0 bottom-2.5 active:scale-105 active:bg-green-300 outline outline-blue-600 bg-white rounded-full p-1 right-0 `,
                type === "rect" && "hidden"
            )}
        >
            <Image src="rotate.svg" width="14" height="14" alt="Rotate Duct Pipe" />
        </button>
    );
};

export default RotateButton;
