import styles from "../../styles/components/Container/TimePassedContainer.module.css";
import CircularProgressBar from "@/components/Common/CircularProgressBar";
import { PROGRESS_VIEW, useZustandSelector, useZustandStore } from "@/stores/ZustandStore";
import { useShallow } from "zustand/shallow";

export default function TimePassedContainer() {
    const {
        view,
        timeDiff,
        percentageDone,
        areColonsShown,
        areOptionsShown,
        setView,
        setAreOptionsShown,
    } = useZustandStore(useShallow(useZustandSelector));

    const {
        hours,
        minutes,
        seconds,
    } = timeDiff;

    const toggleView = () => {
        setAreOptionsShown(!areOptionsShown);
        if (view === PROGRESS_VIEW.TIME_PASSED) {
            setView(PROGRESS_VIEW.PERC_PASSED);
        } else if (view === PROGRESS_VIEW.PERC_PASSED) {
            setView(PROGRESS_VIEW.TIME_PASSED);
        }
    }
    
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