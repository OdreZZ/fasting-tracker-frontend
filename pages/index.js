import styles from "../styles/pages/Homepage.module.css";
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

import { useRouter } from "next/router";
import OptionsContainer from "@/components/Container/OptionsContainer";
import ProgressBarsContainer from "@/components/Container/ProgressBarsContainer";
import TimePassedContainer from "@/components/Container/TimePassedContainer";

export const PROGRESS_VIEW = {
    TIME_PASSED: "TIME_PASSED",
    PERC_PASSED: "PERC_PASSED",
};

export default function Homepage({ start, end, preventCache }) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState(PROGRESS_VIEW.TIME_PASSED);
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
        <div className={styles.phaseTitle}>
            <img src={`/icons/${details.iconPng}`} className={styles.phaseIcon} />

            <div>
                {details.name}
            </div>
        </div>

        <TimePassedContainer
            percentageDone={percentageDone}
            toggleView={toggleView}
            areColonsShown={areColonsShown}
            view={view}
            timeDiff={timeDiff}
        />

        {areOptionsShown && <OptionsContainer 
            showFoodStats={showFoodStats}
            showTobaccoStats={showTobaccoStats}
            updateSettings={updateSettings}
            startDate={startDate}
            endDate={endDate}
            updateStartDate={updateStartDate}
            updateEndDate={updateEndDate}
            onResetDates={onResetDates}
        />}

        {!areOptionsShown && <ProgressBarsContainer
            showFoodStats={showFoodStats}
            showTobaccoStats={showTobaccoStats}
            hungerLevel={hungerLevel}
            autophagyLevel={autophagyLevel}
            nicotineCraving={nicotineCraving}
            nicotineInBlood={nicotineInBlood}
            irritabilityLevel={irritabilityLevel}
            healthBoost={healthBoost}
            mentalBoost={mentalBoost}
        />}
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
