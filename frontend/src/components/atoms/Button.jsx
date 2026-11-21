export function Button({ children, onClick, loading = false, variant = 'primary', className = '' }) {
    const styles =
        variant === 'primary'
            ? 'bg-indigo-600 hover:bg-indigo-500 text-white disabled:bg-indigo-600/50'
            : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700';

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:cursor-not-allowed ${styles} ${className}`}
        >
            {loading && (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {children}
        </button>
    );
}