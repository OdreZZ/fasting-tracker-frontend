import React from "react";
import styles from "../../styles/CheckBox.module.css";
import { CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import classNames from "classnames";

const Checkbox = ({ label, isChecked, onChange }) => {
    return (
        <div className={classNames(styles.checkbox, {
            [styles.active]: isChecked,
        })} onClick={onChange}>
            {!isChecked && (<CheckBoxOutlineBlank />)}
            {isChecked && (<CheckBoxOutlined />)}
            {label}
        </div>
    );
};

export default Checkbox;
