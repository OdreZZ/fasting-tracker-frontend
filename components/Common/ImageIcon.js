import Image from "next/image";

export const ICON_SIZE = {
    SMALL: 32,
    STANDARD: 50,
    LARGE: 76,
};

export default function ImageIcon({
    src,
    size = ICON_SIZE.STANDARD,
    className,
}) {
    return <Image src={`/icons/${src}`}
        className={className}
        width={size}
        height={size}
        alt=""
    />
};