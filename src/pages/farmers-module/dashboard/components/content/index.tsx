import Product from "../../../product/components/product";

import "./index.css"

export default function Content(){


    let render = () =>
    {
        return (<>
        <div id="content-div">
            <Product/>
            <Product/>
            <Product/>
            <Product/>
        </div>
        </>);
    };

    return render();
}
