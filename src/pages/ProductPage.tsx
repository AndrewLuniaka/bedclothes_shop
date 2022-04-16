import React from 'react';
import './ProductPage.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useParams} from "react-router-dom";
import AppContext, {ContextData} from "../Context";
import {ProductItem} from "./Products";
import {PurchaseItem} from "../App";

function ProductPage() {

    const [productItem, setProductItem] = React.useState<ProductItem>({} as ProductItem);
    const [purchaseItem, setPurchaseItem] = React.useState<PurchaseItem>({} as PurchaseItem);
    const [isLoading, setLoading] = React.useState(true);

    const {id} = useParams();
    const context = React.useContext(AppContext) as ContextData;

    React.useEffect(() => {
        setLoading(true);
        let item = context.getProduct(Number(id));
        setProductItem(item);
        let newPurchaseItem = new PurchaseItem(item.id, item, 1, item.price);
        setPurchaseItem(newPurchaseItem);
        console.log("Load product");
        setLoading(false);
    }, [id]);

    return (
        <main className="container mt-3 mb-3">
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-2">
                            <img src={"../" + (productItem.imgUrl ? productItem.imgUrl : "defaultImg.jpg")}
                                 className="img-fluid" alt="..."/>
                        </div>
                        <div className="col-10">
                            <img src={"../" + (productItem.imgUrl ? productItem.imgUrl : "defaultImg.jpg")}
                                 className="card-img img-fluid" alt="..."/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h1>{productItem.title}</h1>
                    <p>{productItem.description}</p>
                    <h3>Ціна {productItem.price} ₴</h3>
                    <button type="button" className="btn btn-light align-content-end"
                            onClick={() => context.addToCart(purchaseItem)}>Додати до кошику
                    </button>
                </div>
            </div>
        </main>
    );
}

export default ProductPage;
