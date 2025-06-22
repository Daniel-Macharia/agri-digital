interface DashboardLayoutProps{
    children: React.ReactNode
}

export default function Content( {children}: DashboardLayoutProps){
    let render = () =>
    {
        return (<>
        <div className="w-100 h-100">
            <main className="w-100 h-100 p-2 rounded mt-2">
                {children}
            </main>
        </div>
        </>);
    };

    return render();
}
