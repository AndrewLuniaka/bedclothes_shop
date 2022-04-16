import React from 'react';
import './Products.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppContext, {ContextData} from '../Context';
import {Link} from "react-router-dom";

function ProductCard(props: CardProps) {

    const context = React.useContext(AppContext) as ContextData;

    return (
        <div className="col-md-4">
            <Link to={"/" + props.card.categoryId + "/" + props.card.id} className="flex-fill h-100 w-100 link-dark">
                <div className="card">
                    <img src={props.card.imgUrl ? props.card.imgUrl : "defaultImg.jpg"} className="card-img-top"
                         alt="..."/>
                    <div className="card-body text-center">
                        <p className="card-text">{props.card.title}</p>
                        <p className="card-text">Ціна {props.card.price} ₴</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export class ProductItemCollection {
    products: ProductItem[];

    constructor(products: ProductItem[]) {
        this.products = products;
    }
}

class ProductItemCollectionGrid {
    productsGrid: ProductItem[][];

    constructor(productsGrid: ProductItem[][]) {
        this.productsGrid = productsGrid;
    }
}

export class ProductItem {
    id: number;
    categoryId: string;
    imgUrl: string;
    title: string;
    description: string;
    price: number;

    constructor(id: number, categoryId: string, imgUrl: string, title: string, description: string, price: number) {
        this.id = id;
        this.categoryId = categoryId;
        this.imgUrl = imgUrl;
        this.title = title;
        this.description = description;
        this.price = price;
    }
}

type ProductProps = {
    category: string;
    items: ProductItemCollection;
}

type CardProps = {
    card: ProductItem;
}

function Products(props: ProductProps) {

    const [grid, setGrid] = React.useState<ProductItemCollectionGrid>({} as ProductItemCollectionGrid);
    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(true);

        function chunkArray(myArray: ProductItem[], chunk_size: number) {
            // Creating the clone of the array
            let cloneArr = myArray.slice(0);
            let results: ProductItem[][] = [];
            console.log("input");
            console.log(cloneArr);

            while (cloneArr.length) {
                results.push(cloneArr.splice(0, chunk_size));
            }
            console.log("output");
            console.log(results);
            return results;
        }

        console.log("props");
        console.log(props.items.products.length);
        let categoryElements: ProductItem[] = props.items.products.filter(x => x.categoryId === props.category);
        let result: ProductItem[][] = chunkArray(categoryElements, 3);
        let itemsGrid = new ProductItemCollectionGrid(result);
        console.log("grid");
        console.log(itemsGrid.productsGrid);
        setGrid(itemsGrid);
        setLoading(false);
    }, [props]);

    console.log("grid new");
    console.log(grid.productsGrid);
    console.log(isLoading);

    return (
        <main className="container mt-3">
            {isLoading ?
                null :
                grid.productsGrid.map((product, index) =>
                    <div key={index} className="row mb-3">
                        {product.map((item, indexj) => <ProductCard key={indexj} card={item}/>)}
                    </div>)
            }
        </main>
    );
}

export default Products;
