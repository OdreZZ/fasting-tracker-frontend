import PHASES from "@/data/phases";

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
            // phase: 0,
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
        };
    }

    const currentPhase = PHASES[currentPhaseIdx];
    const nextPhase = PHASES.length === currentPhaseIdx + 1 ? PHASES[currentPhaseIdx] : PHASES[currentPhaseIdx + 1];

    const hoursSinceCurrentPhase = hoursPassed - currentPhase.startHour;
    const hoursInThisPhase = nextPhase.startHour - currentPhase.startHour;

    return {
        // phase: currentPhaseIdx + 1,
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
    };
}

function getMiddlePoint(y1: number, x2: number, y2: number, x: number) {
    return y1 + (x - 0.0) * (y2 - y1) / (x2 - 0.0);
}