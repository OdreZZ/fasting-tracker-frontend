import styles from "../../styles/components/Common/AppHeader.module.css";
import { useZustandStore, useZustandSelector } from "@/stores/ZustandStore";
import { useShallow } from "zustand/shallow";
import ImageIcon from "./ImageIcon";

export default function AppHeader() {
    const {
        phaseDetails,
    } = useZustandStore(useShallow(useZustandSelector));

    return <div className={styles.appHeader}>
        <div className={styles.appHeaderTitle}>
            <div className={styles.appName}>
                <ImageIcon src="icon-192x192.png"
                    className={styles.appHeaderIcon}
                />
                Fasting Tracker <span className={styles.appVersion}>
                    v{process.env.NEXT_PUBLIC_APP_VERSION}
                </span>
            </div>

            <div className={styles.phaseTitle}>
                {phaseDetails.name} Phase

                <ImageIcon src={phaseDetails.iconSrc} />
            </div>
        </div>
    </div>
}