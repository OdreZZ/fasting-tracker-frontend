import PHASES from "@/data/phases";
import moment from "moment";

export function getTimeDiff(givenDate) {
    const now = moment();
    const totalSeconds = now.diff(givenDate, 'seconds');

    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        days,
        hours,
        minutes,
        seconds,
    }
}

export function getProgressData(givenDate) {
    const now = moment();
    const hoursPassed = now.diff(givenDate, 'minutes') / 60.0;
    const currentPhaseIdx = PHASES.findIndex(phase => hoursPassed < phase.startHour) - 1;
    if (currentPhaseIdx < 0) {
        return {
            phase: 0,
            newHungerLevel: 0,
            newAutophagyLevel: 0,
        }
    }

    const currentPhase = PHASES[currentPhaseIdx];
    const nextPhase = PHASES.length === currentPhaseIdx + 1 ? PHASES[currentPhaseIdx] : PHASES[currentPhaseIdx + 1];

    const hoursSinceCurrentPhase = hoursPassed - currentPhase.startHour;
    const hoursInThisPhase = nextPhase.startHour - currentPhase.startHour;

    return {
        phase: currentPhaseIdx + 1,
        newHungerLevel:
            getMiddlePoint(currentPhase.hungerLevel, hoursInThisPhase, nextPhase.hungerLevel, hoursSinceCurrentPhase),
        newAutophagyLevel:
            getMiddlePoint(currentPhase.autophagyLevel, hoursInThisPhase, nextPhase.autophagyLevel, hoursSinceCurrentPhase),
    }
}

function getMiddlePoint(y1, x2, y2, x) {
    return y1 + (x - 0.0) * (y2 - y1) / (x2 - 0.0);
}