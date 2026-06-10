// app.js (서버 구동 파일)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use('/models', express.static(path.join(__dirname, 'models')));
app.use('/services', express.static(path.join(__dirname, 'services')));
app.use('/routes', express.static(path.join(__dirname, 'routes')));
app.use('/utils', express.static(path.join(__dirname, 'utils')));
app.use('/serializers', express.static(path.join(__dirname, 'serializers')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/client-init.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.send(`
        import { ClimateSystemModel } from './models/model.js';
        import { ClimateSimulationService } from './services/service.js';
        import { SimulationDataUtil } from './utils/util.js';
        import { SimulationRouter } from './routes/route.js';

        const model = new ClimateSystemModel();
        
        // 💡 [밸런스 패치] 초기 예산을 3,000억으로 상향하여 7턴/14턴 대격변 A안 방어가 가능하도록 수정
        model.budget = 3000; 

        const service = new ClimateSimulationService(model);

        const uiRenderer = {
            updateDashboard() {
                document.getElementById('v-level').textContent = model.currentTurn + ' / ' + service.maxTurns + ' 턴';
                document.getElementById('v-budget').textContent = model.budget + '억';
                document.getElementById('v-cp').textContent = model.climatePoints + ' CP';
                document.getElementById('v-survival').textContent = model.globalSurvival + '%';

                document.getElementById('v-heatwave').textContent = model.threats.heatwave + '%';
                document.getElementById('v-coldwave').textContent = model.threats.coldwave + '%';
                document.getElementById('v-sealevel').textContent = model.threats.seaLevel + '%';
                document.getElementById('v-eco').textContent = model.threats.ecoDestruction + '%';
            },
            renderNextStep() {
                this.updateDashboard();
                const scenario = SimulationDataUtil.getScenarioByTurn(model.currentTurn);
                if (!scenario) return;

                document.getElementById('level-title').textContent = scenario.title;
                document.getElementById('situation').textContent = scenario.situation;
                
                const btnGroup = document.getElementById('choices');
                btnGroup.innerHTML = '';

                const isEventTurn = (model.currentTurn === 7 || model.currentTurn === 14);

                scenario.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = opt.id === 'A' ? 'action-green' : 'action-red';
                    
                    let buttonText = opt.text;
                    if (isEventTurn) {
                        buttonText = "⚠️ [이벤트 격변 2배 적용] " + buttonText;
                    }

                    btn.innerHTML = '<strong>' + opt.id + '안:</strong> ' + buttonText;
                    btn.addEventListener('click', () => router.handleUserChoice(opt));
                    btnGroup.appendChild(btn);
                });
            },
            renderEndGame(resultData) {
                this.updateDashboard();
                const container = document.getElementById('sim-container');
                const body = document.body;
                
                const grade = resultData.grade || "F";
                const message = resultData.msg || "시뮬레이션이 종료되었습니다.";

                let bgColor = "#0f172a";
                let accentColor = "#38bdf8";

                // 👑 S등급 달성 시 찬란한 황금빛 골드 이펙트 연출
                if (grade === "S") {
                    bgColor = "#451a03"; 
                    accentColor = "#facc15"; 
                } else if (grade === "A" || grade === "B" || grade === "C") {
                    bgColor = "#1e3a8a"; 
                    accentColor = "#60a5fa";
                } else if (grade === "E") {
                    bgColor = "#292524"; 
                    accentColor = "#a8a29e";
                } else {
                    bgColor = "#7f1d1d"; 
                    accentColor = "#f87171";
                }

                body.style.transition = "background 1.5s ease";
                body.style.backgroundColor = bgColor;
                container.style.borderColor = accentColor;
                container.style.boxShadow = "0 0 80px " + accentColor;

                if (grade === "S") {
                    container.style.background = "linear-gradient(145deg, #1e1b4b, #451a03)";
                }

                document.getElementById('level-title').textContent = grade === "S" ? "🏆 전지구적 기후 통제 신화 달성" : "📜 글로벌 기후 통제 최종 판정";
                document.getElementById('level-title').style.fontSize = "38px";
                document.getElementById('level-title').style.color = accentColor;

                const situationBox = document.getElementById('situation');
                situationBox.style.borderLeft = "10px solid " + accentColor;
                situationBox.style.padding = "40px";
                situationBox.innerHTML = \`<div style="font-size: 26px; line-height: 1.6; font-weight: 800; color: #ffffff; text-align:center;">\${message}</div>\`;

                const btnBg = grade === "S" ? "#facc15" : accentColor;
                const btnColor = grade === "S" ? "#000000" : "#020617";

                document.getElementById('choices').innerHTML = \`
                    <button onclick="window.location.reload()" style="text-align:center; background:\${btnBg}; color:\${btnColor}; font-size:24px; font-weight:900; width:100%; height:80px; border-radius:15px; border:none; cursor:pointer; box-shadow: 0 4px 20px rgba(250,204,21,0.4);">
                        영광스러운 타임라인 저장 후 다시 시작하기
                    </button>
                \`;
            }
        };

        const router = new SimulationRouter(service, uiRenderer);
        uiRenderer.renderNextStep();
    `);
});

app.listen(PORT, () => console.log(`🌍 시뮬레이터 서버 가동: http://localhost:${PORT}`));