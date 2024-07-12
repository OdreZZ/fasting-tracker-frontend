import React from "react";
import styles from "../../styles/ProgressBar.module.css";

const ProgressBar = ({ title, percentage, color }) => {
    return <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
            <div className={styles.progressBarFill}
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                }}
            />

            <div className={styles.progressBarText}>
                <div>{title}</div>

                <div>{percentage.toFixed(0)}%</div>
            </div>
        </div>
    </div>
};

export default ProgressBar;
