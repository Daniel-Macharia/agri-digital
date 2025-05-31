
import "./index.css";

export default function Product()
{
    let render = ()=>{
        return (<>
        <div id="product-div">
            <p><b>Sample product</b></p>
            <img src="/src/assets/shamba_bot_logo.svg" />
            
            <p>some description here...</p>
        </div>
        </>);
    };

    return render();
}
