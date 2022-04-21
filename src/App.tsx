import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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
import {ProductItem, ProductItemCollection, PurchaseItem, PurchaseItemList, PurchaseOrder} from "./shareData";
import Products from "./pages/Products";
import axios, {AxiosResponse} from "axios";
import {v4} from "uuid";
import PrivacyPolicy from "./pages/PrivacyPolicy";


const itemsKey = "itemsData";
const clientIdKey = "clientId";
const purchasesKey = "purchasesData";
const dataBasePath = "https://625eb8ff3b039517f1fb1530.mockapi.io/";

function App() {

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [clientId, setClientId] = React.useState(() => {
            const storedValue = localStorage.getItem(clientIdKey);
            return storedValue !== null ? JSON.parse(storedValue) : "";
        }
    );
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

                let products: AxiosResponse<ProductItem[]>;
                [products] = await Promise.all([axios.get(dataBasePath + "items")]);

                const productsCollection: ProductItemCollection = new ProductItemCollection(products.data);

                setItems(productsCollection);
                localStorage.setItem(itemsKey, JSON.stringify(productsCollection));

                setItemsInCart(purchaseList.purchasesInCart ? purchaseList.purchasesInCart.length : 0);

                if (clientId === "") {
                    let id = v4();
                    localStorage.setItem(clientIdKey, JSON.stringify(id));
                }
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
            purchaseList.purchasesInCart.find((itemInCart) => itemInCart.purchaseId == item.purchaseId) :
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
            purchaseList.purchasesInCart.find((itemInCart) => itemInCart.purchaseId == item.purchaseId) :
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

    const clearCart = () => {
        let list = new PurchaseItemList([]);
        localStorage.setItem(purchasesKey, JSON.stringify(list));
        setPurchaseList(list);
        setItemsInCart(0);
    }

    const confirmOrder = async (order: PurchaseOrder) => {

        if (order == null) return;
        order.clientId = clientId;
        await axios.post(dataBasePath + "orders", order);
    }

    function getProduct(id: number): ProductItem {
        let result = items.products.find((product) => product.productId == id);
        console.log("getProduct: " + id);
        console.log(result);
        return result ? result : new ProductItem(0, "", "", "", "", 0);
    }

    let contextData: ContextData = {
        itemsInCart,
        purchaseList,
        addToCart,
        deleteFromCart,
        clearCart,
        getProduct,
        confirmOrder
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
                        <Route path="/privacy_policy" element={<PrivacyPolicy/>}/>
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

