import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

export const ViewProduct = (props) => {

    const history = useHistory();
    const [loading,setLoading] = useState(true);
    const [product,setProduct] = useState([]);
    const [category,setCategory] = useState([]);

    useEffect(()=>{
        const product_slug = props.match.params.slug;
        axios.get(`/api/get_product/${product_slug}`).then((res)=>{
            if(res.data.status === 200){
                setProduct(res.data.product_data.product);
                setCategory(res.data.product_data.category);
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



    },[props.match.params.slug,history]);

    let productCount = product.length;



    if(loading){
       return <h2>Loading..</h2>
    }else{
        var productData = '';

        if(productCount){

        productData = product.map((item , index)=>{
            return (
                <div className='col-md-3' key={index}>
                    <div className='card'>
                        <div className='card-header'>
                           <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                              <h5>{item.name}</h5>
                            </Link> 
                        </div>
                        <div className='card-body' style={{ height: '250px' }}>
                            <Link to={`/collections/${item.category.slug}/${item.slug}`}>
                              <img src={`http://localhost:8000/${item.image}`} alt={item.name} className='w-100' />
                            </Link>
                        </div>
                    </div>
                </div>
            )
        });
    }else{
        productData = 
        <div className='col-md-12'>
           <div className='card'>
               <h6 className='text-center'>No Product Available for { category.name}</h6>
           </div>
        </div>
    }

    }


    console.log('p:',product);
    console.log('c:',category);
    return (
        <div>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h6>Category / {category.name}</h6>
                </div>
            </div>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        {productData}
                    </div>
                </div>
            </div>
       </div>
    )
}
