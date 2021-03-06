import React, { useEffect, useState } from 'react';
import ExploreProduct from '../ExploreProduct/ExploreProduct';
import './ExploreProducts.css';

const ExploreProducts = () => {
    const [scooters, setScooters] = useState([]);

    useEffect(()=> {
        const url = `https://scootymatic.herokuapp.com/scooters`;
        fetch(url)
        .then(res => res.json())
        .then(data => setScooters(data))
    });


    return (
        <section id="explore">
            <h2 className="section-title">Explore more products</h2>
            <div className="container">
                <div className="row">
                {
                    scooters.map(scooter => <ExploreProduct
                        key = {scooter._id}
                        scooter = {scooter}
                    ></ExploreProduct> )
                }
                </div>
            </div>
        </section>
    );
};

export default ExploreProducts;