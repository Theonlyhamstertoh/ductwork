import DuctShape from "./DuctShape";

const Sidebar = () => {
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

export default Sidebar;
