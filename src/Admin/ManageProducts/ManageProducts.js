import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ManageProducts.css';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch("https://scootymatic.herokuapp.com/scooters")
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);

    const handleDeleteProduct = id => {
        const confirmation = window.confirm("Are you sure you want to delete this product?");
        if (confirmation) {            
            const url = `https://scootymatic.herokuapp.com/scooters/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount > 0){
                    alert('Product was successfully deleted')
                    const remainingProducts = products.filter(product => product._id !== id); 
                    setProducts(remainingProducts);
                }
            });
        }
    };

    const handleUpdateProduct = id => {
        const confirmation = window.confirm("Are you sure you want to update this product?")
        if (confirmation) { 
            //
        }
    }

    return (
        <div>
            <h2>Manage products</h2>

            
            <table style={{"width": "100%"}} id="product-table"> 
                            {/* Resort table headings  */}
                            <tr>
                                <th>Name</th>
                                <th>Image</th> 
                                <th>Price</th>
                                <th>Description</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>

                            {/* Resort table data  */}

                            {
                                products.map(product => 
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td><img src={product.img} className="img-fluid"  alt="" /></td> 
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <Link to={`/scooter/update/${product._id}`}><button onClick={handleUpdateProduct} >Update</button></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteProduct(product._id)} >Delete</button>
                                    </td>
                                </tr>
                                )
                            }
                        </table>
        </div>
    );
};

export default ManageProducts;