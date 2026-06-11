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
        
        // 📊 4대 위험도 지표 변수 추출
        const h = this.model.threats.heatwave;
        const c = this.model.threats.coldwave;
        const sea = this.model.threats.seaLevel;
        const eco = this.model.threats.ecoDestruction;

        // 👑 [S등급 조건] CP 1400 이상 + 생존율 100% 이상 + 4대 재난 각각 10% 이하 (완벽 통제)
        if (s >= 100 && cp >= 1400 && h <= 10 && c <= 10 && sea <= 10 && eco <= 10) {
            return { 
                grade: "S", 
                msg: `👑 [S등급 - 신화적 통제관]<br>최종 ${cp} CP, 생존율 ${s}%!<br>` +
                     `<span style="font-size:18px; color:#facc15;">[재난 통제 지표: 폭염 ${h}% | 한파 ${c}% | 해수면 ${sea}% | 생태계 ${eco}%]</span><br>` +
                     `한 치의 오차도 허용하지 않는 완벽한 재난 제어로 청정 지구 타임라인을 구현했습니다.` 
            };
        }
        
        // 👍 [A등급 조건] CP 1000 이상 + 생존율 85% 이상 + 4대 재난 각각 15% 이하 (시작점 방어)
        if (s >= 85 && cp >= 1000 && h <= 15 && c <= 15 && sea <= 15 && eco <= 15) {
            return { 
                grade: "A", 
                msg: `👍 [A등급 - 정예 행정가]<br>최종 ${cp} CP, 생존율 ${s}%!<br>` +
                     `[재난 통제 지표: 폭염 ${h}% | 한파 ${c}% | 해수면 ${sea}% | 생태계 ${eco}%]<br>` +
                     `훌륭한 행정 능력이었으나, 기후 리스크를 완전히 박멸하는 신화적 단계에는 조금 미치지 못했습니다.` 
            };
        }
        
        // 📊 [B등급 조건] CP 450 이상 + 생존율 65% 이상 + 4대 재난 각각 50% 미만 (위험선 방어)
        if (s >= 65 && cp >= 450 && h < 50 && c < 50 && sea < 50 && eco < 50) {
            return { 
                grade: "B", 
                msg: `📊 [B등급 - 안정적 기후 통제 안착]<br>최종 ${cp} CP, 생존율 ${s}%!<br>` +
                     `인류의 터전이 다소 위축되고 위기가 잔존해 있으나, 안정화 체계에 무사히 진입시켰습니다.` 
            };
        }

        // 📉 [C등급 조건]
        if (s >= 45 && cp >= 150) {
            return { grade: "C", msg: `📉 [C등급 - 위태로운 보존 국면]<br>최종 ${cp} CP, 생존율 ${s}%!<br>매년 거듭되는 국지적 기후 재해 속에서 가까스로 인류 문명의 맥을 이어갑니다.` };
        }

        // 🛑 [E등급 조건]
        if (s >= 20 || cp >= -500) {
            return { grade: "E", msg: `🛑 [E등급 - 문명의 극심한 퇴보]<br>최종 ${cp} CP, 생존율 ${s}%!<br>마이너스로 곤두박질친 기후 점수와 망가진 생태계로 인해 인류는 거대 돔 시티로 이주를 개시합니다.` };
        }

        return { grade: "F", msg: `🌋 [F등급 - 황금 만능주의 빌런]<br>최종 ${cp} CP, 생존율 ${s}%!<br>기후 위기를 철저히 방치하고 자본만을 좇은 결과, 지구는 거대한 재앙의 도가니가 되었습니다.` };
    }
}