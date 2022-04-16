import React from 'react';
import './Home.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Link} from "react-router-dom";

function Home() {
    return (
        <main className="container mt-3">

            <div className="row">
                <div id="demo" className="carousel slide" data-bs-ride="carousel">

                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
                    </div>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="carousel/stripes.jpg" alt="Los Angeles" className="d-block"/>
                            <div className="carousel-caption">
                                <h3>Los Angeles</h3>
                                <p>We had such a great time in LA!</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="carousel/bedding.jpg" alt="Chicago" className="d-block"/>
                            <div className="carousel-caption">
                                <h3>Chicago</h3>
                                <p>Thank you, Chicago!</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="carousel/linen.jpg" alt="New York" className="d-block"/>
                            <div className="carousel-caption">
                                <h3>New York</h3>
                                <p>We love the Big Apple!</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="carousel/nightwear.jpg" alt="New York" className="d-block"/>
                            <div className="carousel-caption">
                                <h3>New York</h3>
                                <p>We love the Big Apple!</p>
                            </div>
                        </div>
                    </div>


                    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>

            <div className="row mb-4 mt-4">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card text-white text-center">
                                <img src="cat_cards/cat_linen.jpg" className="card-img img-fluid" alt="..."/>
                                <div
                                    className="card-img-overlay text-center d-flex flex-column justify-content-center mask">
                                    <h5 className="card-title">Card title</h5>

                                    <p className="card-text">This is a wider card with supporting text below as a
                                        natural lead-in to additional content. This content is a little bit
                                        longer.</p>

                                    <Link to="/bed_linen"
                                          className="mh-100 link-light bg-dark stretched-link">Перейти</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card text-white text-center">
                                <img src="cat_cards/cat_linen.jpg" className="card-img img-fluid" alt="..."/>
                                <div
                                    className="card-img-overlay text-center d-flex flex-column justify-content-center mask">
                                    <h5 className="card-title">Card title</h5>

                                    <p className="card-text">This is a wider card with supporting text below as a
                                        natural lead-in to additional content. This content is a little bit
                                        longer.</p>

                                    <Link to="/blankets_pillows"
                                          className="mh-100 link-light bg-dark stretched-link">Перейти</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4"></div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card text-white text-center">
                                <img src="cat_cards/cat_linen.jpg" className="card-img img-fluid" alt="..."/>
                                <div
                                    className="card-img-overlay text-center d-flex flex-column justify-content-center mask">
                                    <h5 className="card-title">Card title</h5>

                                    <p className="card-text">This is a wider card with supporting text below as a
                                        natural lead-in to additional content. This content is a little bit
                                        longer.</p>

                                    <Link to="/nightwear"
                                          className="mh-100 link-light bg-dark stretched-link">Перейти</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card text-white text-center">
                                <img src="cat_cards/cat_linen.jpg" className="card-img img-fluid" alt="..."/>
                                <div
                                    className="card-img-overlay text-center d-flex flex-column justify-content-center mask">
                                    <h5 className="card-title">Card title</h5>

                                    <p className="card-text">This is a wider card with supporting text below as a
                                        natural lead-in to additional content. This content is a little bit
                                        longer.</p>

                                    <Link to="/towels"
                                          className="mh-100 link-light bg-dark stretched-link">Перейти</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </main>
    );
}

export default Home;
