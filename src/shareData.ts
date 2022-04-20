export class PurchaseOrder {
    clientId: string;
    purchaseId: string;
    lastname: string;
    firstname: string;
    phone: string;
    email: string;
    purchasesInCart: PurchaseItem[];

    constructor(clientId: string, purchaseId: string, lastname: string, firstname: string, phone: string, email: string, purchasesInCart: PurchaseItem[]) {
        this.clientId = clientId;
        this.purchaseId = purchaseId;
        this.lastname = lastname;
        this.firstname = firstname;
        this.phone = phone;
        this.email = email;
        this.purchasesInCart = purchasesInCart;
    }
}

export class PurchaseItemList {
    purchasesInCart: PurchaseItem[];

    constructor(purchasesInCart: PurchaseItem[]) {
        this.purchasesInCart = purchasesInCart;
    }
}

export class PurchaseItem {
    purchaseId: number;
    product: ProductItem;
    count: number;
    price: number;

    constructor(id: number, product: ProductItem, count: number, price: number) {
        this.purchaseId = id;
        this.product = product;
        this.count = count;
        this.price = price;
    }
}

export class ProductItemCollection {
    products: ProductItem[];

    constructor(products: ProductItem[]) {
        this.products = products;
    }
}

export class ProductItemCollectionGrid {
    productsGrid: ProductItem[][];

    constructor(productsGrid: ProductItem[][]) {
        this.productsGrid = productsGrid;
    }
}

export class ProductItem {
    productId: number;
    categoryId: string;
    imgUrl: string;
    title: string;
    description: string;
    price: number;

    constructor(id: number, categoryId: string, imgUrl: string, title: string, description: string, price: number) {
        this.productId = id;
        this.categoryId = categoryId;
        this.imgUrl = imgUrl;
        this.title = title;
        this.description = description;
        this.price = price;
    }
}