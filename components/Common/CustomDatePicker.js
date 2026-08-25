import DatePicker from "react-datepicker";
import styles from "../../styles/components/Common/CustomDatePicker.module.css";
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDatePicker({
    text,
    icon,
    date,
    onDateChange,
}) {
    return <div className={styles.datePicker}>
        <div className={styles.datePickerHeader}>
            <img src={icon} className={styles.datePickerIcon} />
            <div className={styles.datePickerTitle}>
                {text}
            </div>
        </div>

        <DatePicker
            className={styles.datePickerInput}
            selected={date}
            onChange={onDateChange}
            showTimeSelect
            dateFormat="Pp"
        />
    </div>
}