import React from 'react';
import './Header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBagShopping} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import AppContext, {ContextData} from '../Context';

function Header() {

    const context = React.useContext(AppContext) as ContextData;

    return (
        <>
            <header className="Header container">
                <div className="row">
                    <div className="col-4">
                    </div>

                    <div className="col-4 text-center">
                        <Link className="logo" to="/" title="Go to Homepage">La plume</Link>
                    </div>

                    <div className="col-4 d-flex align-items-end mb-4">
                        <ul className="nav col-12 justify-content-end">
                            <li className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faBagShopping}/>
                                <a className="nav-link menu-item p-1 link-dark" id="headerCartLink" type="button"
                                   data-bs-toggle="offcanvas"
                                   data-bs-target="#cartKey">
                                    <span className="">Кошик</span>(<span
                                    id="headerCartTotal">{context.itemsInCart}</span>)
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <nav className="row justify-content-center mt-3 menu-item">
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center">
                        <li>
                            <Link to="/" className="nav-link menu-item link-dark mx-2">Головна</Link>
                        </li>
                        <li>
                            <Link to="/bed_linen" className="nav-link menu-item link-dark mx-2">Постільна білизна</Link>
                        </li>
                        <li>
                            <Link to="/blankets_pillows" className="nav-link menu-item link-dark mx-2">Ковдри та подушки</Link>
                        </li>
                        <li>
                            <Link to="/nightwear" className="nav-link menu-item link-dark mx-2">Одяг для сну</Link>
                        </li>
                        <li>
                            <Link to="/towels" className="nav-link menu-item link-dark mx-2">Рушники</Link>
                        </li>
                        <li>
                            <Link to="/payment_delivery" className="nav-link menu-item link-dark mx-2">Оплата та доставка</Link>
                        </li>
                        <li>
                            <Link to="/contacts" className="nav-link menu-item link-dark mx-2">Контакти</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Header;
