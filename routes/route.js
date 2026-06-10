// routes/route.js
export class SimulationRouter {
    constructor(service, uiRenderer) {
        this.service = service;
        this.ui = uiRenderer;
    }

    handleUserChoice(option) {
        const result = this.service.executePolicy(option);

        // 안전 장치: 결과 데이터가 제대로 안 넘어왔을 경우 예외 처리
        if (!result) {
            console.error("서비스로부터 결과 데이터를 받지 못했습니다.");
            return;
        }

        // 엔딩 상태(END)일 때만 결과 화면을 그리도록 명확히 제한
        if (result.status === "END") {
            this.ui.renderEndGame(result); // result 객체 전체({grade, msg})를 전달
        } else {
            // 게임이 계속 진행 중일 때는 다음 턴 카드 렌더링
            this.ui.renderNextStep();
        }
    }
}