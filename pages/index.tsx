import styles from "../styles/pages/Homepage.module.css";
import { useEffect, useState } from "react";
import { useZustandSelector, useZustandStore } from "@/stores/ZustandStore";
import { useShallow } from "zustand/shallow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getProgressData, getTimeDiff } from "@/utils/date-calculations";
import { getCachedSettings, getFastGoalDate, getFastStartingDate } from "@/utils/local-storage";

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
        startDate,
        endDate,
        areOptionsShown,
        progressLevels,
        setPhaseDetails,
        setStartDate,
        setEndDate,
        setTimeDiff,
        setPercentageDone,
        setProgressLevels,
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

        setPhaseDetails(progressData.phaseDetails);
        setPercentageDone(progressData.percentageOfGoal);

        setProgressLevels(progressData.progressLevels);

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return <div className={styles.homepage}>
        <TimePassedContainer />


        <Slider {...settings}>
            <div className={styles.slideContainer}>
                <OptionsContainer />
            </div>
            <div className={styles.slideContainer}>
                <ProgressBarsContainer />
            </div>
        </Slider>
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
