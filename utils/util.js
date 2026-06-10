// utils/util.js
export class SimulationDataUtil {
    static getScenarioByLevel(level) {
        const scenarios = {
            1: {
                title: "🌱 레벨 1: 무너지는 생태계와 청정에너지 전환",
                situation: "⚠️ 전 세계적인 기후변화로 식량 공급망이 마비되기 시작했습니다. 화석연료 규제와 생태계 복원이 시급합니다.",
                options: [
                    { id: "A", text: "친환경 저탄소 농업 전환 및 해양 보호구역 지정 (-200억, 생태계-25, CP+20)", budget: -200, cp: 20, heat: -5, cold: 0, sea: 0, eco: -25 },
                    { id: "B", text: "화석연료 공장 전면 가동 및 인공 식량 대량 생산 (+150억, 생태계+20, CP-10)", budget: 150, cp: -10, heat: 15, cold: -5, sea: 5, eco: 20 }
                ]
            },
            2: {
                title: "☀️ 레벨 2: 극단적 폭염과 도시 열섬 현상",
                situation: "🔥 전 지구 평균 기온이 관측 이래 최고치를 기록했습니다. 도시 곳곳에서 대규모 정전과 열사병 사망자가 발생합니다.",
                options: [
                    { id: "A", text: "도심 빌딩 숲 전면 녹화 및 쿨루프 확산 사업 (-350억, 폭염-30, CP+30)", budget: -350, cp: 30, heat: -30, cold: 0, sea: 5, eco: -10 },
                    { id: "B", text: "석탄 화력 발전소 임시 증설로 냉방 전력 전량 공급 (-100억, 폭염+15, CP-20)", budget: -100, cp: -20, heat: 15, cold: -10, sea: 10, eco: 15 }
                ]
            },
            3: {
                title: "🌊 레벨 3: 빙하 유실과 해수면 상승 위기",
                situation: "🏔️ 극지방의 빙하가 가속화되어 녹아내리며, 주요 해안 대도시들이 침수 위기에 직면했습니다.",
                options: [
                    { id: "A", text: "탄소 배출 기업 강력 규제 및 글로벌 탄소 포집(CCUS) 기금 출연 (-500억, 해수면-20, 폭염-15, CP+50)", budget: -500, cp: 50, heat: -15, cold: 0, sea: -20, eco: -5 },
                    { id: "B", text: "해안가 거대 콘크리트 방조제 단기 시공 (-400억, 해수면-15, 생태계+15, CP+10)", budget: -400, cp: 10, heat: 5, cold: 0, sea: -15, eco: 15 }
                ]
            },
            4: {
                title: "❄️ 레벨 4: 제트기류 붕괴로 인한 극단적 한파",
                situation: "🥶 지구 온난화로 북극 제트기류가 붕괴하여, 역대급 한파와 폭설이 중위도 대륙을 덮쳤습니다. 에너지가 고갈되어 갑니다.",
                options: [
                    { id: "A", text: "그린 수소 기반 분산형 난방 인프라 긴급 구축 (-600억, 한파-25, CP+60)", budget: -600, cp: 60, heat: -5, cold: -25, sea: 0, eco: -5 },
                    { id: "B", text: "기존 가스 및 석유 비축분 전량 전력망 투입 (-200억, 한파-20, 폭염+20, CP-30)", budget: -200, cp: -30, heat: 20, cold: -20, sea: 15, eco: 10 }
                ]
            }
        };
        return scenarios[level] || null;
    }
}