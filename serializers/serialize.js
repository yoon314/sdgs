// serializers/serialize.js
export class ClimateDataSerializer {
    static toStatusDTO(model) {
        return {
            timelineTurn: `${model.currentTurn} / ${model.maxTurns}`,
            finances: { budget_M: model.budget, pointsCP: model.climatePoints },
            humanSurvival_pct: model.globalSurvival,
            climateIndicators: { ...model.threats }
        };
    }

    static toFinalReport(model, summaryText) {
        return JSON.stringify({
            meta: "SDGs 13 Climate 15-Turn Simulator Result",
            finalMetrics: {
                turnsCompleted: model.currentTurn,
                survivedRate: model.globalSurvival,
                totalCP: model.climatePoints,
                leftBudget: model.budget
            },
            gradeEvaluation: summaryText
        }, null, 2);
    }
}