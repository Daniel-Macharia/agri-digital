interface DashboardLayoutProps{
    children: React.ReactNode
}

export default function Content( {children}: DashboardLayoutProps){
    let render = () =>
    {
        return (<>
        <div className="w-100 h-100 d-flex flex-column flex-grow-1 overflow-auto bg-transparent">
            <main className="container-fluid flex-grow-1 py-3">
                {children}
            </main>
        </div>
        </>);
    };

    return render();
}
