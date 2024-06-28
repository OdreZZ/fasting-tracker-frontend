import React, { useState } from "react";
import styles from "../../styles/ProgressBar.module.css";

const ProgressBar = ({ title, percentage, color }) => {
    const [isPercentageShown, setIsPercentageShown] = useState(false);

    return <div className={styles.progressBarContainer}>
        <div className={styles.progressBarTitle}>
            {title}
        </div>

        <div className={styles.progressBar}
            onClick={() => setIsPercentageShown(prev => !prev)}
        >
            <div className={styles.progressBarFill}
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                }}
            />

            {isPercentageShown && (
                <div className={styles.progressBarPercentage}>
                    {percentage.toFixed(2)}%
                </div>
            )}
        </div>
    </div>
};

export default ProgressBar;
