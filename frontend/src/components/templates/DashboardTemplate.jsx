export function DashboardTemplate({ header, cardsGrid, sidebar }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
            {header}
            <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <section className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 content-start">
                    {cardsGrid}
                </section>
                <section className="lg:col-span-1">
                    {sidebar}
                </section>
            </main>
        </div>
    );
}