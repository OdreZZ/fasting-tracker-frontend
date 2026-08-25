import React from "react";
import styles from "../../styles/components/Common/CheckBox.module.css";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import classNames from "classnames";

const Checkbox = ({ label, isChecked, onChange, iconPng }) => {
    return (
        <div className={classNames(styles.checkbox, {
            [styles.active]: isChecked,
        })} onClick={onChange}>
            <div className={styles.checkboxTitle}>
                <img src={`/icons/${iconPng}`} className={styles.checkboxIcon} />
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
