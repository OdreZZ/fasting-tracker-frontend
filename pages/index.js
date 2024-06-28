import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import { getProgressData, getTimeDiff } from "@/utils/date-calculations";
import { getFastGoalDate, getFastStartingDate, updateFastGoalDate, updateFastStartingDate } from "@/utils/local-storage";
import styles from "../styles/Homepage.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "@/components/Common/ProgressBar";
import CircularProgressBar from "@/components/Common/CircularProgressBar";

const PROGRESS_VIEW = {
    TIME_PASSED: "TIME_PASSED",
    PERC_PASSED: "PERC_PASSED",
};

export default function Homepage() {
    const { t } = useTranslation();

    const [view, setView] = useState(PROGRESS_VIEW.TIME_PASSED);
    const [phase, setPhase] = useState(0);
    const [details, setDetails] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [timeDiff, setTimeDiff] = useState(getTimeDiff(new Date()));
    const [percentageDone, setPercentageDone] = useState(0);
    const [hungerLevel, setHungerLevel] = useState(0);
    const [autophagyLevel, setAuthophagyLevel] = useState(0);

    const {
        days,
        hours,
        minutes,
        seconds,
    } = timeDiff;

    const toggleView = () => {
        setView(prev => {
            if (prev === PROGRESS_VIEW.TIME_PASSED) {
                return PROGRESS_VIEW.PERC_PASSED;
            } else if (prev === PROGRESS_VIEW.PERC_PASSED) {
                return PROGRESS_VIEW.TIME_PASSED;
            }
        });
    }

    const updateStartDate = (date) => {
        setStartDate(date);
        updateFastStartingDate(date);
    }

    const updateEndDate = (date) => {
        setEndDate(date);
        updateFastGoalDate(date);
    }

    const updateData = () => {
        const newTimeDiff = getTimeDiff(startDate);
        setTimeDiff(newTimeDiff);

        const {
            phase,
            phaseDetails,
            percentageOfGoal,
            newHungerLevel,
            newAutophagyLevel,
        } = getProgressData(startDate, endDate);

        setPhase(phase);
        setDetails(phaseDetails);
        setHungerLevel(newHungerLevel);
        setAuthophagyLevel(newAutophagyLevel);
        setPercentageDone(percentageOfGoal);
    }

    useEffect(() => {
        const cachedStartDate = getFastStartingDate();
        const cachedEndDate = getFastGoalDate();

        if (cachedStartDate) {
            setStartDate(new Date(cachedStartDate));
        }
        if (cachedEndDate) {
            setEndDate(new Date(cachedEndDate));
        }
    }, []);

    useEffect(() => {
        updateData();

        const interval = setInterval(() => {
            updateData();
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate, endDate]);

    return <div className={styles.homepage}>
        <div className={styles.datePickersContainer}>
            <div>
                Start and Goal Dates
            </div>

            <div className={styles.datePickerContainer}>
                <div className={styles.datePicker}>
                    <DatePicker
                        className={styles.datePickerInput}
                        selected={startDate}
                        onChange={updateStartDate}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>

                <div className={styles.datePicker}>
                    <DatePicker
                        className={styles.datePickerInput}
                        selected={endDate}
                        onChange={updateEndDate}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>
            </div>
        </div>

        <div className={styles.timePassedContainer}>
            <CircularProgressBar
                percentage={percentageDone}
            />

            <div className={styles.timePassed}
                onClick={toggleView}
            >
                <div className={styles.timePassedText}>
                    {view === PROGRESS_VIEW.TIME_PASSED && (
                        <div className={styles.timePassedCount}>
                            {Math.abs(days) > 0 && `${Math.abs(days)}d `}
                            {Math.abs(hours) > 0 && `${Math.abs(hours)}h `}
                            {Math.abs(minutes) > 0 && `${Math.abs(minutes)}min `}
                            {Math.abs(seconds) > 0 && `${Math.abs(seconds)}sec `}
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

        <div className={styles.progressBars}>
            <div className={styles.progressBarsTitle}>
                {details.name} Phase
            </div>

            <ProgressBar
                title="Hunger"
                percentage={hungerLevel}
                color="red"
            />

            <ProgressBar
                title="Autophagy"
                percentage={autophagyLevel}
                color="green"
            />
        </div>
    </div>;
}

Homepage.getInitialProps = async () => {
    return { pageTitle: "title" };
};
