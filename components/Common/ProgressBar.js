import React, { useState } from "react";
import styles from "../../styles/ProgressBar.module.css";

const ProgressBar = ({ title, percentage, color }) => {
    const [isPercentageShown, setIsPercentageShown] = useState(false);

    return <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}
            onClick={() => setIsPercentageShown(prev => !prev)}
        >
            <div className={styles.progressBarFill}
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                }}
            />

            <div className={styles.progressBarText}>
                {!isPercentageShown && (
                    <div>{title}</div>
                )}

                {isPercentageShown && (
                    <div>{percentage.toFixed(0)}%</div>
                )}
            </div>
        </div>
    </div>
};

export default ProgressBar;
