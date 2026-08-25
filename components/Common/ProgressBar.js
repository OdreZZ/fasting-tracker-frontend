import React from "react";
import styles from "../../styles/components/Common/ProgressBar.module.css";
import ImageIcon from "./ImageIcon";

const ProgressBar = ({ title, percentage, color, iconPng }) => {
    return <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}>
            <div className={styles.progressBarFill}
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                }}
            />

            <div className={styles.progressBarText}>
                <div className={styles.progressBarTitle}><ImageIcon src={iconPng} /> {title}</div>

                <div>{percentage.toFixed(0)}%</div>
            </div>
        </div>
    </div>
};

export default ProgressBar;
