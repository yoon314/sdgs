// models/model.js
export class ClimateSystemModel {
    constructor() {
        this.level = 1;             // 현재 레벨 (1~4 레벨 존재)
        this.budget = 1200;         // 예산 (백만 달러)
        this.climatePoints = 0;     // 기후 포인트 (CP) - 올바른 선택 시 획득
        this.globalSurvival = 100;  // 인류 생존 확률 (%)

        // 4대 기후변화 위기 지표 (0 ~ 100%)
        this.threats = {
            heatwave: 40,           // 극단적 폭염
            coldwave: 30,           // 극단적 한파
            seaLevel: 35,           // 해수면 상승
            ecoDestruction: 45      // 생태계 파괴
        };
    }

    // 예산 및 포인트 변동
    addResources(budgetDelta, cpDelta) {
        this.budget += budgetDelta;
        this.climatePoints = Math.max(0, this.climatePoints + cpDelta);
    }

    // 위기 지표 변동 및 한계치 제한
    updateThreats(heat, cold, sea, eco) {
        this.threats.heatwave = Math.max(0, Math.min(100, this.threats.heatwave + heat));
        this.threats.coldwave = Math.max(0, Math.min(100, this.threats.coldwave + cold));
        this.threats.seaLevel = Math.max(0, Math.min(100, this.threats.seaLevel + sea));
        this.threats.ecoDestruction = Math.max(0, Math.min(100, this.threats.ecoDestruction + eco));
    }

    // 레벨 업 및 난이도 가중치 부여
    levelUp() {
        this.level++;
        // 레벨이 올라갈 때마다 기본 기후 위기 지표가 자연 상승 (온난화 가속화)
        this.threats.heatwave = Math.min(100, this.threats.heatwave + 15);
        this.threats.seaLevel = Math.min(100, this.threats.seaLevel + 10);
        this.threats.ecoDestruction = Math.min(100, this.threats.ecoDestruction + 15);
    }

    // 최종 턴마다 인류 생존 확률 연산
    calculateSurvivalChance() {
        // 4대 위기 지표의 평균값이 높을수록 생존 확률 급감
        const averageThreat = (this.threats.heatwave + this.threats.coldwave + this.threats.seaLevel + this.threats.ecoDestruction) / 4;
        
        if (averageThreat > 75) {
            this.globalSurvival = Math.max(0, this.globalSurvival - 35);
        } else if (averageThreat > 50) {
            this.globalSurvival = Math.max(0, this.globalSurvival - 15);
        } else {
            this.globalSurvival = Math.min(100, this.globalSurvival + 5); // 위기 관리가 잘되면 생존율 회복
        }
    }
}