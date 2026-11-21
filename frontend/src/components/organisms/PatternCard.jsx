import { EndpointHeader } from '../molecules/EndpointHeader';
import { ResponseViewer } from '../molecules/ResponseViewer';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';

export function PatternCard({ endpoint, response, loading, onExecute }) {
    // Extrae el estado del Circuit Breaker si existe en la respuesta
    const cbState = endpoint.id === 'circuit-breaker' ? response?.data?.state || 'CLOSED' : null;
    const cbVariant = cbState === 'OPEN' ? 'error' : cbState === 'HALF_OPEN' ? 'warning' : 'success';

    return (
        <article className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4 shadow-sm">
            <EndpointHeader
                title={endpoint.title}
                path={endpoint.path}
                description={endpoint.description}
                extraBadge={cbState && <Badge variant={cbVariant}>{cbState}</Badge>}
            />

            <ResponseViewer response={response} />

            <div className="flex justify-end pt-1">
                <Button onClick={() => onExecute(endpoint.path)} loading={loading}>
                    Ejecutar petición
                </Button>
            </div>
        </article>
    );
}