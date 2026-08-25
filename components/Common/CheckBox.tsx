import React from "react";
import styles from "../../styles/components/Common/CheckBox.module.css";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import classNames from "classnames";
import ImageIcon from "./ImageIcon";

interface CheckboxProps {
    label: string,
    isChecked: boolean,
    onChange: () => void,
    iconPng: string,
}

const Checkbox = ({ label, isChecked, onChange, iconPng }: CheckboxProps) => {
    return (
        <div className={classNames(styles.checkbox, {
            [styles.active]: isChecked,
        })} onClick={onChange}>
            <div className={styles.checkboxTitle}>
                <ImageIcon src={iconPng} />
                <div>{label}</div>
            </div>

            <div>
                {!isChecked && (<CheckBoxOutlineBlank />)}
                {isChecked && (<CheckBoxOutlined />)}
            </div>
        </div>
    );
};

export default Checkbox;
