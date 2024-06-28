const PHASES = [{
    name: "Anabolic",
    startHour: 0,
    hungerLevel: 0,
    autophagyLevel: 0,
}, {
    name: "Early Catabolic",
    startHour: 4,
    hungerLevel: 20,
    autophagyLevel: 0,
}, {
    name: "Catabolic",
    startHour: 8,
    hungerLevel: 60,
    autophagyLevel: 0,
}, {
    name: "Late Catabolic",
    startHour: 12,
    hungerLevel: 80,
    autophagyLevel: 0,
}, {
    name: "Ketosis",
    startHour: 16,
    hungerLevel: 100,
    autophagyLevel: 10,
}, {
    name: "Early Autophagy",
    startHour: 20,
    hungerLevel: 20,
    autophagyLevel: 40,
}, {
    name: "Autophagy",
    startHour: 24,
    hungerLevel: 10,
    autophagyLevel: 60,
}, {
    name: "Peak",
    startHour: 28,
    hungerLevel: 20,
    autophagyLevel: 80,
}, {
    name: "Starvation",
    startHour: 48,
    hungerLevel: 100,
    autophagyLevel: 100,
}, {
    name: "Dangerous",
    startHour: 1000,
    hungerLevel: 100,
    autophagyLevel: 100,
}];

export default PHASES;
