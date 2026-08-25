import { PROGRESS_VIEW } from "@/pages";
import styles from "../../styles/components/Container/TimePassedContainer.module.css";
import CircularProgressBar from "@/components/Common/CircularProgressBar";

export default function TimePassedContainer({
    percentageDone,
    toggleView,
    areColonsShown,
    view,
    timeDiff,
}) {
    const {
        hours,
        minutes,
        seconds,
    } = timeDiff;
    
    return <div className={styles.timePassedContainer}>
        <CircularProgressBar
            percentage={percentageDone}
        />

        <div className={styles.timePassed}
            onClick={toggleView}
        >
            <div className={styles.timePassedText}>
                {view === PROGRESS_VIEW.TIME_PASSED && (
                    <div className={styles.timePassedCount}>
                        {Math.abs(hours).toString().padStart(2, '0')}
                        {areColonsShown ? ":" : " "}
                        {Math.abs(minutes).toString().padStart(2, '0')}
                        {areColonsShown ? ":" : " "}
                        {Math.abs(seconds).toString().padStart(2, '0')}
                    </div>
                )}

                {view === PROGRESS_VIEW.PERC_PASSED && (
                    <div className={styles.percPassedCount}>
                        {percentageDone.toFixed(2)}%
                    </div>
                )}
            </div>
        </div>
    </div>
}