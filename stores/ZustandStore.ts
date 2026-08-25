import { create } from "zustand";
import { ZustandState } from "./ZustandStoreTypes";

export const PROGRESS_VIEW = {
    TIME_PASSED: "TIME_PASSED",
    PERC_PASSED: "PERC_PASSED",
};

export const useZustandStore = create<ZustandState>((set, get) => {
    return {
        view: PROGRESS_VIEW.TIME_PASSED,
        details: {
            name: "",
            iconPng: "",
        },
        startDate: null,
        endDate: null,
        timeDiff: {
            seconds: 0,
            minutes: 0,
            hours: 0,
        },
        percentageDone: 0,
        hungerLevel: 0,
        autophagyLevel: 0,
        healthBoost: 0,
        mentalBoost: 0,
        nicotineCraving: 0,
        nicotineInBlood: 0,
        irritabilityLevel: 0,
        areColonsShown: true,
        areOptionsShown: false,
        showFoodStats: true,
        showTobaccoStats: true,

        setView: (view) => set((state) => ({ ...state, view })),
        setDetails: (details) => set((state) => ({ ...state, details })),
        setStartDate: (startDate) => set((state) => ({ ...state, startDate })),
        setEndDate: (endDate) => set((state) => ({ ...state, endDate })),
        setTimeDiff: (timeDiff) => set((state) => ({ ...state, timeDiff })),
        setPercentageDone: (percentageDone) => set((state) => ({ ...state, percentageDone })),
        setHungerLevel: (hungerLevel) => set((state) => ({ ...state, hungerLevel })),
        setAuthophagyLevel: (authophagyLevel) => set((state) => ({ ...state, authophagyLevel })),
        setHealthBoost: (healthBoost) => set((state) => ({ ...state, healthBoost })),
        setMentalBoost: (mentalBoost) => set((state) => ({ ...state, mentalBoost })),
        setNicotineCraving: (nicotineCraving) => set((state) => ({ ...state, nicotineCraving })),
        setNicotineInBlood: (nicotineInBlood) => set((state) => ({ ...state, nicotineInBlood })),
        setIrritabilityLevel: (irritabilityLevel) => set((state) => ({ ...state, irritabilityLevel })),
        setAreOptionsShown: (areOptionsShown) => set((state) => ({ ...state, areOptionsShown })),
        setShowFoodStats: (showFoodStats) => set((state) => ({ ...state, showFoodStats })),
        setShowTobaccoStats: (showTobaccoStats) => set((state) => ({ ...state, showTobaccoStats })),
        toggleColonsShown: () => set((state) => ({ ...state, areColonsShown: !state.areColonsShown })),
    }
});

export const useZustandSelector = (state: ZustandState) => {
    return {
        view: state.view,
        details: state.details,
        startDate: state.startDate,
        endDate: state.endDate,
        timeDiff: state.timeDiff,
        percentageDone: state.percentageDone,
        hungerLevel: state.hungerLevel,
        autophagyLevel: state.autophagyLevel,
        healthBoost: state.healthBoost,
        mentalBoost: state.mentalBoost,
        nicotineCraving: state.nicotineCraving,
        nicotineInBlood: state.nicotineInBlood,
        irritabilityLevel: state.irritabilityLevel,
        areColonsShown: state.areColonsShown,
        areOptionsShown: state.areOptionsShown,
        showFoodStats: state.showFoodStats,
        showTobaccoStats: state.showTobaccoStats,
        setView: state.setView,
        setDetails: state.setDetails,
        setStartDate: state.setStartDate,
        setEndDate: state.setEndDate,
        setTimeDiff: state.setTimeDiff,
        setPercentageDone: state.setPercentageDone,
        setHungerLevel: state.setHungerLevel,
        setAuthophagyLevel: state.setAuthophagyLevel,
        setHealthBoost: state.setHealthBoost,
        setMentalBoost: state.setMentalBoost,
        setNicotineCraving: state.setNicotineCraving,
        setNicotineInBlood: state.setNicotineInBlood,
        setIrritabilityLevel: state.setIrritabilityLevel,
        setAreOptionsShown: state.setAreOptionsShown,
        setShowFoodStats: state.setShowFoodStats,
        setShowTobaccoStats: state.setShowTobaccoStats,
        toggleColonsShown: state.toggleColonsShown,
    }
};