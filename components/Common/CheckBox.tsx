import styles from "../../styles/components/Common/CheckBox.module.css";
import classNames from "classnames";
import ImageIcon, { ICON_SIZE } from "./ImageIcon";

interface CheckboxProps {
    label: string,
    isChecked: boolean,
    onChange: () => void,
    iconPng: string,
}

const Checkbox = ({ label, isChecked, onChange, iconPng }: CheckboxProps) => {
    return <div className={classNames(styles.checkbox, {
        [styles.active]: isChecked,
    })} onClick={onChange}>
        <div className={styles.checkboxTitle}>
            <ImageIcon src={iconPng} />
            <div>{label}</div>
        </div>

        <div>
            {!isChecked && <ImageIcon src="checkbox_unchecked.png" size={ICON_SIZE.SMALL} />}
            {isChecked && <ImageIcon src="checkbox_checked.png" size={ICON_SIZE.SMALL} />}
        </div>
    </div>
};

export default Checkbox;
