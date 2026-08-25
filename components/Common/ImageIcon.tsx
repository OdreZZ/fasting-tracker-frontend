import Image from "next/image";

export const ICON_SIZE = {
    SMALL: 32,
    STANDARD: 50,
    LARGE: 76,
};

interface ImageIconProps {
    src: string,
    size?: number,
    className?: string,
}

export default function ImageIcon({
    src,
    size = ICON_SIZE.STANDARD,
    className,
}: ImageIconProps) {
    return <Image src={`/icons/${src}`}
        className={className}
        width={size}
        height={size}
        alt=""
    />
};