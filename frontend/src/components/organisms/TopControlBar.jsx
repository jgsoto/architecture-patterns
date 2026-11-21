import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

export function TopControlBar({ baseUrl, onBaseUrlChange, isMock, onToggleMock, onResetMock }) {
    return (
        <header className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 className="text-lg font-bold text-white tracking-tight">Cloud Patterns Console</h1>
                <p className="text-xs text-slate-400 font-mono">org.uce.patterns.controller.DemoController</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <Input
                    value={baseUrl}
                    onChange={onBaseUrlChange}
                    placeholder="http://localhost:8080/api"
                    disabled={isMock}
                />

                <Button variant="secondary" onClick={onToggleMock}>
                    Modo: {isMock ? 'Simulación (Mock)' : 'API Real (Live)'}
                </Button>

                {isMock && (
                    <Button variant="secondary" onClick={onResetMock}>
                        Reset Circuit
                    </Button>
                )}
            </div>
        </header>
    );
}