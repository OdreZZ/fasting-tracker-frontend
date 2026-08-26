export interface ZustandState {
    view: string,
    phaseDetails: AttributeDetails,
    startDate: Date | null,
    endDate: Date | null,
    timeDiff: TimeDifference,
    percentageDone: number,

    progressLevels: ProgressLevel[],

    areColonsShown: boolean,
    areOptionsShown: boolean,
    statsToShow: StatsToShow,

    setView: (view: string) => void,
    setPhaseDetails: (phaseDetails: AttributeDetails) => void,
    setStartDate: (startDate: Date) => void,
    setEndDate: (endDate: Date) => void,
    setTimeDiff: (timeDiff: TimeDifference) => void,
    setPercentageDone: (percentageDone: number) => void,

    setProgressLevels: (progressLevels: ProgressLevel[]) => void,

    setAreOptionsShown: (areOptionsShown: boolean) => void,

    setShowFoodStats: (showFoodStats: boolean) => void,
    setShowTobaccoStats: (showTobaccoStats: boolean) => void,
    toggleColonsShown: () => void,
}

export interface AttributeDetails {
    name: string,
    iconSrc: string,
}

export interface TimeDifference {
    hours: number,
    minutes: number,
    seconds: number,
}

export interface ProgressLevel {
    name: string,
    level: number,
}

export interface StatsToShow {
    showFoodStats: boolean,
    showTobaccoStats: boolean,
    visibleStats: string[],
}