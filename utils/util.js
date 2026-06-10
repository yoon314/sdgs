// utils/util.js
export class SimulationDataUtil {
    static getScenarioByTurn(turn) {
        const bank = {
            1: { title: "1단계: 신재생 에너지 보조금 법안", situation: "태양광 및 풍력 발전 인프라 확충을 위한 국가 보조금 편성이 도마 위에 올랐습니다.", 
                 options: [{id:"A", text:"[+70 CP] 보조금 지급 (-200억 / 폭염 -15%)", budget:-200, cp:70, heat:-15, cold:0, sea:0, eco:-5}, // 🔥 지출 완화 (-300 -> -200)
                           {id:"B", text:"[-20 CP] 화석연료 유지 (+250억 / 폭염 +5%)", budget:250, cp:-20, heat:5, cold:0, sea:2, eco:2}] }, // 🔥 수입 강화 (+200 -> +250)
            2: { title: "2단계: 개발제한구역(그린벨트) 해제 건", situation: "주택 공급 확대를 위해 도심 주변 대규모 산림 허브를 해제하라는 압박이 들어옵니다.", 
                 options: [{id:"A", text:"[+80 CP] 그린벨트 사수 (-100억 / 생태계 -20%)", budget:-100, cp:80, heat:-5, cold:0, sea:0, eco:-20},
                           {id:"B", text:"[-30 CP] 전면 토지 개발 (+300억 / 생태계 +10%)", budget:300, cp:-30, heat:4, cold:0, sea:0, eco:10}] },
            3: { title: "3단계: 노후 경유차 도심 진입 규제", situation: "온실가스의 주범인 내연기관 차량의 도심 진입 제한 과태료 정책입니다.", 
                 options: [{id:"A", text:"[+70 CP] 전기차 전환 지원 (-150억 / 폭염 -10%)", budget:-150, cp:70, heat:-10, cold:0, sea:0, eco:-5},
                           {id:"B", text:"[-20 CP] 규제 백지화 (+150억 / 폭염 +4%)", budget:150, cp:-20, heat:4, cold:0, sea:0, eco:2}] },
            4: { title: "4단계: 일회용 플라스틱 전면 금지령", situation: "미세 플라스틱 가속화를 막기 위해 일회용품 사용을 법으로 금지하고자 합니다.", 
                 options: [{id:"A", text:"[+75 CP] 친환경 소재 의무화 (-150억 / 생태계 -15%)", budget:-150, cp:75, heat:0, cold:0, sea:0, eco:-15},
                           {id:"B", text:"[-25 CP] 제조업 단가 방치 (+200억 / 생태계 +8%)", budget:200, cp:-25, heat:0, cold:0, sea:2, eco:8}] },
            5: { title: "5단계: 탄소 배출권 거래제 강화", situation: "기업들에게 할당된 탄소 배출 허용 총량을 대폭 삭감하여 기후 위기에 대응하고자 합니다.", 
                 options: [{id:"A", text:"[+90 CP] 과감한 배출권 축소 (-200억 / 폭염 -15%, 해수면 -10%)", budget:-200, cp:90, heat:-15, cold:0, sea:-10, eco:0},
                           {id:"B", text:"[-35 CP] 산업 경쟁력 유예 (+300억 / 폭염 +5%, 해수면 +4%)", budget:300, cp:-35, heat:5, cold:0, sea:4, eco:2}] },
            6: { title: "6단계: 북극해 화석연료 자원 채굴", situation: "빙하가 녹아 열린 북극해 해선에서 추가 유전을 발굴하자는 경제계의 요구입니다.", 
                 options: [{id:"A", text:"[+90 CP] 북극 보호 조약 가입 (-150억 / 해수면 -15%)", budget:-150, cp:90, heat:0, cold:0, sea:-15, eco:-5},
                           {id:"B", text:"[-40 CP] 공격적 채굴 시작 (+450억 / 해수면 +8%)", budget:450, cp:-40, heat:2, cold:0, sea:8, eco:5}] },
            
            // ⚡ 7단계 대격변 (2배율 적용 시 예산 -300억 차감으로 다듬어 2,500억 스타트 유저 방어)
            7: { title: "⚡ 7단계: [기후 격변] 엘니뇨 가속화 및 초강력 슈퍼 태풍", situation: "🚨 기후 변동성이 극대화되는 초임계 국면입니다! 이번 단계의 모든 수치가 무려 2배로 증폭됩니다!", 
                 options: [{id:"A", text:"[+200 CP 적용] 글로벌 재난 펀드 수혈 (-300억 / 재난 대폭 방어)", budget:-150, cp:100, heat:-15, cold:0, sea:-15, eco:-15},
                           {id:"B", text:"[-100 CP 적용] 민간 각자도생 유도 (+100억 / 모든 위기 완화 증가)", budget:50, cp:-50, heat:4, cold:5, sea:5, eco:5}] },
            
            8: { title: "8단계: 아마존 열대우림 보호 기금 출연", situation: "지구의 허파인 열대우림 파괴를 막기 위한 글로벌 공동 방재 펀드 기여 요청이 왔습니다.", 
                 options: [{id:"A", text:"[+95 CP] 최대한도로 기금 송금 (-250억 / 생태계 -15%)", budget:-250, cp:95, heat:-10, cold:0, sea:0, eco:-15},
                           {id:"B", text:"[-35 CP] 국내 현안 우선 거부 (+100억 / 생태계 +6%)", budget:100, cp:-35, heat:2, cold:0, sea:0, eco:6}] },
            9: { title: "9단계: 구형 석탐 화력 발전소 조기 폐쇄", situation: "가장 저렴하지만 환경 오염이 심한 구형 석탄 발전소들의 가동 중단 처리 안건입니다.", 
                 options: [{id:"A", text:"[+110 CP] 발전소 조기 폐쇄 (-300억 / 폭염 -20%, 한파 -10%)", budget:-300, cp:110, heat:-20, cold:-10, sea:5, eco:-5},
                           {id:"B", text:"[-50 CP] 경제적 가동 연장 (+250억 / 폭염 +8%, 한파 +4%)", budget:250, cp:-50, heat:8, cold:4, sea:2, eco:2}] },
            10: { title: "10단계: 해안 도시 스마트 제방 빌드", situation: "해수면 상승으로 만조 때마다 역류하는 해안가 하수 인프라를 개보수해야 합니다.", 
                 options: [{id:"A", text:"[+85 CP] 갯벌 복원 및 스마트 제방 (-300억 / 해수면 -25%)", budget:-300, cp:85, heat:0, cold:0, sea:-25, eco:-10},
                           {id:"B", text:"[-30 CP] 임시 유수지 설치 땜질 (+150억 / 해수면 +6%)", budget:150, cp:-30, heat:0, cold:0, sea:6, eco:2}] },
            11: { title: "11단계: 한파 대비 취약계층 단열재 교체", situation: "북극 제트기류 붕괴로 매년 겨울 몰아치는 한파에 맞선 단열재 교체 사업입니다.", 
                  options: [{id:"A", text:"[+80 CP] 단열 보조금 대폭 지급 (-200억 / 한파 -20%)", budget:-200, cp:80, heat:0, cold:-20, sea:0, eco:0},
                            {id:"B", text:"[-25 CP] 화석연료 난방 가동 유도 (+200억 / 한파 +6%)", budget:200, cp:-25, heat:4, cold:6, sea:0, eco:0}] },
            12: { title: "12단계: 친환경 대중교통(수소 버스) 전면 전환", situation: "지방 자치 단체의 모든 시내버스를 친환경 청정 수소 버스로 변경하는 안건입니다.", 
                  options: [{id:"A", text:"[+85 CP] 수소 대중교통 전환 지원 (-250억 / 폭염 -15%)", budget:-250, cp:85, heat:-15, cold:0, sea:0, eco:0},
                            {id:"B", text:"[-30 CP] 내연기관 보조금 유지 (+150억 / 폭염 +5%)", budget:150, cp:-30, heat:5, cold:0, sea:0, eco:2}] },
            13: { title: "13단계: 토양 황폐화 화학 비료 규제", situation: "토양 생태계를 황폐화시키고 아산화질소를 배출하는 화학 비료 공정에 대한 규제안입니다.", 
                  options: [{id:"A", text:"[+90 CP] 유기농법 전환 예산 투입 (-150억 / 생태계 -25%)", budget:-150, cp:90, heat:-5, cold:0, sea:0, eco:-25},
                            {id:"B", text:"[-35 CP] 규제 철회 및 대량 생산 (+200억 / 생태계 +8%)", budget:200, cp:-35, heat:2, cold:0, sea:0, eco:8}] },
            
            // ⚡ 14단계 대격변 (2배율 적용 시 총 -300억 차감으로 완화하여 15~16턴 파산선 완벽 붕괴)
            14: { title: "⚡ 14단계: [기후 격변] 제트기류 완전 대붕괴 사건", situation: "🚨 북극 한랭 전선이 대륙을 직접 강타합니다! 이번 단계 역시 모든 수치가 2배로 폭증합니다!", 
                  options: [{id:"A", text:"[+240 CP 적용] 초고효율 열펌프 그리드 긴급 교체 (-300억 / 한파 대폭 방어)", budget:-150, cp:120, heat:0, cold:-25, sea:0, eco:-10},
                            {id:"B", text:"[-100 CP 적용] 가용한 화석연료 전량 노천 연소 (+400억 / 환경 초토화)", budget:200, cp:-50, heat:6, cold:-20, sea:4, eco:10}] },
            
            15: { title: "15단계: 중공업 친환경 수소환원 공정 명령", situation: "제조 산업의 심장인 철강 공정을 고비용 친환경 저탄소 공정으로 강제 전환합니다.", 
                  options: [{id:"A", text:"[+140 CP] 설비 리모델링 금융 지원 (-400억 / 폭염 -25%)", budget:-400, cp:140, heat:-25, cold:0, sea:-5, eco:-5},
                            {id:"B", text:"[-60 CP] 현행 저비용 공정 허용 (+300억 / 폭염 +10%)", budget:300, cp:-60, heat:10, cold:0, sea:2, eco:2}] },
            16: { title: "16단계: 대규모 산림 수목 허브 조성", situation: "도시 열섬 현상을 식히고 공기 중 탄소를 포집할 거대 국유지 산림화 사업입니다.", 
                  options: [{id:"A", text:"[+120 CP] 국유지 산림화 전면 집행 (-250억 / 생태계 -20%)", budget:-250, cp:120, heat:-15, cold:0, sea:0, eco:-20},
                            {id:"B", text:"[-45 CP] 부지 대기업 빌딩 매각 (+400억 / 생태계 +6%)", budget:400, cp:-45, heat:8, cold:0, sea:0, eco:6}] },
            17: { title: "17단계: 메탄 배출 가축 사육 제한 및 대체육 보조", situation: "글로벌 온실가스의 거대 지분을 차지하는 축산업에 대한 메탄 규제와 대체 단백질 육성책입니다.", 
                  options: [{id:"A", text:"[+110 CP] 대체육 배양 펀드 구축 (-200억 / 생태계 -15%)", budget:-200, cp:110, heat:-10, cold:0, sea:0, eco:-15},
                            {id:"B", text:"[-40 CP] 기존 축산 업계 전폭 지원 (+200억 / 생태계 +6%)", budget:200, cp:-40, heat:5, cold:0, sea:0, eco:6}] },
            18: { title: "18단계: 초국적 해양 미세 플라스틱 수거 함대 가동", situation: "오대양의 거대 플라스틱 쓰레기 지대를 청소하고 해양 생태계를 긴급 회복하기 위한 연합 작전입니다.", 
                  options: [{id:"A", text:"[+120 CP] 수거 전용 자동화 함대 파견 (-300억 / 생태계 -25%)", budget:-300, cp:120, heat:0, cold:0, sea:-5, eco:-25},
                            {id:"B", text:"[-45 CP] 영해 외 지역 방치 선언 (+150억 / 생태계 +8%)", budget:150, cp:-45, heat:0, cold:0, sea:2, eco:8}] },
            19: { title: "19단계: 친환경 저탄소 스마트 빌딩 의무화", situation: "신축되는 모든 건축물에 태양광 외벽과 제로 에너지 단열 공법을 강제하는 법안입니다.", 
                  options: [{id:"A", text:"[+130 CP] 의무화 법안 통과 및 보조 (-350억 / 폭염 -20%, 한파 -15%)", budget:-350, cp:130, heat:-20, cold:-15, sea:0, eco:0},
                            {id:"B", text:"[-55 CP] 건설 경기 부양 위해 폐기 (+300억 / 폭염 +6%, 한파 +6%)", budget:300, cp:-55, heat:6, cold:6, sea:0, eco:0}] },
            20: { title: "20단계: 파리 기후 협약 최종 분담금 정산", situation: "최종 단계입니다. 지구 기후 파멸 마지노선을 막기 위한 국제 기후 기금의 최종 정산 분담금입니다.", 
                  options: [{id:"A", text:"[+200 CP] 분담금 전액 송금 (-500억 / 모든 위기 지표 대폭 감소)", budget:-500, cp:200, heat:-20, cold:-20, sea:-20, eco:-20},
                            {id:"B", text:"[-100 CP] 협약 탈퇴 및 독자 노선 (+400억 / 모든 위기 지표 폭등)", budget:400, cp:-100, heat:10, cold:10, sea:10, eco:10}] }
        };
        return bank[turn] || null;
    }
}