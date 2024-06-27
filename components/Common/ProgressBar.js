import React from "react";
import styles from "../../styles/ProgressBar.module.css";

const ProgressBar = ({ title, percentage, color }) => {
    return <div className={styles.progressBarContainer}>
        <span className={styles.progressBarTitle}>
            {title}
        </span>
        <div className={styles.progressBar}>
            <div className={styles.progressBarFill}
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                }}
            />
        </div>
    </div>;
};

export default ProgressBar;
