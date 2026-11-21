import { useState } from 'react';
import { EndpointHeader } from '../molecules/EndpointHeader';
import { ResponseViewer } from '../molecules/ResponseViewer';
import { Button } from '../atoms/Button';
import { Badge } from '../atoms/Badge';
import { Input } from '../atoms/Input';

export function PatternCard({ endpoint, response, loading, onExecute }) {
    const [paramValue, setParamValue] = useState(endpoint.defaultParam ?? '');

    const cbState = endpoint.id === 'circuit-breaker' ? response?.data?.state || 'CLOSED' : null;
    const cbVariant = cbState === 'OPEN' ? 'error' : cbState === 'HALF_OPEN' ? 'warning' : 'success';

    const handleRun = () => {
        const params = endpoint.paramName
            ? { [endpoint.paramName]: paramValue.trim() || endpoint.defaultParam || 'Mundo' }
            : {};
        onExecute(endpoint.path, params);
    };

    return (
        <article className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-4 shadow-sm">
            <EndpointHeader
                title={endpoint.title}
                path={endpoint.path}
                description={endpoint.description}
                extraBadge={cbState && <Badge variant={cbVariant}>{cbState}</Badge>}
            />

            <ResponseViewer response={response} />

            <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                {endpoint.paramName && (
                    <Input
                        value={paramValue}
                        onChange={setParamValue}
                        placeholder={endpoint.paramName}
                        disabled={loading}
                    />
                )}
                <Button onClick={handleRun} loading={loading}>
                    Ejecutar petición
                </Button>
            </div>
        </article>
    );
}