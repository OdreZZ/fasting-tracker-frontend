import styles from "../../styles/components/Common/ProgressBar.module.css";
import ImageIcon from "./ImageIcon";

interface ProgressBarProps {
    title: string,
    percentage: number,
    color: string,
    iconSrc: string,
}

export default function ProgressBar({ title, percentage, color, iconSrc }: ProgressBarProps) {
    return <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
            <div className={styles.progressBarFill}
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                }}
            />

            <div className={styles.progressBarText}>
                <div className={styles.progressBarTitle}><ImageIcon src={iconSrc} /> {title}</div>

                <div>{percentage.toFixed(0)}%</div>
            </div>
        </div>
    </div>
};
