// services/service.js
import { SimulationDataUtil } from '../utils/util.js';

export class ClimateSimulationService {
    constructor(climateModel) {
        this.model = climateModel;
        this.maxLevel = 4;
    }

    // 플레이어의 기후 정책 집행
    executePolicy(option) {
        // 예산 부족 예외 처리
        if (this.model.budget + option.budget < 0) {
            return { success: false, message: "⚠️ 정책 자금(예산)이 부족하여 통과시킬 수 없는 법안입니다!" };
        }

        // 1. 수치 적용
        this.model.addResources(option.budget, option.cp);
        this.model.updateThreats(option.heat, option.cold, option.sea, option.eco);
        
        // 2. 생존 확률 업데이트
        this.model.calculateSurvivalChance();

        // 3. 게임 오버 조건 체크 (생존 확률 0%)
        if (this.model.globalSurvival <= 0) {
            return { success: true, status: "GAMEOVER", msg: "💀 인류 멸망: 기후 재난 통제 불능으로 인류 생존 확률이 0%에 도달했습니다." };
        }

        // 4. 레벨 진행 판단
        if (this.model.level >= this.maxLevel) {
            return { success: true, status: "VICTORY", msg: `🎉 지구 복원 성공! 최종 기후 포인트(CP): ${this.model.climatePoints}점을 획득하며 지속 가능한 지구를 만들어냈습니다!` };
        } else {
            this.model.levelUp();
            return { success: true, status: "NEXT_LEVEL" };
        }
    }
}