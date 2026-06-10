// app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 정적 자원 개방
app.use('/models', express.static(path.join(__dirname, 'models')));
app.use('/services', express.static(path.join(__dirname, 'services')));
app.use('/routes', express.static(path.join(__dirname, 'routes')));
app.use('/utils', express.static(path.join(__dirname, 'utils')));
app.use('/serializers', express.static(path.join(__dirname, 'serializers')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 브라우저 프론트엔드가 실행할 런타임 게임 스크립트
app.get('/client-init.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.send(`
        import { ClimateSystemModel } from './models/model.js';
        import { ClimateSimulationService } from './services/service.js';
        import { SimulationDataUtil } from './utils/util.js';
        import { SimulationRouter } from './routes/route.js';
        import { ClimateDataSerializer } from './serializers/serialize.js';

        const model = new ClimateSystemModel();
        const service = new ClimateSimulationService(model);

        const uiRenderer = {
            updateDashboard() {
                document.getElementById('v-level').textContent = 'LV.' + model.level;
                document.getElementById('v-budget').textContent = model.budget + '억';
                document.getElementById('v-cp').textContent = model.climatePoints + ' CP';
                document.getElementById('v-survival').textContent = model.globalSurvival + '%';

                // 4대 지표 갱신
                document.getElementById('v-heatwave').textContent = model.threats.heatwave + '%';
                document.getElementById('v-coldwave').textContent = model.threats.coldwave + '%';
                document.getElementById('v-sealevel').textContent = model.threats.seaLevel + '%';
                document.getElementById('v-eco').textContent = model.threats.ecoDestruction + '%';
            },
            renderNextStep() {
                this.updateDashboard();
                const scenario = SimulationDataUtil.getScenarioByLevel(model.level);
                if (!scenario) return;

                document.getElementById('level-title').textContent = scenario.title;
                document.getElementById('situation').textContent = scenario.situation;
                
                const btnGroup = document.getElementById('choices');
                btnGroup.innerHTML = '';

                scenario.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = opt.id === 'A' ? 'action-green' : 'action-red';
                    btn.textContent = '[' + opt.id + '안] ' + opt.text;
                    btn.addEventListener('click', () => router.handleUserChoice(opt));
                    btnGroup.appendChild(btn);
                });
                console.log("System Sync DTO:", ClimateDataSerializer.toStatusDTO(model));
            },
            renderEndGame(endMsg) {
                this.updateDashboard();
                document.getElementById('level-title').textContent = "🌍 최종 리포트";
                document.getElementById('situation').innerHTML = '<p style="font-size:18px; font-weight:bold;">' + endMsg + '</p>';
                document.getElementById('choices').innerHTML = '<button onclick="window.location.reload()" style="text-align:center; background:#3b82f6;">새로운 타임라인으로 시작</button>';
                console.log(ClimateDataSerializer.toFinalReport(model, endMsg));
            }
        };

        const router = new SimulationRouter(service, uiRenderer);
        uiRenderer.renderNextStep();
    `);
});

app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`   🌍 SDGs 13 다중 기후위기 대응 시뮬레이터 가동`);
    console.log(`   🔗 접속 호스트: http://localhost:${PORT}`);
    console.log(`==================================================`);
});