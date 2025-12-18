
import http from 'http';

// Configuración para la prueba
const OPTIONS = {
    hostname: '127.0.0.1',
    port: 3001, // Asegúrate de que el puerto coincida con el de tu servidor
    path: '/game/api/leaderboard', // Endpoint protegido con rate limit
    method: 'GET'
};

const TOTAL_REQUESTS = 40; // Enviaremos 40 peticiones (el límite es 30 para leaderboard)

console.log(`🚀 Iniciando prueba de estrés al Rate Limiter...`);
console.log(`📋 Objetivo: ${OPTIONS.hostname}:${OPTIONS.port}${OPTIONS.path}`);
console.log(`📦 Solicitudes a enviar: ${TOTAL_REQUESTS}`);
console.log('--------------------------------------------------');

let executed = 0;
let successCount = 0;
let blockedCount = 0;

function sendRequest(id) {
    const req = http.request(OPTIONS, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            executed++;

            const status = res.statusCode;
            const remaining = res.headers['x-ratelimit-remaining'];

            if (status === 200) {
                successCount++;
                console.log(`✅ [${id}] Status: ${status} | Restantes: ${remaining}`);
            } else if (status === 429) {
                blockedCount++;
                console.log(`⛔ [${id}] Status: ${status} | BLOQUEADO CORRECTAMENTE | Retry-After: ${res.headers['retry-after']}s`);
            } else {
                console.log(`⚠️ [${id}] Status: ${status} | Otro estado inesperado`);
            }

            if (executed === TOTAL_REQUESTS) {
                printSummary();
            }
        });
    });

    req.on('error', (e) => {
        console.error(`❌ [${id}] Error de conexión: ${e.message}`);
        executed++;
        if (executed === TOTAL_REQUESTS) printSummary();
    });

    req.end();
}

function printSummary() {
    console.log('--------------------------------------------------');
    console.log('🏁 RESULTADOS DE LA PRUEBA');
    console.log(`Total Solicitudes: ${executed}`);
    console.log(`✅ Exitosas (200):  ${successCount}`);
    console.log(`⛔ Bloqueadas (429): ${blockedCount}`);
    console.log('--------------------------------------------------');

    if (blockedCount > 0) {
        console.log('✨ CONCLUSIÓN: ¡El Rate Limiter está funcionando!');
        console.log('   Si el límite era 30, deberías ver aprox 30 exitosas y el resto bloqueadas.');
    } else {
        console.log('⚠️ CONCLUSIÓN: No se bloquearon solicitudes. ¿Quizás el límite es muy alto?');
    }
}

// Lanzar las peticiones con un pequeño intervalo para no saturar el socket de golpe
for (let i = 1; i <= TOTAL_REQUESTS; i++) {
    setTimeout(() => {
        sendRequest(i);
    }, i * 50); // 50ms de diferencia entre cada una
}
