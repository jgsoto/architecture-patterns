import { Badge } from '../atoms/Badge';

export function ResponseViewer({ response }) {
    if (!response) {
        return (
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-500 font-mono">
                Sin ejecutar aún...
            </div>
        );
    }

    const { ok, status, latency, data } = response;

    return (
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
                <Badge variant={ok ? 'success' : 'error'}>HTTP {status}</Badge>
                <span className="text-[11px] font-mono text-slate-500">{latency} ms</span>
            </div>

            {/* Renderizado especial para mensajes de Hub-and-Spoke */}
            {Array.isArray(data?.messages) ? (
                <ul className="space-y-1 text-xs font-mono text-slate-300">
                    {data.messages.map((msg, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <span className="text-indigo-400">→</span>
                            <span>{typeof msg === 'object' ? JSON.stringify(msg) : msg}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
            )}
        </div>
    );
}