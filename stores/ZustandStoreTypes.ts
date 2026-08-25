export interface ZustandState {
    view: string,
    details: AttributeDetails,
    startDate: Date | null,
    endDate: Date | null,
    timeDiff: TimeDifference,
    percentageDone: number,
    hungerLevel: number,
    autophagyLevel: number,
    healthBoost: number,
    mentalBoost: number,
    nicotineCraving: number,
    nicotineInBlood: number,
    irritabilityLevel: number,
    areColonsShown: boolean,
    areOptionsShown: boolean,
    showFoodStats: boolean,
    showTobaccoStats: boolean,

    setView: (view: string) => void,
    setDetails: (details: AttributeDetails) => void,
    setStartDate: (startDate: Date) => void,
    setEndDate: (endDate: Date) => void,
    setTimeDiff: (timeDiff: TimeDifference) => void,
    setPercentageDone: (percentageDone: number) => void,
    setHungerLevel: (hungerLevel: number) => void,
    setAuthophagyLevel: (authophagyLevel: number) => void,
    setHealthBoost: (healthBoost: number) => void,
    setMentalBoost: (mentalBoost: number) => void,
    setNicotineCraving: (nicotineCraving: number) => void,
    setNicotineInBlood: (nicotineInBlood: number) => void,
    setIrritabilityLevel: (irritabilityLevel: number) => void,
    setAreOptionsShown: (areOptionsShown: boolean) => void,
    setShowFoodStats: (showFoodStats: boolean) => void,
    setShowTobaccoStats: (showTobaccoStats: boolean) => void,
    toggleColonsShown: () => void,
}

export interface AttributeDetails {
    name: string,
    iconPng: string,
}

export interface TimeDifference {
    hours: number,
    minutes: number,
    seconds: number,
}