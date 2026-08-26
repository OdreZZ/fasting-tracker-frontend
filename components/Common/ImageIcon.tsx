import styles from "../../styles/components/Common/ImageIcon.module.css";
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
    onClick?: () => void,
}

export default function ImageIcon({
    src,
    size = ICON_SIZE.STANDARD,
    className,
    onClick,
}: ImageIconProps) {
    return <div className={styles.imageIcon}>
        <Image src={`/icons/${src}`}
            className={className || styles.wowIcon}
            width={size}
            height={size}
            onClick={onClick}
            alt=""
        />
        {className === undefined && (
            <div className={styles.iconLink} />
        )}
        {className === undefined && (
            <div className={styles.iconBorder} />
        )}
    </div>
};