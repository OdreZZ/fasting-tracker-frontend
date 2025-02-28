import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import { getProgressData, getTimeDiff } from "@/utils/date-calculations";
import { 
    getCachedSettings,
    getFastGoalDate,
    getFastStartingDate,
    updateCachedSettings,
    updateFastGoalDate,
    updateFastStartingDate,
} from "@/utils/local-storage";
import styles from "../styles/Homepage.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "@/components/Common/ProgressBar";
import CircularProgressBar from "@/components/Common/CircularProgressBar";
import { useRouter } from "next/router";
import Checkbox from "@/components/Common/CheckBox";

const PROGRESS_VIEW = {
    TIME_PASSED: "TIME_PASSED",
    PERC_PASSED: "PERC_PASSED",
};

export default function Homepage({ start, end, preventCache }) {
    const { t } = useTranslation();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
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
    const [areOptionsShown, setAreOptionsShown] = useState(false);
    const [showFoodStats, setShowFoodStats] = useState(true);
    const [showTobaccoStats, setShowTobaccoStats] = useState(true);

    const {
        hours,
        minutes,
        seconds,
    } = timeDiff;

    const toggleView = () => {
        setAreOptionsShown(prev => !prev);
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

    const onResetDates = () => {
        const dateStart = new Date();
        setStartDate(dateStart);
        updateFastStartingDate(dateStart);

        const dateEnd = new Date(dateStart.getTime() + 30 * 60 * 60 * 1000);;
        setEndDate(dateEnd);
        updateFastGoalDate(dateEnd);

        setAreOptionsShown(false);

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

    const updateSettings = ({ showFood, showTobacco }) => {
        const settings = {
            showFoodStats: showFood !== undefined ? showFood : showFoodStats,
            showTobaccoStats: showTobacco !== undefined ? showTobacco : showTobaccoStats,
        };

        if (!settings.showFoodStats && !settings.showTobaccoStats) {
            return;
        }

        updateCachedSettings(settings);
        setShowFoodStats(settings.showFoodStats);
        setShowTobaccoStats(settings.showTobaccoStats);
    }

    useEffect(() => {
        const cachedStartDate = getFastStartingDate();
        const cachedEndDate = getFastGoalDate();
        const cachedSettings = getCachedSettings();

        if (cachedStartDate && !preventCache) {
            setStartDate(new Date(cachedStartDate));
        }
        if (cachedEndDate && !preventCache) {
            setEndDate(new Date(cachedEndDate));
        }
        if (cachedSettings) {
            if (cachedSettings.showFoodStats !== undefined) {
                setShowFoodStats(cachedSettings.showFoodStats);
            }
            if (cachedSettings.showTobaccoStats !== undefined) {
                setShowTobaccoStats(cachedSettings.showTobaccoStats);
            }
        }

        setIsLoading(false);
    }, []);

    useEffect(() => {
        updateData();

        const interval = setInterval(() => {
            updateData();
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate, endDate]);

    if (isLoading) {
        return null;
    }

    return <div className={styles.homepage}>
        <div className={styles.progressBarsTitle}>
            <img src={`/icons/${details.iconPng}`} className={styles.phaseIcon} />
            
            <div>
                {details.name}
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

        {areOptionsShown && (
            <div className={styles.optionsContainer}>
                <div className={styles.checkboxContainer}>
                    <Checkbox
                        label="Food Fast"
                        isChecked={showFoodStats}
                        onChange={() => updateSettings({ showFood: !showFoodStats })}
                        iconPng="food_fast.png"
                    />

                    <Checkbox
                        label="Tobacco Fast"
                        isChecked={showTobaccoStats}
                        onChange={() => updateSettings({ showTobacco: !showTobaccoStats })}
                        iconPng="nicotine_craving.png"
                    />
                </div>

                <div className={styles.datePickersContainer}>
                    <div className={styles.datePickerContainer}>
                        <div className={styles.datePicker}>
                            <div className={styles.datePickerHeader}>
                                <img src="/icons/start_date.png" className={styles.datePickerIcon} />
                                <div className={styles.datePickerTitle}>
                                    Start Date
                                </div>
                            </div>

                            <DatePicker
                                className={styles.datePickerInput}
                                selected={startDate}
                                onChange={updateStartDate}
                                showTimeSelect
                                dateFormat="Pp"
                            />
                        </div>

                        <div className={styles.datePicker}>
                            <div className={styles.datePickerHeader}>
                                <img src="/icons/end_date.png" className={styles.datePickerIcon} />
                                <div className={styles.datePickerTitle}>
                                    End Date
                                </div>
                            </div>

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

                <div className={styles.actionsContainer}>
                    <button onClick={onResetDates}>
                        <img src="/icons/reset.png" className={styles.actionButtonIcon}/>

                        <div>
                            Reset Dates
                        </div>
                    </button>
                </div>
            </div>
        )}

        {!areOptionsShown && (
            <div className={styles.progressBars}>
                {showFoodStats && (
                    <ProgressBar
                        title="Hunger"
                        percentage={hungerLevel}
                        color="orange"
                        iconPng="hunger.png"
                    />
                )}

                {showFoodStats && (
                    <ProgressBar
                        title="Autophagy"
                        percentage={autophagyLevel}
                        color="cyan"
                        iconPng="autophagy.png"
                    />
                )}

                {showTobaccoStats && (
                    <ProgressBar
                        title="Nicotine Craving"
                        percentage={nicotineCraving}
                        color="orange"
                        iconPng="nicotine_craving.png"
                    />
                )}

                {showTobaccoStats && (
                    <ProgressBar
                        title="Nicotine in Blood"
                        percentage={nicotineInBlood}
                        color="red"
                        iconPng="nicotine_blood.png"
                    />
                )}

                {(showFoodStats || showTobaccoStats) && (
                    <ProgressBar
                        title="Stress"
                        percentage={irritabilityLevel}
                        color="red"
                        iconPng="irritability.png"
                    />
                )}

                {(showFoodStats || showTobaccoStats) && (
                    <ProgressBar
                        title="Health"
                        percentage={healthBoost}
                        color="forestgreen"
                        iconPng="health_plus.png"
                    />
                )}

                {(showFoodStats || showTobaccoStats) && (
                    <ProgressBar
                        title="Focus"
                        percentage={mentalBoost}
                        color="aqua"
                        iconPng="mental_plus.png"
                    />
                )}
            </div>
        )}
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
