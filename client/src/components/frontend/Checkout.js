import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import  ReactDOM  from 'react-dom';
import swal from 'sweetalert';

const Checkout = () => {


    const history = useHistory();
    const [loading,setLoading] = useState(true);
    const [cart,setCart] = useState([]);
    const [user, setUser] = useState([]);
    const [error, setError] = useState([]);
   // const [data,setData] = useState([];)
   var grandtotal = 0;

    const inputChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value })
    }

    //paypal Code
   const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

    const createOrder = (data, actions) => {
        return actions.order.create({
        purchase_units: [
            {
            amount: {
                value: grandtotal,
            },
            },
        ],
        });
    };
    const onApprove = (data, actions) => {
       // return actions.order.capture();
        return actions.order.capture().then((details)=>{
            console.log(details);
            setUser({...user, payment_mode : 'PayPal Paid', payment_id : details.id });
            axios.post(`/api/order`,user).then((res) => {

                if(res.data.status === 200){
                    swal('Success',res.data.message,'success')
                    setError([]);
                    history.push('/thankyou');
                }else if(res.data.status === 401){
                    swal('Error',res.data.message,'error')
                    history.push('/')
                }else if(res.data.status === 422){
                   setError(res.data.errors);
                }
    
            });



        });
    };

   
//end paypal
    const OrderNow = (e,payment_mode) => {
        e.preventDefault()
      
        setUser({...user, payment_mode : payment_mode });
        console.log('User: ',user);
        switch (payment_mode) {
            case 'cod':
                axios.post(`/api/order`,user).then((res) => {

                    if(res.data.status === 200){
                        swal('Success',res.data.message,'success')
                        setError([]);
                        history.push('/thankyou');
                    }else if(res.data.status === 401){
                        swal('Error',res.data.message,'error')
                        history.push('/')
                    }else if(res.data.status === 422){
                       setError(res.data.errors);
                    }
        
                });
                break;
            case 'razorpay':
                    axios.post(`/api/validate-order`,user).then((res)=>{
                        if(res.data.status === 200){
                           // swal('Success',res.data.message,'success')
                            setError([]);
                            var options = {
                                "key": "rzp_test_vKixqWwEdvtDhh", // Enter the Key ID generated from the Dashboard
                                "amount": (1 * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                               // "currency": "INR",
                                "name": "De Paz Corp.",
                                "description": "Test Transaction",
                                "image": "http://localhost:3010/logo192.png",
                               // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                                "handler": function (response){
                                    alert(response.razorpay_payment_id);
                                    setUser({...user, payment_id : response.razorpay_payment_id });
                                    axios.post(`/api/order`,user).then((res) => {
                                        if(res.data.status === 200){
                                            swal('Success',res.data.message,'success')
                                            setError([]);
                                            history.push('/thankyou');
                                        }
                            
                                    });




                                },
                                "prefill": {
                                    "name": user.firstname + user.lastname,
                                    "email": user.email,
                                    "contact": user.phone
                                },
                                // "notes": {
                                //     "address": "Razorpay Corporate Office"
                                // },
                                "theme": {
                                    "color": "#3399cc"
                                }
                            };
                            var rzp = new window.Razorpay(options);
                            rzp.open();
                        }else if(res.data.status === 422){
                            setError(res.data.errors);
                        }else if(res.data.status === 401){
                            swal('Success',res.data.message,'success')
                        }
                    })
                break;
            case 'paypal':
                axios.post(`/api/validate-order`,user).then((res)=>{
                    if(res.data.status === 200){
                        setError([]);
                        var modal = new window.bootstrap.Modal(document.getElementById('payonlineModal'));
                        modal.show();
                    }else if(res.data.status === 422){
                        setError(res.data.errors);
                    }else if(res.data.status === 401){
                        swal('Success',res.data.message,'success')
                    }
                    });
                break;
            default:
                swal('warning','deafult','warning')
                break;
        }

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
 
 var forcheck = false;
 if(cart.length > 0){
     forcheck = true
 }

 
    

    return (

        <div>

            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#payonlineModal">
            Launch demo modal
            </button>


            <div class="modal fade" id="payonlineModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Online Payment Method</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <PayPalButton
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                    />
                </div>
                {/* <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div> */}
                </div>
            </div>
            </div>





            <div className="py-3 bg-warning">
                <div className="container">
                    <h6> <Link to='/' >HOME</Link>  / Checkout</h6>
                </div>
            </div>
            <div className="py-4">
                <div className="container">
                {  forcheck ? 
                    <div className="row">
                       <div className='col-md-6'>
                          <div className='card'>
                                <div className='card-header'>
                                    <h4>My Information</h4> 
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-md-6 form-group'>
                                            <label>Firstname</label>
                                            <input type='text' className='form-control' name="firstname" onChange={inputChange}  value={user.firstname} />
                                            <small className='text-danger'>{ error && error.firstname}</small>
                                        </div>
                                        <div className='col-md-6 form-group'>
                                            <label>Lastname</label>
                                            <input type='text' className='form-control' name="lastname" onChange={inputChange}  value={user.lastname} />
                                            <span className='text-danger'>{ error && error.lastname}</span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6 form-group'>
                                            <label>Phone</label>
                                            <input type='text' className='form-control' name="phone" onChange={inputChange}  value={user.phone}  />
                                            <span className='text-danger'>{ error && error.phone}</span>
                                        </div>
                                        <div className='col-md-6 form-group'>
                                            <label>Email Address</label>
                                            <input type='text' className='form-control' name="email" onChange={inputChange}  value={user.email}  />
                                            <span className='text-danger'>{ error && error.email}</span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-4 form-group'>
                                            <label>City</label>
                                            <input type='text' className='form-control' name="city" onChange={inputChange}  value={user.city}  />
                                            <span className='text-danger'>{ error && error.city}</span>
                                        </div>
                                        <div className='col-md-4 form-group'>
                                            <label>State</label>
                                            <input type='text' className='form-control' name="state" onChange={inputChange}  value={user.state}  />
                                            <span className='text-danger'>{ error && error.state}</span>
                                        </div>
                                        <div className='col-md-4 form-group'>
                                            <label>Zip Code</label>
                                            <input type='text' className='form-control' name="zipcode" onChange={inputChange}  value={user.zipcode}  />
                                            <span className='text-danger'>{ error && error.zipcode}</span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12 form-group'>
                                           <label>Address</label>
                                            <textarea className='form-control' name="address" onChange={inputChange}  value={user.address} ></textarea>
                                            <span className='text-danger'>{ error && error.address}</span>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-12 my-2'>
                                            <button type='button' className='btn btn-primary btn-sm mx-1 float-end' onClick={(e) => OrderNow(e,'cod')} >Place (COD)</button> 
                                            <button type='button' className='btn btn-primary btn-sm mx-1 float-end' onClick={(e) =>OrderNow(e, 'razorpay')} >Pay (Online)</button>
                                            <button type='button' className='btn btn-warning btn-sm mx-1 float-end' onClick={(e) =>OrderNow(e, 'paypal')} >Pay (PayPal)</button>
                                        </div>
                                    </div>
                                </div>
                           </div>
                       </div>
                       <div className='col-md-6'>
                          <div className='card'>
                                <div className='card-header'>
                                    <h4>Orders</h4> 
                                </div>
                                <div className='card-body'>
                                    <table className='table table-responsive table-bordered'>
                                        <thead>
                                            <tr>
                                                <th width="50%">Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {   
                                                 cart.map((item, index)=>{
                                                    grandtotal += item.product.selling_price * item.product_qty;
                                                    return (
                                                        <tr>
                                                            <td>{item.product.name}</td>
                                                            <td>{item.product.selling_price}</td>
                                                            <td>{item.product_qty}</td>
                                                            <td>{ item.product.selling_price * item.product_qty }</td>
                                                        </tr>
                                                    )
                                                 })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className='fw-bold' colSpan='3'>GRAND TOTAL</td>
                                                <td><b> {grandtotal} </b></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                           </div>
                       </div>
                    </div>
                     : 
                    <div>
                         <div className='card my-3'>
                             <div className='card-header'>
                                 <h5 className='text-center text-danger' >No Item in Cart! Please Add cart first!</h5>
                             </div>
                        </div>   
                    </div>
                     }
                </div>
            </div>
        </div>
    )
}


export default Checkout