import axios from 'axios';
import React, {useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';

export const EditProduct = (props) => {

    const history = useHistory();
    const [category,setCategory]= useState();
    const [loading,setLoading] = useState(true);

    const [photo,setPhoto] = useState([]);

    const [error, setError] = useState();

    const [product, setProduct] = useState({
        category_id : '',
        slug: "",
        name: "",
        description: "",
       
        meta_description: "",
        meta_keyword: "",
        meta_title: "",
       
        original_price: "",
        brand: "",
        quantity: "",
        selling_price: "",
        status: "",
        featured: "",
        popular: "",
        image: ''
         });

    useEffect(() => {

        document.title = 'View Product';

        axios.get(`/api/getallcategory`).then(res => {
            if(res.data.status === 200){
                setCategory(res.data.category)
            }
            setLoading(false);
        });

        const product_id = props.match.params.id;

        axios.get(`/api/edit-product/${product_id}`).then(res => {
            if(res.data.status === 200){
               setProduct(res.data.product);
            }else{
                swal('Error',res.data.message,'error')
                history.push('/admin/view-product')
            }
            setLoading(false);
        });
      
    }, []);
   

    console.log('category:',category);

    const handleInput = (e) => {
            setProduct({...product , [e.target.name] : e.target.value})
    }

    const handleImage = (e) => {
        setPhoto({ image : e.target.files[0] })
    }


    const submitEditproduct = (e) => {
       e.preventDefault();

       const product_id = props.match.params.id;

       const formData = new FormData();
       formData.append('image', photo.image);
       formData.append('category_id', product.category_id);
       formData.append('slug', product.slug);
       formData.append('name', product.name);
       formData.append('description', product.description);
       formData.append('meta_title', product.meta_title);
       formData.append('meta_keyword', product.meta_keyword);
       formData.append('meta_description', product.meta_description);
       formData.append('selling_price', product.selling_price);
       formData.append('original_price', product.original_price);
       formData.append('quantity', product.quantity);
       formData.append('brand', product.brand);
       formData.append('featured', product.featured);
       formData.append('popular', product.popular);
       formData.append('status', product.status);

       
       axios.post(`/api/update-product/${product_id}`, formData).then((response)=>{

        if(response.data.status === 200){
            swal('Success',response.data.message,'success');
            setError('');
            setProduct({category_id : '',
            slug: "",
            name: "",
            description: "",
           
            meta_description: "",
            meta_keyword: "",
            meta_title: "",
           
            original_price: "",
            brand: "",
            quantity: "",
            selling_price: "",
            status: "",
            featured: "",
            popular: "",})
            history.push('/admin/view-product')
         }else if(response.data.status === 422){
            swal('Product Not Found',response.data.message,'error')
            history.push('/admin/view-product')
         }
        
       })

    }


    if(loading){
        return <h5>Loading..</h5>
    }
   

    return (
       
        <div className='container'>
            <div className='card mt-4'>
                <div className='card-header'>
                    <h3>Edit Product
                        <Link to='/admin/view-product' className='btn btn-sm btn-info float-end'>View Product</Link>
                    </h3>
                </div>
                <div className='card-body'>
                    <form encType='multipart/form-data' onSubmit={submitEditproduct}>

                  
                   <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
                            <button className="nav-link" id="nav-profile-tab1" data-bs-toggle="tab" data-bs-target="#nav-profile1" type="button" role="tab" aria-controls="nav-profile1" aria-selected="false">More Details</button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane card-body border fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                               
                            <div className="col-md-6 offset-md-3 pt-4">
                               <div className="form-group mb-3">
                                    <label>Select Category</label>
                                    <select name='category_id' className='form-control' onChange={handleInput} value={product.category_id} >
                                       <option >Select Category</option>
                                        {
                                            category.map((item) => {
                                                return (
                                                <option value={item.id} key={item.id}>{item.name} </option>
                                                )
                                            })
                                        }
                                    </select>
                                    <span className='text-danger'>{ error && error.category_id}</span>
                                </div>
                               <div className="form-group mb-3">
                                    <label>SLUG</label>
                                    <input type='text' name="slug" onChange={handleInput} value={product.slug}  className="form-control" />
                                    <span className='text-danger'>{ error && error.slug}</span>
                                
                                </div>
                                <div className="form-group mb-3">
                                    <label>NAME</label>
                                    <input type='text' name="name"  onChange={handleInput} value={product.name} className="form-control" />
                                    <span className='text-danger'>{ error && error.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>DESCRIPTION</label>
                                    <textarea name="description" onChange={handleInput} value={product.description} className="form-control">
                                
                                    </textarea>
                                    <span className="text-danger" >  </span>
                                </div> 
                            </div>  

                        </div>
                        <div className="tab-pane card-body border fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

                            <div className="col-md-6 offset-md-3 pt-4">
                                    <div className="form-group mb-3">
                                        <label>META TITLE</label>
                                        <input type='text' name="meta_title" onChange={handleInput} value={product.meta_title}  className="form-control" />
                                        <span className='text-danger'>{ error && error.meta_title}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>META KEYWORD</label>
                                        <input type='text' name="meta_keyword" onChange={handleInput} value={product.meta_keyword}  className="form-control" />
                                        <span className="text-danger" >  </span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>META DESCRIPTION</label>
                                        <textarea name="meta_description" onChange={handleInput} value={product.meta_description} className="form-control">
                                        </textarea>
                                        <span className="text-danger" >  </span>
                                    </div> 
                                </div>  

                        </div>

                        <div className="tab-pane card-body border fade" id="nav-profile1" role="tabpanel" aria-labelledby="nav-profile-tab1">

                            <div className="row mt-5">
                                <div className='col-md-4'>
                                    <div className="form-group mb-3">
                                            <label>BRAND</label>
                                            <input type='text' name="brand" onChange={handleInput} value={product.brand}  className="form-control" />
                                            <span className='text-danger'>{ error && error.brand}</span>
                                        
                                        </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="form-group mb-3">
                                            <label>SELLING PRICE</label>
                                            <input type='text' name="selling_price" onChange={handleInput} value={product.selling_price} className="form-control" />
                                            <span className='text-danger'>{ error && error.selling_price}</span>
                                        
                                        </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="form-group mb-3">
                                            <label>ORIGINAL PRICE</label>
                                            <input type='text' name="original_price"  onChange={handleInput} value={product.original_price} className="form-control" />
                                            <span className="text-danger" > { error && error.original_price} </span>
                                        </div>
                                </div>
                                
                                <div className='col-md-4'>
                                    <div className="form-group mb-3">
                                            <label>QUANTITY</label>
                                            <input type='text' name="quantity" onChange={handleInput} value={product.quantity}  className="form-control" />
                                            <span className="text-danger" > { error && error.quantity} </span>
                                        </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className="form-group mb-3">
                                            <label>IMAGE</label>
                                            <input type='file' name='image' className='form-control' onChange={handleImage} />
                                            <span className="text-danger" >{ error && error.image}  </span>
                                        </div> 
                                </div>
                                <div className='col-md-4'>
                                <img src={`http://localhost:8000/${product.image}`} alt={product.name}  />
                                </div>
                                    
                                <div className='row'>
                                  
                                            <label>FEATURED (checked-shown)</label>
                                            <input type='checkbox' name="featured" onChange={handleInput} value={product.featured}  />
                                            <span className="text-danger" >  </span>
                                       
                                            <label>POPULAR (checked-shown)</label>
                                            <input type='checkbox' name="popular" onChange={handleInput} value={product.popular} />
                                            <span className="text-danger" >  </span>
                                      
                                            <label>STATUS (checked-shown)</label>
                                            <input type='checkbox' name="status"  onChange={handleInput} value={product.status} />
                                            <span className="text-danger" >  </span>
                                      
                                </div>
                                   
                                   
                                   
                                </div>  

                              

                            </div>
                          
                    </div>
                    <button type='submit' className='btn btn-primary btn-block'> Update Product </button>
                    </form>
                </div>

            </div>
        </div>

                                    
    )
}
