import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Products, {ProductItem, ProductItemCollection} from "./pages/Products";
import Header from "./pages/Header";
import CartList from "./pages/CartList";
import AppContext, {ContextData} from './Context';
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import ProductPage from "./pages/ProductPage";
import Contacts from "./pages/Contacts";
import PaymentDelivery from "./pages/PaymentDelivery";
import Feedback from "./pages/Feedback";
import ConfirmOrder from "./pages/ConfirmOrder";

const itemsKey = "itemsData";
const purchasesKey = "purchasesData";

export class PurchaseItemList {
    purchasesInCart: PurchaseItem[];

    constructor(purchasesInCart: PurchaseItem[]) {
        this.purchasesInCart = purchasesInCart;
    }
}

export class PurchaseItem {
    id: number;
    product: ProductItem;
    count: number;
    price: number;

    constructor(id: number, product: ProductItem, count: number, price: number) {
        this.id = id;
        this.product = product;
        this.count = count;
        this.price = price;
    }
}

function App() {

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [items, setItems] = React.useState<ProductItemCollection>(() => {
            const storedValue = localStorage.getItem(itemsKey);
            return storedValue !== null ? JSON.parse(storedValue) : {} as ProductItemCollection
        }
    );

    const [purchaseList, setPurchaseList] = React.useState<PurchaseItemList>(() => {
        const storedValue = localStorage.getItem(purchasesKey);
        return storedValue !== null ? JSON.parse(storedValue) : {} as PurchaseItemList
    });

    const [itemsInCart, setItemsInCart] = React.useState(0);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setIsLoaded(false);
                const productsJson = [
                    {id: 0, title: "pillow1", price: 9.99},
                    {id: 1, title: "pillow2", price: 9.99},
                    {id: 2, title: "pillow3", price: 9.99},
                    {id: 3, title: "pillow4", price: 9.99},
                    {id: 4, title: "pillow5", price: 9.99},
                    {id: 5, title: "pillow6", price: 9.99},
                ];

                const products: ProductItem[] = [
                    new ProductItem(0, "bed_linen", "items_icons/bed_linen/linen_olive_1.jpg", "pillow1", "description", 9.99),
                    new ProductItem(1, "bed_linen", "items_icons/bed_linen/linen_olive_1.jpg", "pillow2", "description", 9.99),
                    new ProductItem(2, "bed_linen", "items_icons/bed_linen/linen_olive_1.jpg", "pillow3", "description", 9.99),
                    new ProductItem(3, "blankets_pillows", "items_icons/bed_linen/linen_white_2.jpg", "pillow4", "description", 9.99),
                    new ProductItem(4, "blankets_pillows", "items_icons/bed_linen/linen_white_2.jpg", "pillow5", "description", 9.99),
                    new ProductItem(5, "blankets_pillows", "items_icons/bed_linen/linen_white_2.jpg", "pillow6", "description", 9.99),
                    new ProductItem(6, "nightwear", "items_icons/bed_linen/linen_satine_3.jpg", "pillow1", "description", 9.99),
                    new ProductItem(7, "nightwear", "items_icons/bed_linen/linen_satine_3.jpg", "pillow2", "description", 9.99),
                    new ProductItem(8, "nightwear", "items_icons/bed_linen/linen_satine_3.jpg", "pillow3", "description", 9.99),
                    new ProductItem(9, "towels", "items_icons/bed_linen/linen_satine_4.jpg", "pillow4", "description", 9.99),
                    new ProductItem(10, "towels", "items_icons/bed_linen/linen_satine_4.jpg", "pillow5", "description", 9.99),
                    new ProductItem(11, "towels", "items_icons/bed_linen/linen_satine_4.jpg", "pillow6", "description", 9.99)
                ];

                const productsCollection: ProductItemCollection = new ProductItemCollection(products);

                setItems(productsCollection);
                localStorage.setItem(itemsKey, JSON.stringify(productsCollection));
                setItemsInCart(purchaseList.purchasesInCart ? purchaseList.purchasesInCart.length : 0);
                console.log("Data loaded successful!");
                setIsLoaded(true);
            } catch (error) {
                alert('Ошибка при запросе данных ;(');
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const addToCart = (item: PurchaseItem) => {

        let isInList = purchaseList.purchasesInCart ?
            purchaseList.purchasesInCart.find((itemInCart) => itemInCart.id == item.id) :
            null;

        let newItemsInCart = purchaseList.purchasesInCart ? purchaseList.purchasesInCart : [];
        if (isInList) {
            let index = newItemsInCart.indexOf(isInList);
            isInList.count++;
            newItemsInCart[index] = isInList;
        } else {
            newItemsInCart.push(item);
        }
        let cartPurchases = new PurchaseItemList(newItemsInCart);
        localStorage.setItem(purchasesKey, JSON.stringify(cartPurchases));
        setPurchaseList(cartPurchases);
        setItemsInCart(newItemsInCart.length);
    }

    const deleteFromCart = (item: PurchaseItem) => {

        let isInList = purchaseList.purchasesInCart ?
            purchaseList.purchasesInCart.find((itemInCart) => itemInCart.id == item.id) :
            null;

        if (!isInList) {
            return;
        }

        let newItemsInCart = purchaseList.purchasesInCart.slice(0);

        let index = newItemsInCart.indexOf(isInList);
        if (index > -1) {
            newItemsInCart.splice(index, 1);
        }

        let cartPurchases = new PurchaseItemList(newItemsInCart);
        localStorage.setItem(purchasesKey, JSON.stringify(cartPurchases));
        setPurchaseList(cartPurchases);
        setItemsInCart(newItemsInCart.length);
    }

    function getProduct(id: number): ProductItem {
        let result = items.products.find((product) => product.id == id);
        console.log("getProduct");
        console.log(result);
        return result ? result : new ProductItem(0, "", "", "", "", 0);
    }

    let contextData: ContextData = {
        itemsInCart,
        purchaseList,
        addToCart,
        deleteFromCart,
        getProduct
    };

    return (
        <div className="App">
            <AppContext.Provider value={contextData}>
                <Router>
                    <Header/>
                    <CartList/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/bed_linen" element={<Products category={"bed_linen"} items={items}/>}/>
                        <Route path="/blankets_pillows" element={<Products category={"blankets_pillows"} items={items}/>}/>
                        <Route path="/nightwear" element={<Products category={"nightwear"} items={items}/>}/>
                        <Route path="/towels" element={<Products category={"towels"} items={items}/>}/>
                        <Route path="/:productId/:id" element={<ProductPage/>}/>
                        <Route path="/payment_delivery" element={<PaymentDelivery/>}/>
                        <Route path="/contacts" element={<Contacts/>}/>
                        <Route path="/feedback" element={<Feedback/>}/>
                        <Route path="/confirmOrder" element={<ConfirmOrder/>}/>
                    </Routes>
                    <Footer/>
                </Router>
            </AppContext.Provider>
        </div>
    );
}

export default App;
