import { Badge } from '../atoms/Badge';

export function EndpointHeader({ title, path, description, extraBadge }) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Badge variant="info">GET</Badge>
                    <code className="text-xs text-slate-400 font-mono">/api{path}</code>
                </div>
                {extraBadge}
            </div>
            <h3 className="text-base font-semibold text-slate-100">{title}</h3>
            <p className="text-xs text-slate-400">{description}</p>
        </div>
    );
}