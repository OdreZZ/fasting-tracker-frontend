import styles from "../styles/pages/Homepage.module.css";
import { useEffect, useState } from "react";
import { useZustandSelector, useZustandStore } from "@/stores/ZustandStore";
import { useShallow } from "zustand/shallow";

import { getProgressData, getTimeDiff } from "@/utils/date-calculations";
import { getCachedSettings, getFastGoalDate, getFastStartingDate } from "@/utils/local-storage";

import ImageIcon, { ICON_SIZE } from "@/components/Common/ImageIcon";
import OptionsContainer from "@/components/Container/OptionsContainer";
import ProgressBarsContainer from "@/components/Container/ProgressBarsContainer";
import TimePassedContainer from "@/components/Container/TimePassedContainer";
import { GetServerSidePropsContext } from "next";

interface HomepageProps {
    start: string,
    end: string,
    preventCache: boolean,
}

export default function Homepage({ start, end, preventCache }: HomepageProps) {
    const [isLoading, setIsLoading] = useState(true);

    const {
        details,
        startDate,
        endDate,
        areOptionsShown,
        setDetails,
        setStartDate,
        setEndDate,
        setTimeDiff,
        setPercentageDone,
        setHungerLevel,
        setAuthophagyLevel,
        setHealthBoost,
        setMentalBoost,
        setNicotineCraving,
        setNicotineInBlood,
        setIrritabilityLevel,
        toggleColonsShown,
        setShowFoodStats,
        setShowTobaccoStats,
    } = useZustandStore(useShallow(useZustandSelector));

    const updateData = () => {
        if (!startDate || !endDate) {
            return;
        }

        const newTimeDiff = getTimeDiff(startDate);
        setTimeDiff(newTimeDiff);

        const progressData = getProgressData(startDate, endDate);

        setDetails(progressData.phaseDetails);
        setHungerLevel(progressData.newHungerLevel);
        setHealthBoost(progressData.newHealthBoost);
        setMentalBoost(progressData.newMentalBoost);
        setAuthophagyLevel(progressData.newAutophagyLevel);
        setPercentageDone(progressData.percentageOfGoal);
        setNicotineCraving(progressData.newNicotineCraving);
        setNicotineInBlood(progressData.newNicotineInBlood);
        setIrritabilityLevel(progressData.newIrritabilityLevel);
        toggleColonsShown();
    }

    useEffect(() => {
        const cachedStartDate = getFastStartingDate();
        const cachedEndDate = getFastGoalDate();
        const cachedSettings = getCachedSettings();

        if (cachedStartDate && !preventCache) {
            setStartDate(new Date(cachedStartDate));
        } else {
            setStartDate(new Date(parseInt(start)));
        }

        if (cachedEndDate && !preventCache) {
            setEndDate(new Date(cachedEndDate));
        } else {
            setEndDate(new Date(parseInt(end)));
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
            <ImageIcon src={details.iconPng} size={ICON_SIZE.LARGE} />

            <div>
                {details.name}
            </div>
        </div>

        <TimePassedContainer />

        {areOptionsShown ? <OptionsContainer /> : <ProgressBarsContainer />}
    </div>;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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
