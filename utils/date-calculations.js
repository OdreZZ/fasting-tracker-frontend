import PHASES from "@/data/phases";
import moment from "moment";

export function getTimeDiff(givenDate) {
    const now = moment();
    const totalSeconds = now.diff(givenDate, 'seconds');

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
        hours,
        minutes,
        seconds,
    }
}

export function getProgressData(startDate, endDate) {
    const now = moment();
    const start = moment(startDate);
    const end = moment(endDate);

    const hoursPassed = now.diff(start, 'minutes') / 60.0;
    const percentageOfGoal = Math.min(Math.max(100.0 * now.diff(start) / end.diff(start), 0), 100);
    const currentPhaseIdx = PHASES.findIndex(phase => hoursPassed < phase.startHour) - 1;
    if (currentPhaseIdx < 0) {
        return {
            phase: 0,
            phaseDetails: {
                name: "???",
                iconPng: "start_date.png",
            },
            percentageOfGoal,
            newHungerLevel: 0,
            newHealthBoost: 0,
            newMentalBoost: 0,
            newAutophagyLevel: 0,
            newNicotineCraving: 0,
            newNicotineInBlood: 0,
            newIrritabilityLevel: 0,
        }
    }

    const currentPhase = PHASES[currentPhaseIdx];
    const nextPhase = PHASES.length === currentPhaseIdx + 1 ? PHASES[currentPhaseIdx] : PHASES[currentPhaseIdx + 1];

    const hoursSinceCurrentPhase = hoursPassed - currentPhase.startHour;
    const hoursInThisPhase = nextPhase.startHour - currentPhase.startHour;

    return {
        phase: currentPhaseIdx + 1,
        phaseDetails: {
            name: currentPhase.name,
            iconPng: currentPhase.iconPng,
        },
        percentageOfGoal,
        newHungerLevel:
            getMiddlePoint(currentPhase.hungerLevel, hoursInThisPhase, nextPhase.hungerLevel, hoursSinceCurrentPhase),
        newHealthBoost:
            getMiddlePoint(currentPhase.healthBoost, hoursInThisPhase, nextPhase.healthBoost, hoursSinceCurrentPhase),
        newMentalBoost:
            getMiddlePoint(currentPhase.mentalBoost, hoursInThisPhase, nextPhase.mentalBoost, hoursSinceCurrentPhase),
        newAutophagyLevel:
            getMiddlePoint(currentPhase.autophagyLevel, hoursInThisPhase, nextPhase.autophagyLevel, hoursSinceCurrentPhase),
        newNicotineCraving:
            getMiddlePoint(currentPhase.nicotineCraving, hoursInThisPhase, nextPhase.nicotineCraving, hoursSinceCurrentPhase),
        newNicotineInBlood:
            getMiddlePoint(currentPhase.nicotineInBlood, hoursInThisPhase, nextPhase.nicotineInBlood, hoursSinceCurrentPhase),
        newIrritabilityLevel:
            getMiddlePoint(currentPhase.irritabilityLevel, hoursInThisPhase, nextPhase.irritabilityLevel, hoursSinceCurrentPhase),
    }
}

function getMiddlePoint(y1, x2, y2, x) {
    return y1 + (x - 0.0) * (y2 - y1) / (x2 - 0.0);
}