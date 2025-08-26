import "./index.css";
import ProductsPage from "./ProductsPage";


export default function Products()
{

    const render = () =>{
        return (<>
        <div id="products-page-content">
          <ProductsPage />
        </div>
        </>);
    };

    return render();
}