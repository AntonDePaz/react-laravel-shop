import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

export const ProductDetails = (props) => {

    const history = useHistory();
    const [loading,setLoading] = useState(true);
    const [product,setProduct] = useState([]);

    const [qty,setQty] = useState();

    // const handleDecrement = (id) => {
    //     setCart(cart => 
    //             cart.map((item) => 
    //                 id === item.id ? {...item, product_qty : item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item
    //             )
    //         )
    //         updateQTY(id,'dec')
    // }

    // const handleIncrement = (id) => {
    //     setCart(cart => 
    //         cart.map((item) => 
    //             id === item.id ? {...item, product_qty : item.product_qty + (item.product_qty < 10 ? 1 : 0)} : item
    //         )
    //     )
    //     updateQTY(id,'inc')
    // }

    const incrementCart = () => {
       if(qty < 10){
        setQty( qty => parseInt(qty) + 1)
       }
    }
    const decrementCart = () => {
        if(qty > 1){
        setQty( qty => qty - 1)
        }
        
    }


    const addCart = (e) => {
        e.preventDefault()

        const data = {
            product_id : product.id,
            product_qty : qty
        }

        axios.post(`/api/add_cart`,data).then((res) => {

            if(res.data.status === 200){
                swal('Success',res.data.message, 'success')
            }else if(res.data.status === 401){
                swal('Warning',res.data.message,'warning')
            }else if(res.data.status === 409){
                swal('Success',res.data.message,'success')
            }
            else if(res.data.status === 402){
                swal('Error',res.data.message,'error')
            }
            else if(res.data.status === 404){
                swal('Error',res.data.message,'error')
            }

        });


    }

    useEffect(()=>{

      //  var notdoneAll = true;
        const category_slug = props.match.params.category;
        const product_slug = props.match.params.product;
        axios.get(`/api/get_product_detail/${category_slug}/${product_slug}`).then((res)=>{
            if(res.data.status === 200){
                console.log('product:',res.data.product);
                setProduct(res.data.product);
                setQty(res.data.product.quantity)
                
            }else if(res.data.status === 404){
                swal('Warning',res.data.message,'error')
                history.push('/collections')
            }
            else if(res.data.status === 400){
                swal('Warning',res.data.message,'error')
                history.push('/collections')
            }
         setLoading(false);
        });

        // return () => {
        //     notdoneAll = false;
        // }


    },[props.match.params.category,props.match.params.product,history]);


    if(loading){
      return  <h2>Loading..</h2>

    }else{
        var availableStock = '';

        if(product.quantity > 0){

        availableStock = 
        <div>
             <label className='btn-sm btn-success px-4 mt-2'>In Stock</label>
                                <div className='row'>
                                    <div className='col-md-3 mt-3'>
                                        <div className='input-group'>
                                            <button type='button' onClick={decrementCart} className='input-group-text'>-</button>
                                            <div className='form-control text-center'>{qty}</div>
                                            <button type='button' onClick={incrementCart} className='input-group-text'>+</button>
                                        </div>
                                    </div>
                                    <div className='col-md-3 mt-3'>
                                        <button type='button' className='btn btn-primary w-100' onClick={addCart}>Add Cart</button>
                                    </div>
                                </div>
        </div>
        }else{
            availableStock = 
             <div>
              <label className='btn-sm btn-danger px-4 mt-2'>Out of Stock</label>
            </div>

        }

    }

  
    return (
      
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Collections / {product.category.name} / {product.slug}</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className='col-md-4 border-end'>
                            <img src={`http://localhost:8000/${product.image}`}  alt={product.name} className='w-100'/>
                        </div>
                        <div className='col-md-8'>
                            <h4>
                                {product.name}
                                <span className='float-end badge btn-sm btn-danger badge-pill'> {product.brand} </span>
                            </h4>
                            <p>{product.description}</p>
                            <h4 className='mb-1'> 
                                PhP: {product.selling_price}
                                <s className='ms-2'> PhP: {product.original_price}.00</s>
                            </h4>
                            <div>
                               {availableStock}
                            </div>
                            <button type='button' className='btn btn-danger mt-3'>Add to Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
       </div>
        
    )

}
