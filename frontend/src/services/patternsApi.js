export const ENDPOINTS = [
    { id: 'hello', path: '/hello', title: 'Health & Info', description: 'Respuesta básica del controlador.' },
    { id: 'circuit-breaker', path: '/circuit-breaker', title: 'Circuit Breaker', description: 'Resilience4j (CLOSED / OPEN / HALF_OPEN).' },
    { id: 'retry', path: '/retry', title: 'Retry Pattern', description: 'Reintentos automáticos ante fallos transitorios.' },
    { id: 'timeout', path: '/timeout', title: 'Timeout Pattern', description: 'Corte de ejecución por límite de tiempo (504).' },
    { id: 'hub-spoke', path: '/hub-spoke', title: 'Hub-and-Spoke', description: 'Orquestación centralizada de mensajes.' },
    { id: 'lambda', path: '/lambda', title: 'AWS Lambda', description: 'Invocación serverless con parámetro name.', paramName: 'name', defaultParam: 'Mundo',},
];

let mockCbFailures = 0;
let mockCbState = 'CLOSED';

export function resetMockCircuitBreaker() {
    mockCbFailures = 0;
    mockCbState = 'CLOSED';
}

export async function callPatternEndpoint(baseUrl, path, isMock = false, params = {}) {
    const startTime = performance.now();

    if (!isMock) {
        const cleanBase = baseUrl.replace(/\/$/, '');
        const query = new URLSearchParams(params).toString();
        const url = `${cleanBase}${path}${query ? `?${query}` : ''}`;

        const response = await fetch(url);
        const data = await response.json();
        const latency = Math.round(performance.now() - startTime);

        return {
            ok: response.ok,
            status: response.status,
            latency,
            data,
        };
    }

    // Simulación fiel a DemoController.java
    await new Promise((r) => setTimeout(r, 350));
    const latency = Math.round(performance.now() - startTime);

    switch (path) {
        case '/hello':
            return {
                ok: true,
                status: 200,
                latency,
                data: { message: 'Hello World!', application: 'Cloud Architecture Demo', language: 'Java' },
            };

        case '/circuit-breaker': {
            if (mockCbState === 'OPEN') {
                return {
                    ok: false,
                    status: 503,
                    latency,
                    data: { error: 'Circuit abierto: solicitud bloqueada', state: 'OPEN' },
                };
            }
            mockCbFailures++;
            if (mockCbFailures >= 3) {
                mockCbState = 'OPEN';
                return {
                    ok: false,
                    status: 503,
                    latency,
                    data: { error: 'Fallo en servicio externo (Umbral alcanzado)', state: 'OPEN' },
                };
            }
            return {
                ok: true,
                status: 200,
                latency,
                data: { result: `Ejecución exitosa (intento ${mockCbFailures}/2 antes de abrir)`, state: mockCbState },
            };
        }

        case '/retry':
            return {
                ok: true,
                status: 200,
                latency: latency + 400,
                data: { result: 'Operación completada tras 2 reintentos', pattern: 'Retry Pattern' },
            };

        case '/timeout': {
            const timedOut = Math.random() > 0.5;
            return timedOut
                ? { ok: false, status: 504, latency: 2000, data: { error: 'TimeLimiterTimeoutException: Tiempo excedido', pattern: 'Timeout Pattern' } }
                : { ok: true, status: 200, latency, data: { result: 'Respuesta recibida dentro del umbral de tiempo' } };
        }

        case '/hub-spoke':
            return {
                ok: true,
                status: 200,
                latency,
                data: {
                    architecture: 'Hub-and-Spoke',
                    messages: [
                        'Hub recibió petición central',
                        'Spoke-1 (Auth) validado',
                        'Spoke-2 (Billing) procesado',
                        'Hub consolidó respuesta',
                    ],
                },
            };

        case '/lambda': {
            const targetName = params.name?.trim() || 'Mundo';
            return {
                ok: true,
                status: 200,
                latency: latency + 120, // simula cold/warm start ligero
                data: {
                    function: 'AWS Lambda',
                    result: `Hello, ${targetName}! (HelloLambda)`,
                },
            };
        }

        default:
            throw new Error('Endpoint no soportado');
    }
}