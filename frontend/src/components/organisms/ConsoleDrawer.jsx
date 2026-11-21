import { useState } from 'react';
import { LogRow } from '../molecules/LogRow';
import { Button } from '../atoms/Button';

export function ConsoleDrawer({ logs, onClear }) {
    const [selectedLog, setSelectedLog] = useState(null);

    return (
        <aside className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-sm font-semibold text-slate-200">Historial de Ejecución ({logs.length})</h2>
                {logs.length > 0 && (
                    <Button variant="secondary" onClick={() => { onClear(); setSelectedLog(null); }}>
                        Limpiar
                    </Button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto py-2 space-y-1 max-h-80">
                {logs.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-8">No hay peticiones registradas.</p>
                ) : (
                    logs.map((log) => <LogRow key={log.id} log={log} onSelect={setSelectedLog} />)
                )}
            </div>

            {selectedLog && (
                <div className="mt-3 pt-3 border-t border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[11px] font-mono text-indigo-400">Payload /api{selectedLog.path}</span>
                        <button onClick={() => setSelectedLog(null)} className="text-xs text-slate-500 hover:text-slate-300">
                            Cerrar
                        </button>
                    </div>
                    <pre className="p-2.5 rounded bg-slate-950 text-xs font-mono text-slate-300 overflow-x-auto">
            {JSON.stringify(selectedLog.data, null, 2)}
          </pre>
                </div>
            )}
        </aside>
    );
}