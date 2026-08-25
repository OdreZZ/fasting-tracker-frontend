import styles from "../../styles/components/Container/OptionsContainer.module.css";
import Checkbox from "@/components/Common/CheckBox";
import CustomDatePicker from "@/components/Common/CustomDatePicker";

export default function OptionsContainer({
    showFoodStats,
    showTobaccoStats,
    updateSettings,
    startDate,
    endDate,
    updateStartDate,
    updateEndDate,
    onResetDates,
}) {
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