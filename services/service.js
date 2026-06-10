// services/service.js
export class ClimateSimulationService {
    constructor(climateModel) {
        this.model = climateModel;
        this.maxTurns = 20;
    }

    executePolicy(option) {
        const multiplier = (this.model.currentTurn === 7 || this.model.currentTurn === 14) ? 2 : 1;

        const finalBudgetDelta = option.budget * multiplier;
        const finalCpDelta = option.cp * multiplier;
        const finalHeat = option.heat * multiplier;
        const finalCold = option.cold * multiplier;
        const finalSea = option.sea * multiplier;
        const finalEco = option.eco * multiplier;

        // 예산 파산 판정 (0원 미만 시 즉시 종료)
        if (this.model.budget + finalBudgetDelta < 0) {
            return { 
                status: "END", 
                grade: "BANKRUPT",
                msg: `💥 [재정 파산 엔딩]<br>기후 대응 예산이 전액 소모되어 국가 재정이 파산했습니다.` 
            };
        }

        this.model.applyResources(finalBudgetDelta, finalCpDelta);
        this.model.applyThreats(finalHeat, finalCold, finalSea, finalEco);
        this.model.calculateSurvival();

        // 4대 위기 100% 도달 시 즉시 파멸
        if (this.model.threats.heatwave >= 100) return { status: "END", grade: "F", msg: `🌋 [🚨 폭염 파멸 엔딩]` };
        if (this.model.threats.coldwave >= 100) return { status: "END", grade: "F", msg: `❄️ [🚨 한파 파멸 엔딩]` };
        if (this.model.threats.seaLevel >= 100) return { status: "END", grade: "F", msg: `🌊 [🚨 해수면 파멸 엔딩]` };
        if (this.model.threats.ecoDestruction >= 100) return { status: "END", grade: "F", msg: `🍂 [🚨 생태계 파멸 엔딩]` };

        if (this.model.globalSurvival <= 0) {
            return { status: "END", grade: "EXTINCTION", msg: `💀 [인류 멸망 엔딩]` };
        }

        if (this.model.currentTurn >= this.maxTurns) {
            return { status: "END", ...this.evaluateFinalScore() };
        }

        this.model.currentTurn++;
        return { status: "CONTINUE" };
    }

    evaluateFinalScore() {
        const cp = this.model.climatePoints;
        const s = this.model.globalSurvival;

        // 👑 [🔥 하드코어 패치] S등급 조건 극상향 (2개 루트만 도달 가능)
        // 생존 확률 99% 이상 최상의 상태와 초고득점 CP를 동시 요구
        if (s >= 99 && cp >= 1250) {
            return { grade: "S", msg: `👑 [S등급 - 신화적 통제관]<br>최종 ${cp} CP, 생존율 ${s}%! 한 치의 오차도 허용하지 않는 완벽한 타임라인을 구현해 냈습니다. 당신은 지구의 구원자입니다.` };
        }
        
        // A등급 커트라인
        if (s >= 85 && cp >= 950) {
            return { grade: "A", msg: `👍 [A등급 - 정예 행정가]<br>최종 ${cp} CP, 생존율 ${s}%! 훌륭한 행정 능력이었으나, 완벽한 신화에 도달하기에는 2% 부족했습니다.` };
        }
        
        // 하위 등급 설명 유지
        if (s >= 65 && cp >= 450) {
            return { grade: "B", msg: `📊 [B등급 - 안정적 기후 통제 안착]<br>최종 ${cp} CP, 생존율 ${s}%! 인류의 터전이 다소 위축되었으나, 축적된 기후 데이터를 기반으로 안정화 체계에 무사히 진입했습니다.` };
        }
        if (s >= 45 && cp >= 150) {
            return { grade: "C", msg: `📉 [C등급 - 위태로운 보존 국면]<br>최종 ${cp} CP, 생존율 ${s}%! 매년 거듭되는 국지적 이상 기후 속에서 가까스로 인류 문명의 맥을 이어가는 데 만족해야 합니다.` };
        }
        if (s >= 20 || cp >= -500) {
            return { grade: "E", msg: `🛑 [E등급 - 문명의 극심한 퇴보]<br>최종 ${cp} CP, 생존율 ${s}%! 마이너스로 곤두박질친 기후 점수와 망가진 생태계로 인해 생존자들은 지하 벙커와 돔 시티로 전격 이주를 개시합니다.` };
        }
        return { grade: "F", msg: `🌋 [F등급 - 황금 만능주의 빌런]<br>최종 ${cp} CP, 생존율 ${s}%! 기후 위기를 철저히 방치하고 자본만을 좇은 결과, 지구는 거대한 재앙의 도가니로 변모해 돌이킬 수 없는 파멸을 맞이했습니다.` };
    }
}