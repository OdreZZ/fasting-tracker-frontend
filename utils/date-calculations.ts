import PHASES from "@/data/phases";
import { PROGRESS_LEVELS } from "@/stores/ZustandStore";
import { ProgressLevel } from "@/stores/ZustandStoreTypes";

export function getTimeDiff(givenDate: Date) {
    const now = new Date();
    const totalSeconds = Math.floor((now.getTime() - givenDate.getTime()) / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        hours,
        minutes,
        seconds,
    };
}

export function getProgressData(startDate: Date, endDate: Date) {
    const now = Date.now();
    const start = startDate.getTime();
    const end = endDate.getTime();

    const elapsedMs = now - start;
    const durationMs = end - start;

    const hoursPassed = elapsedMs / (1000 * 60 * 60);

    const percentageOfGoal = Math.min(
        Math.max((100 * elapsedMs) / durationMs, 0),
        100
    );
    const currentPhaseIdx = PHASES.findIndex(phase => hoursPassed < phase.startHour) - 1;
    if (currentPhaseIdx < 0) {
        return {
            phaseDetails: {
                name: "???",
                iconSrc: "start_date.png",
            },
            percentageOfGoal,
            progressLevels: [{
                name: PROGRESS_LEVELS.HUNGER,
                level: 0,
            }, {
                name: PROGRESS_LEVELS.AUTOPHAGY,
                level: 0,
            }, {
                name: PROGRESS_LEVELS.HEALTH,
                level: 0,
            }, {
                name: PROGRESS_LEVELS.FOCUS,
                level: 0,
            }, {
                name: PROGRESS_LEVELS.NICOTINE_CRAVING,
                level: 0,
            }, {
                name: PROGRESS_LEVELS.NICOTINE_IN_BLOOD,
                level: 0,
            }, {
                name: PROGRESS_LEVELS.STRESS,
                level: 0,
            }],
        };
    }

    const currentPhase = PHASES[currentPhaseIdx];
    const nextPhase = PHASES.length === currentPhaseIdx + 1 ? PHASES[currentPhaseIdx] : PHASES[currentPhaseIdx + 1];

    const hoursSinceCurrentPhase = hoursPassed - currentPhase.startHour;
    const hoursInThisPhase = nextPhase.startHour - currentPhase.startHour;

    const progressLevels = currentPhase.progressLevels.map((progressLevel, idx) => ({
        name: progressLevel.name,
        level: getMiddlePoint(progressLevel.level, hoursInThisPhase, nextPhase.progressLevels[idx].level, hoursSinceCurrentPhase),
    }));

    return {
        phaseDetails: {
            name: currentPhase.name,
            iconSrc: currentPhase.iconSrc,
        },
        percentageOfGoal,
        progressLevels,
    };
}

function getMiddlePoint(y1: number, x2: number, y2: number, x: number) {
    return y1 + (x - 0.0) * (y2 - y1) / (x2 - 0.0);
}