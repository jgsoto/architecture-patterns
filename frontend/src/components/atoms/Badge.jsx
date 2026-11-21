const VARIANTS = {
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    error: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    info: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    neutral: 'bg-slate-800 text-slate-300 border-slate-700',
};

export function Badge({ children, variant = 'neutral' }) {
    return (
        <span className={`px-2 py-0.5 text-xs font-mono font-medium rounded border ${VARIANTS[variant]}`}>
      {children}
    </span>
    );
}