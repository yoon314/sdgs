// models/model.js
export class ClimateSystemModel {
    constructor() {
        this.currentTurn = 1;
        this.budget = 2500; // 기초값 (app.js에서 주입하여 오버라이딩 가능)
        this.climatePoints = 0;
        this.globalSurvival = 100;

        this.threats = {
            heatwave: 25,
            coldwave: 25,
            seaLevel: 25,
            ecoDestruction: 25
        };
    }

    applyResources(budgetDelta, cpDelta) {
        this.budget += budgetDelta;
        
        // 💡 [요청 반영] Math.max(0, ...) 로직 제거! 
        // 이제 cpDelta가 마이너스면 차감되는 대로 음수 스코어가 무한히 누적됩니다.
        this.climatePoints += cpDelta; 
    }

    applyThreats(heatDelta, coldDelta, seaDelta, ecoDelta) {
        this.threats.heatwave = Math.max(0, Math.min(100, this.threats.heatwave + heatDelta));
        this.threats.coldwave = Math.max(0, Math.min(100, this.threats.coldwave + coldDelta));
        this.threats.seaLevel = Math.max(0, Math.min(100, this.threats.seaLevel + seaDelta));
        this.threats.ecoDestruction = Math.max(0, Math.min(100, this.threats.ecoDestruction + ecoDelta));
    }

    calculateSurvival() {
        const avgThreat = (this.threats.heatwave + this.threats.coldwave + this.threats.seaLevel + this.threats.ecoDestruction) / 4;
        
        if (avgThreat > 50) {
            const penalty = (avgThreat - 50) * 1.5;
            this.globalSurvival = Math.max(0, Math.round(100 - penalty));
        } else {
            this.globalSurvival = 100;
        }
    }
}