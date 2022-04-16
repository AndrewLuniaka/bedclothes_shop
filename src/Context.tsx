import React from "react";
import {ProductItem} from "./pages/Products";
import {PurchaseItem, PurchaseItemList} from "./App";

export interface ContextData {
    itemsInCart: number,
    purchaseList: PurchaseItemList,

    addToCart(item: PurchaseItem): void,

    deleteFromCart(item: PurchaseItem): void,

    getProduct(id: number): ProductItem
}

const AppContext = React.createContext({});

export default AppContext;