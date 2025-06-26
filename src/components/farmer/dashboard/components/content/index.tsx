interface DashboardLayoutProps{
    children: React.ReactNode
}

export default function Content( {children}: DashboardLayoutProps){
    let render = () =>
    {
        return (<>
        <div >
            <main >
                {children}
            </main>
        </div>
        </>);
    };

    return render();
}
