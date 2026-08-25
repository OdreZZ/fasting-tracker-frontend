import styles from "../../styles/components/Container/ProgressBarsContainer.module.css";
import ProgressBar from "@/components/Common/ProgressBar";
import { useZustandSelector, useZustandStore } from "@/stores/ZustandStore";
import { useShallow } from "zustand/shallow";

export default function ProgressBarsContainer() {
    const {
        hungerLevel,
        autophagyLevel,
        healthBoost,
        mentalBoost,
        nicotineCraving,
        nicotineInBlood,
        irritabilityLevel,
        showFoodStats,
        showTobaccoStats,
    } = useZustandStore(useShallow(useZustandSelector));

    return <div className={styles.progressBars}>
        {showFoodStats && (
            <ProgressBar
                title="Hunger"
                percentage={hungerLevel}
                color="orange"
                iconPng="hunger.png"
            />
        )}

        {showFoodStats && (
            <ProgressBar
                title="Autophagy"
                percentage={autophagyLevel}
                color="cyan"
                iconPng="autophagy.png"
            />
        )}

        {showTobaccoStats && (
            <ProgressBar
                title="Nicotine Craving"
                percentage={nicotineCraving}
                color="orange"
                iconPng="nicotine_craving.png"
            />
        )}

        {showTobaccoStats && (
            <ProgressBar
                title="Nicotine in Blood"
                percentage={nicotineInBlood}
                color="red"
                iconPng="nicotine_blood.png"
            />
        )}

        {(showFoodStats || showTobaccoStats) && (
            <ProgressBar
                title="Stress"
                percentage={irritabilityLevel}
                color="red"
                iconPng="irritability.png"
            />
        )}

        {(showFoodStats || showTobaccoStats) && (
            <ProgressBar
                title="Health"
                percentage={healthBoost}
                color="forestgreen"
                iconPng="health_plus.png"
            />
        )}

        {(showFoodStats || showTobaccoStats) && (
            <ProgressBar
                title="Focus"
                percentage={mentalBoost}
                color="aqua"
                iconPng="mental_plus.png"
            />
        )}
    </div>
}