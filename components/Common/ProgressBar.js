import React from "react";
import styles from "../../styles/ProgressBar.module.css";

const ProgressBar = ({ title, percentage, color, icon, iconPng }) => {
    let iconRender = icon;
    if (iconPng) {
        iconRender = <img className={styles.progressBarIcon} src={`/icons/${iconPng}`} />
    }

    return <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
            <div className={styles.progressBarFill}
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                }}
            />

            <div className={styles.progressBarText}>
                <div className={styles.progressBarTitle}>{iconRender} {title}</div>

                <div>{percentage.toFixed(0)}%</div>
            </div>
        </div>
    </div>
};

export default ProgressBar;
