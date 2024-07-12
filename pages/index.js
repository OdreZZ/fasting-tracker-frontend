import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import { getProgressData, getTimeDiff } from "@/utils/date-calculations";
import { getFastGoalDate, getFastStartingDate, updateFastGoalDate, updateFastStartingDate } from "@/utils/local-storage";
import styles from "../styles/Homepage.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "@/components/Common/ProgressBar";
import CircularProgressBar from "@/components/Common/CircularProgressBar";
import { useRouter } from "next/router";

const PROGRESS_VIEW = {
    TIME_PASSED: "TIME_PASSED",
    PERC_PASSED: "PERC_PASSED",
};

export default function Homepage({ start, end, preventCache }) {
    const { t } = useTranslation();
    const router = useRouter();

    const [view, setView] = useState(PROGRESS_VIEW.TIME_PASSED);
    const [phase, setPhase] = useState(0);
    const [details, setDetails] = useState({});
    const [startDate, setStartDate] = useState(new Date(parseInt(start)));
    const [endDate, setEndDate] = useState(new Date(parseInt(end)));
    const [timeDiff, setTimeDiff] = useState(getTimeDiff(new Date()));
    const [percentageDone, setPercentageDone] = useState(0);
    const [hungerLevel, setHungerLevel] = useState(0);
    const [autophagyLevel, setAuthophagyLevel] = useState(0);
    const [healthBoost, setHealthBoost] = useState(0);
    const [mentalBoost, setMentalBoost] = useState(0);
    const [nicotineCraving, setNicotineCraving] = useState(0);
    const [nicotineInBlood, setNicotineInBlood] = useState(0);
    const [irritabilityLevel, setIrritabilityLevel] = useState(0);
    const [areColonsShown, setAreColonsShown] = useState(true);
    const [areDatesShown, setAreDatesShown] = useState(false);

    const {
        hours,
        minutes,
        seconds,
    } = timeDiff;

    const toggleView = () => {
        setAreDatesShown(prev => !prev);
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

        router.push({
            pathname: '/',
            query: { start: date.getTime(), end: endDate.getTime() },
        });
    }

    const updateEndDate = (date) => {
        setEndDate(date);
        updateFastGoalDate(date);

        router.push({
            pathname: '/',
            query: { start: startDate.getTime(), end: endDate.getTime() },
        });
    }

    const updateData = () => {
        const newTimeDiff = getTimeDiff(startDate);
        setTimeDiff(newTimeDiff);

        const {
            phase,
            phaseDetails,
            percentageOfGoal,
            newHungerLevel,
            newHealthBoost,
            newMentalBoost,
            newAutophagyLevel,
            newNicotineCraving,
            newNicotineInBlood,
            newIrritabilityLevel,
        } = getProgressData(startDate, endDate);

        setPhase(phase);
        setDetails(phaseDetails);
        setHungerLevel(newHungerLevel);
        setHealthBoost(newHealthBoost);
        setMentalBoost(newMentalBoost);
        setAuthophagyLevel(newAutophagyLevel);
        setPercentageDone(percentageOfGoal);
        setNicotineCraving(newNicotineCraving);
        setNicotineInBlood(newNicotineInBlood);
        setIrritabilityLevel(newIrritabilityLevel);
        setAreColonsShown(prev => !prev);
    }

    useEffect(() => {
        const cachedStartDate = getFastStartingDate();
        const cachedEndDate = getFastGoalDate();

        if (cachedStartDate && !preventCache) {
            setStartDate(new Date(cachedStartDate));
        }
        if (cachedEndDate && !preventCache) {
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
        {areDatesShown && (
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
        )}

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

        <div className={styles.progressBars}>
            <div className={styles.progressBarsTitle}>
                {details.name} Phase
            </div>

            <ProgressBar
                title="Hunger"
                percentage={hungerLevel}
                color="orange"
            />

            <ProgressBar
                title="Health+"
                percentage={healthBoost}
                color="forestgreen"
            />

            <ProgressBar
                title="Mental+"
                percentage={mentalBoost}
                color="aqua"
            />

            <ProgressBar
                title="Autophagy"
                percentage={autophagyLevel}
                color="gold"
            />

            <ProgressBar
                title="Nicotine Craving"
                percentage={nicotineCraving}
                color="orange"
            />

            <ProgressBar
                title="Nicotine in Blood"
                percentage={nicotineInBlood}
                color="red"
            />

            <ProgressBar
                title="Irritability"
                percentage={irritabilityLevel}
                color="orange"
            />
        </div>
    </div>;
}

export const getServerSideProps = async (context) => {
    const { query } = context;
    const currentMilliseconds = (new Date()).getTime();
    const start = query.start || currentMilliseconds;
    const end = query.end || currentMilliseconds;

    return {
        props: {
            start,
            end,
            preventCache: start !== currentMilliseconds || end !== currentMilliseconds,
            pageTitle: "title",
        },
    }
}

