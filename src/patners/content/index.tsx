interface DashboardLayoutProps{
    children: React.ReactNode
}

export default function Content( {children}: DashboardLayoutProps){
    let render = () =>
    {
        return (<>
        <div >
            <main className="px-5" style={{ backgroundColor: '#ECECEC' }}>
                {children}
            </main>
        </div>
        </>);
    };

    return render();
}
