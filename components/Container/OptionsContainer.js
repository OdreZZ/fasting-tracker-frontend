import styles from "../../styles/components/Container/OptionsContainer.module.css";
import Checkbox from "@/components/Common/CheckBox";
import CustomDatePicker from "@/components/Common/CustomDatePicker";
import { useZustandSelector, useZustandStore } from "@/stores/ZustandStore";
import { useShallow } from "zustand/shallow";
import {
    updateCachedSettings,
    updateFastGoalDate,
    updateFastStartingDate,
} from "@/utils/local-storage";
import { useRouter } from "next/router";

export default function OptionsContainer() {
    const router = useRouter();

    const {
        startDate,
        endDate,
        showFoodStats,
        showTobaccoStats,
        setStartDate,
        setEndDate,
        setAreOptionsShown,
        setShowFoodStats,
        setShowTobaccoStats,
    } = useZustandStore(useShallow(useZustandSelector));

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

    return <div className={styles.optionsContainer}>
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
                <CustomDatePicker
                    text="Start Date"
                    icon="/icons/start_date.png"
                    date={startDate}
                    onDateChange={updateStartDate}
                />

                <CustomDatePicker
                    text="End Date"
                    icon="/icons/end_date.png"
                    date={endDate}
                    onDateChange={updateEndDate}
                />
            </div>
        </div>

        <div className={styles.actionsContainer}>
            <button onClick={onResetDates}>
                <img src={`/icons/reset.png`} className={styles.actionButtonIcon} />

                <div>
                    Reset Dates
                </div>
            </button>
        </div>
    </div>
}