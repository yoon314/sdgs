// serializers/serialize.js
export class ClimateDataSerializer {
    static toStatusDTO(model) {
        return {
            currentLevel: model.level,
            finances: { remainingBudget_M: model.budget, scoreCP: model.climatePoints },
            survivalRate: model.globalSurvival,
            disasterMetrics: { ...model.threats }
        };
    }

    static toFinalReport(model, outcomeMessage) {
        return JSON.stringify({
            game: "SDGs 13 Climate Action Simulator",
            completedAt: new Date().toISOString(),
            finalStatus: {
                levelReached: model.level,
                survivability: model.globalSurvival,
                totalCP: model.climatePoints,
                outcome: outcomeMessage
            }
        }, null, 2);
    }
}