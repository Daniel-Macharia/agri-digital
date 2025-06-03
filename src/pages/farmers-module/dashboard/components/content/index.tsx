import "./index.css"

export default function Content( {children} ){


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
