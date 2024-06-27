import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import { getProgressData, getTimeDiff } from "@/utils/date-calculations";
import { getFastStartingDate, updateFastStartingDate } from "@/utils/local-storage";
import styles from "../styles/Homepage.module.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "@/components/Common/ProgressBar";

export default function Homepage() {
    const { t } = useTranslation();

    const [startDate, setStartDate] = useState(new Date());
    const [timeDiff, setTimeDiff] = useState(getTimeDiff(new Date()));
    const [hungerLevel, setHungerLevel] = useState(0);
    const [autophagyLevel, setAuthophagyLevel] = useState(0);

    const {
        days,
        hours,
        minutes,
        seconds,
    } = timeDiff;

    const updateStartDate = (date) => {
        setStartDate(date);
        updateFastStartingDate(date);
    }

    const updateData = () => {
        const newTimeDiff = getTimeDiff(startDate);
        setTimeDiff(newTimeDiff);

        const {
            phase,
            newHungerLevel,
            newAutophagyLevel,
        } = getProgressData(startDate);

        setHungerLevel(newHungerLevel);
        setAuthophagyLevel(newAutophagyLevel);
    }

    useEffect(() => {
        const cachedStartDate = getFastStartingDate();

        if (cachedStartDate) {
            setStartDate(new Date(cachedStartDate));
        }
    }, []);

    useEffect(() => {
        updateData();

        const interval = setInterval(() => {
            updateData();
        }, 1000);

        return () => clearInterval(interval);
    }, [startDate]);

    return <div className={styles.homepage}>
        <div>
            Start of Fast:
        </div>

        <DatePicker
            className={styles.datePicker}
            selected={startDate}
            onChange={updateStartDate}
            showTimeSelect
            dateFormat="Pp"
        />

        <div className={styles.timePassed}>
            {seconds >= 0 ? "Time Passed:" : "Time until Fast:"}

            <br />

            <div className={styles.timePassedCount}>
                {days > 0 && `${Math.abs(days)}d `}
                {hours > 0 && `${Math.abs(hours)}h `}
                {minutes > 0 && `${Math.abs(minutes)}min `}
                {seconds > 0 && `${Math.abs(seconds)}sec `}
            </div>
        </div>

        <div className={styles.progressBars}>
            <ProgressBar
                title="Hunger Level:"
                percentage={hungerLevel}
                color="red"
            />

            <ProgressBar
                title="Autophagy Level:"
                percentage={autophagyLevel}
                color="green"
            />
        </div>
    </div>;
}

Homepage.getInitialProps = async () => {
    return { pageTitle: "title" };
};
