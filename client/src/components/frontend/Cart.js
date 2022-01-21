import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

// import '../../assets/admin/css/styles.css'
// import '../../assets/admin/js/scripts.js'


const Cart = () => {

    const history = useHistory();
    const [loading,setLoading] = useState(true);
    const [cart,setCart] = useState([]);


    // if(!localStorage.getItem('auth_token')){
    //     history.push('/');
    //     swal('Not Authorized','Login First to view Cart','error')
    // }

    const handleDecrement = (id) => {
        setCart(cart => 
                cart.map((item) => 
                    id === item.id ? {...item, product_qty : item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item
                )
            )
            updateQTY(id,'dec')
    }

    const handleIncrement = (id) => {
        setCart(cart => 
            cart.map((item) => 
                id === item.id ? {...item, product_qty : item.product_qty + (item.product_qty < 10 ? 1 : 0)} : item
            )
        )
        updateQTY(id,'inc')
    }

    function updateQTY(card_id,scope){
        axios.put(`/api/cart_update_qty/${card_id}/${scope}`).then((res)=>{

            if(res.data.status === 200){
                console.log('s');
               // swal('Success',res.data.message,'success')
            }else if(res.data.status === 401){
                swal('Error',res.data.message,'error')
                history.push('/')
            }

        })
    }

    const removeCart = (e, id) => {
         e.preventDefault();

        const thisClick = e.currentTarget;

        thisClick.innerText = 'Deleting...';

        axios.delete(`/api/remove_cart/${id}`).then((res)=> {

            if(res.data.status === 200){
                thisClick.closest('tr').remove();
                swal('Success',res.data.message,'success')
            }else if(res.data.status === 404) {
                swal('Error',res.data.message,'error')
               //push('/')
            }else if(res.data.status === 401) {
                swal('Error',res.data.message,'error')
                thisClick.innerText = 'Remove';
               //push('/')
            }

        });
    }

    useEffect(()=>{
        axios.get(`/api/cart`).then((res)=>{
            if(res.data.status === 200){
                setCart(res.data.cart);
            }else if(res.data.status === 401){
                swal('Error',res.data.message,'error')
                history.push('/')
            }
            setLoading(false);
        });
    },[history]);

  
    if(loading){
       return <h2>Loading....</h2>
    }

    console.log(cart);

    var checkcart = '';
    var forcheck = false;
    var grandtotal = 0;
    if(cart.length < 1){
        checkcart = <tr>
            <td colSpan='6' className='text-center'> No Product in Cart</td>
        </tr>
    }else{
       forcheck = true;
        checkcart = 
        
        cart.map((item, index)=>{
            var total = parseInt(item.product.selling_price) * parseInt(item.product_qty);
            grandtotal += total;
            return (

                <tr key={index}>
                    <td width='10%'>
                        <img src={`http://localhost:8000/${item.product.image}`} alt='' width='50px'/>
                    </td>
                    <td>{item.product.name}</td>
                    <td className='text-center' width='15%'>{item.product.selling_price}</td>
                    <td className='text-center' width='15%'>
                        <div className='input-group'>
                            <button type='button' className='input-group-text' onClick={ () => handleDecrement(item.id) } >-</button>
                            <div className='form-control text-center'>{item.product_qty}</div>
                            <button type='button' className='input-group-text' onClick={ () => handleIncrement(item.id)}>+</button>
                        </div>
                    </td>
                    <td width='15%' className='text-center'>{total}</td>
                    <td width='10%'>
                        <button type='button' className='btn btn-danger btn-sm' onClick={(e)=> removeCart(e,item.id)}>Remove</button>
                    </td>
                 </tr>

            )
        })

    }
    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>HOME / Cart</h6>
                </div>
            </div>
            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className='col-md-12'>
                            <div className='table-responsive'>
                                <table className='table table-responsive'>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th className='text-center'>Price</th>
                                            <th className='text-center'>Quantity</th>
                                            <th className='text-center'>Total Price</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                           checkcart
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan='4'>SUBTOTAL</td>
                                            <td colSpan='2' >PhP : { parseFloat(grandtotal).toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>  
                        {
                         forcheck && ( <>
                                    <div className='col-md-8'>
                                    </div>
                                    <div className='col-md-4'>
                                        <div className='card'>
                                            <div className='card-body'>
                                                    <h5>Grand Total: 
                                                        <span className='float-end'> PHP: {grandtotal}.00</span>
                                                    </h5>
                                            </div>
                                            {/* <button className='btn btn-info btn-block'>CHECKOUT</button> */}
                                            <Link to="/checkout" className='btn btn-info btn-block'>CHECKOUT</Link>
                                        </div>
                                    </div>
                                            </>
                                )                   
                            }
                    </div>
                </div>
            </div>
       </div>
    )
}

export default Cart
