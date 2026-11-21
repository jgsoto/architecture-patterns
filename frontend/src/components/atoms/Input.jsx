export function Input({ value, onChange, placeholder, disabled = false }) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-200 focus:outline-none focus:border-indigo-500 disabled:opacity-50 w-64"
        />
    );
}