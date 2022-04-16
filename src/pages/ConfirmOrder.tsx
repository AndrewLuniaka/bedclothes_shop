import React from 'react';
import './ConfirmOrder.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import AppContext, {ContextData} from "../Context";

function ConfirmOrder() {

    const context = React.useContext(AppContext) as ContextData;
    const navigate = useNavigate();

    if (context.itemsInCart <= 0) {
        navigate("/", {replace: true});
    }

    return (
        <main className="container mt-3 mb-3">
            <h1>Оформлення замовлення</h1>
            <div className="row">
                <div className="col-md-9">
                    <div className="container">
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-3 mt-3">
                                    <label htmlFor="lastname" className="form-label text-muted"> Прізвище </label>
                                    <input type="lastname" className="form-control" id="lastname" placeholder="Введіть прізвище" name="lastname"/>
                                </div>

                                <div className="col-md-6 mb-3 mt-3">
                                    <label htmlFor="firstname" className="form-label text-muted"> Ім'я </label>
                                    <input type="firstname" className="form-control" id="firstname" placeholder="Введіть Ім'я" name="firstname"/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3 mt-3">
                                    <label htmlFor="phone" className="form-label text-muted"> Мобільний телефон </label>
                                    <input type="phone" className="form-control" id="phone" placeholder="Введіть Мобільний телефон" name="phone"/>
                                </div>

                                <div className="col-md-6 mb-3 mt-3">
                                    <label htmlFor="email" className="form-label text-muted"> Електронна пошта </label>
                                    <input type="email" className="form-control" id="email" placeholder="Введіть Електронна пошта" name="email"/>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-dark bg-light sticky-top">
                        <div className="card-body">
                            <h2 className="card-title mb-lg-4">Разом</h2>

                            <div className="d-flex justify-content-between">
                                <p className="card-text text-muted">2 товари на суму</p>
                                <p className="card-text">918 ₴</p>
                            </div>

                            <div className="d-flex justify-content-between">
                                <p className="card-text text-muted">Вартість доставки</p>
                                <p className="card-text">150 ₴</p>
                            </div>

                            <div className="d-flex mt-lg-4  mb-lg-4 justify-content-between">
                                <p className="card-text text-muted text-center mt-1 mb-0">До сплати</p>
                                <h3 className="card-text align-bottom">150 ₴</h3>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-success" type="submit">Замовлення підтверджую</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ConfirmOrder;
