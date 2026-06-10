// routes/route.js
export class SimulationRouter {
    constructor(service, uiRenderer) {
        this.service = service;
        this.ui = uiRenderer;
    }

    handleUserChoice(option) {
        const result = this.service.executePolicy(option);

        if (!result.success) {
            alert(result.message);
            return;
        }

        if (result.status === "GAMEOVER" || result.status === "VICTORY") {
            this.ui.renderEndGame(result.msg);
        } else {
            this.ui.renderNextStep();
        }
    }
}