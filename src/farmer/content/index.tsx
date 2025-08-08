interface DashboardLayoutProps{
    children: React.ReactNode
}

export default function Content( {children}: DashboardLayoutProps){
    return (<>
    <div >
        <main className="px-5" style={{ backgroundColor: '#ECECEC' }}>
            {children}
        </main>
    </div>
    </>);
}
