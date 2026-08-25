import DatePicker from "react-datepicker";
import styles from "../../styles/components/Common/CustomDatePicker.module.css";
import "react-datepicker/dist/react-datepicker.css";
import ImageIcon from "./ImageIcon";

interface CustomDatePickerProps {
    text: string,
    icon: string,
    date: Date | null,
    onDateChange: (date: Date | null) => void,
}

export default function CustomDatePicker({
    text,
    icon,
    date,
    onDateChange,
}: CustomDatePickerProps) {
    return <div className={styles.datePicker}>
        <div className={styles.datePickerHeader}>
            <ImageIcon src={icon} />
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