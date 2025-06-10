import "./index.css"

interface DashboardLayoutProps{
    children: React.ReactNode
}

export default function Content( {children}: DashboardLayoutProps){
    let render = () =>
    {
        return (<>
        <div id="content-div">
            <main >
                {children}
            </main>
        </div>
        </>);
    };

    return render();
}
