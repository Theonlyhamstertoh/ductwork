import Image from "next/image";

const DuctShape = ({ type }: { type: string }) => {
    const width = type === "two-duct" ? 84 : type === "rect" ? 42 : 126;
    return <Image src={`${type}.svg`} width={width} height="100" alt="Duct Shape" />;
};

export default DuctShape;
