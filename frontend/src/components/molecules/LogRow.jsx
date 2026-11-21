import { Badge } from '../atoms/Badge';

export function LogRow({ log, onSelect }) {
    return (
        <button
            onClick={() => onSelect(log)}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800/70 transition-colors flex items-center justify-between gap-2 border border-transparent hover:border-slate-700/60"
        >
            <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[11px] font-mono text-slate-500">{log.time}</span>
                <Badge variant={log.ok ? 'success' : 'error'}>{log.status}</Badge>
                <span className="text-xs font-mono text-slate-200 truncate">/api{log.path}</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 shrink-0">{log.latency}ms</span>
        </button>
    );
}