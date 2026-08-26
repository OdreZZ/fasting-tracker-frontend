import styles from "../../styles/components/Container/ProgressBarsContainer.module.css";
import ProgressBar from "@/components/Common/ProgressBar";
import { PROGRESS_LEVELS, useZustandSelector, useZustandStore } from "@/stores/ZustandStore";
import { useShallow } from "zustand/shallow";

const PROGRESS_UI = {
    [PROGRESS_LEVELS.HUNGER]: {
        name: "Hunger",
        color: "#F8E494",
        iconSrc: "hunger.jpg",
    },
    [PROGRESS_LEVELS.AUTOPHAGY]: {
        name: "Autophagy",
        color: "#50E2F4",
        iconSrc: "autophagy.jpg",
    },
    [PROGRESS_LEVELS.NICOTINE_CRAVING]: {
        name: "Nicotine Craving",
        color: "#AD8E8B",
        iconSrc: "nicotine_craving.jpg",
    },
    [PROGRESS_LEVELS.NICOTINE_IN_BLOOD]: {
        name: "Nicotine in Blood",
        color: "#B791B8",
        iconSrc: "nicotine_in_blood.jpg",
    },
    [PROGRESS_LEVELS.STRESS]: {
        name: "Stress",
        color: "#B32720",
        iconSrc: "stress.jpg",
    },
    [PROGRESS_LEVELS.HEALTH]: {
        name: "Health",
        color: "#56CF54",
        iconSrc: "health.jpg",
    },
    [PROGRESS_LEVELS.FOCUS]: {
        name: "Focus",
        color: "#75EFEA",
        iconSrc: "focus.jpg",
    },
}

export default function ProgressBarsContainer() {
    const {
        progressLevels,
        statsToShow,
    } = useZustandStore(useShallow(useZustandSelector));

    return <div className={styles.progressBars}>
        {progressLevels.filter(progressLevel => statsToShow.visibleStats.includes(progressLevel.name))
            .map(progressLevel => (
                <ProgressBar
                    key={`progress-bar-${progressLevel.name}`}
                    title={PROGRESS_UI[progressLevel.name].name}
                    percentage={progressLevel.level}
                    color={PROGRESS_UI[progressLevel.name].color}
                    iconSrc={PROGRESS_UI[progressLevel.name].iconSrc}
                />
            ))}
    </div>
}