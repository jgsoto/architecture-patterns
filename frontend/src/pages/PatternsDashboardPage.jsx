import { useState } from 'react';
import { ENDPOINTS, callPatternEndpoint, resetMockCircuitBreaker } from '../services/patternsApi';
import { TopControlBar } from '../components/organisms/TopControlBar';
import { PatternCard } from '../components/organisms/PatternCard';
import { ConsoleDrawer } from '../components/organisms/ConsoleDrawer';
import { DashboardTemplate } from '../components/templates/DashboardTemplate';

export function PatternsDashboardPage() {
    const [baseUrl, setBaseUrl] = useState('http://localhost:8080/api');
    const [isMock, setIsMock] = useState(false);
    const [responses, setResponses] = useState({});
    const [loadingMap, setLoadingMap] = useState({});
    const [logs, setLogs] = useState([]);

    const handleExecute = async (path, params = {}) => {
        setLoadingMap((prev) => ({ ...prev, [path]: true }));
        try {
            const result = await callPatternEndpoint(baseUrl, path, isMock, params);
            setResponses((prev) => ({ ...prev, [path]: result }));
            setLogs((prev) => [
                { id: crypto.randomUUID(), time: new Date().toLocaleTimeString(), path, ...result },
                ...prev,
            ]);
        } catch (err) {
            const errorResult = { ok: false, status: 'NETWORK_ERR', latency: 0, data: { error: err.message } };
            setResponses((prev) => ({ ...prev, [path]: errorResult }));
            setLogs((prev) => [
                { id: crypto.randomUUID(), time: new Date().toLocaleTimeString(), path, ...errorResult },
                ...prev,
            ]);
        } finally {
            setLoadingMap((prev) => ({ ...prev, [path]: false }));
        }
    };

    const handleResetMock = () => {
        resetMockCircuitBreaker();
        setResponses((prev) => ({ ...prev, '/circuit-breaker': null }));
    };

    return (
        <DashboardTemplate
            header={
                <TopControlBar
                    baseUrl={baseUrl}
                    onBaseUrlChange={setBaseUrl}
                    isMock={isMock}
                    onToggleMock={() => setIsMock((prev) => !prev)}
                    onResetMock={handleResetMock}
                />
            }
            cardsGrid={ENDPOINTS.map((ep) => (
                <PatternCard
                    key={ep.id}
                    endpoint={ep}
                    response={responses[ep.path]}
                    loading={!!loadingMap[ep.path]}
                    onExecute={handleExecute}
                />
            ))}
            sidebar={<ConsoleDrawer logs={logs} onClear={() => setLogs([])} />}
        />
    );
}