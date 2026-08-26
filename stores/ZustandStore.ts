import { create } from "zustand";
import { ZustandState } from "./ZustandStoreTypes";

export const PROGRESS_VIEW = {
    TIME_PASSED: "TIME_PASSED",
    PERC_PASSED: "PERC_PASSED",
};

export const PROGRESS_LEVELS = {
    HUNGER: "HUNGER",
    AUTOPHAGY: "AUTOPHAGY",
    HEALTH: "HEALTH",
    FOCUS: "FOCUS",
    NICOTINE_CRAVING: "NICOTINE_CRAVING",
    NICOTINE_IN_BLOOD: "NICOTINE_IN_BLOOD",
    STRESS: "STRESS",
};

export const FOOD_FAST_INDICATORS = [
    PROGRESS_LEVELS.HUNGER,
    PROGRESS_LEVELS.AUTOPHAGY,
    PROGRESS_LEVELS.HEALTH,
    PROGRESS_LEVELS.FOCUS,
    PROGRESS_LEVELS.STRESS,
];

export const TOBACCO_FAST_INDICATORS = [
    PROGRESS_LEVELS.NICOTINE_CRAVING,
    PROGRESS_LEVELS.NICOTINE_IN_BLOOD,
    PROGRESS_LEVELS.HEALTH,
    PROGRESS_LEVELS.FOCUS,
    PROGRESS_LEVELS.STRESS,
];

export const useZustandStore = create<ZustandState>((set, get) => {
    return {
        view: PROGRESS_VIEW.TIME_PASSED,
        phaseDetails: {
            name: "",
            iconSrc: "",
        },
        startDate: null,
        endDate: null,
        timeDiff: {
            seconds: 0,
            minutes: 0,
            hours: 0,
        },
        percentageDone: 0,

        progressLevels: [{
            name: PROGRESS_LEVELS.HUNGER,
            level: 0,
            isShown: true,
        }, {
            name: PROGRESS_LEVELS.AUTOPHAGY,
            level: 0,
            isShown: true,
        }, {
            name: PROGRESS_LEVELS.HEALTH,
            level: 0,
            isShown: true,
        }, {
            name: PROGRESS_LEVELS.FOCUS,
            level: 0,
            isShown: true,
        }, {
            name: PROGRESS_LEVELS.NICOTINE_CRAVING,
            level: 0,
            isShown: true,
        }, {
            name: PROGRESS_LEVELS.NICOTINE_IN_BLOOD,
            level: 0,
            isShown: true,
        }, {
            name: PROGRESS_LEVELS.STRESS,
            level: 0,
            isShown: true,
        }],
        
        areColonsShown: true,
        areOptionsShown: false,
        statsToShow: {
            showFoodStats: true,
            showTobaccoStats: true,
            visibleStats: [ ...FOOD_FAST_INDICATORS ],
        },

        setView: (view) => set((state) => ({ ...state, view })),
        setPhaseDetails: (phaseDetails) => set((state) => ({ ...state, phaseDetails })),
        setStartDate: (startDate) => set((state) => ({ ...state, startDate })),
        setEndDate: (endDate) => set((state) => ({ ...state, endDate })),
        setTimeDiff: (timeDiff) => set((state) => ({ ...state, timeDiff })),
        setPercentageDone: (percentageDone) => set((state) => ({ ...state, percentageDone })),

        setProgressLevels: (progressLevels) => set((state) => ({ ...state, progressLevels: [ ...progressLevels ] })),

        setAreOptionsShown: (areOptionsShown) => set((state) => ({ ...state, areOptionsShown })),
    
        setShowFoodStats: (showFoodStats) => set((state) => ({ 
            ...state, 
            statsToShow: { ...state.statsToShow, showFoodStats, visibleStats: populateVisibleStats(showFoodStats, state.statsToShow.showTobaccoStats) },
        })),
        setShowTobaccoStats: (showTobaccoStats) => set((state) => ({ 
            ...state, 
            statsToShow: { ...state.statsToShow, showTobaccoStats, visibleStats: populateVisibleStats(state.statsToShow.showFoodStats, showTobaccoStats) },
        })),

        toggleColonsShown: () => set((state) => ({ ...state, areColonsShown: !state.areColonsShown })),
    }
});

export const useZustandSelector = (state: ZustandState) => {
    return {
        view: state.view,
        phaseDetails: state.phaseDetails,
        startDate: state.startDate,
        endDate: state.endDate,
        timeDiff: state.timeDiff,
        percentageDone: state.percentageDone,

        progressLevels: state.progressLevels,

        areColonsShown: state.areColonsShown,
        areOptionsShown: state.areOptionsShown,
        statsToShow: state.statsToShow,
        setView: state.setView,
        setPhaseDetails: state.setPhaseDetails,
        setStartDate: state.setStartDate,
        setEndDate: state.setEndDate,
        setTimeDiff: state.setTimeDiff,
        setPercentageDone: state.setPercentageDone,

        setProgressLevels: state.setProgressLevels,

        setAreOptionsShown: state.setAreOptionsShown,
        setShowFoodStats: state.setShowFoodStats,
        setShowTobaccoStats: state.setShowTobaccoStats,
        toggleColonsShown: state.toggleColonsShown,
    }
};

function populateVisibleStats(showFoodStats: boolean, showTobaccoStats: boolean) {
    const visibleStats: string[] = [];
    if (showFoodStats) {
        visibleStats.push(...FOOD_FAST_INDICATORS);
    }
    if (showTobaccoStats) {
        visibleStats.push(...TOBACCO_FAST_INDICATORS);
    }

    return visibleStats;
}