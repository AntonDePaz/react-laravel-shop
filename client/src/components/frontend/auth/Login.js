import axios from 'axios'
import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert'

import '../../../assets/admin/css/styles.css'
import '../../../assets/admin/js/scripts.js'
import Navbar from '../../../layouts/frontend/Navbar'



const Login = () => {

    const history = useHistory();

   const [state, setState] = useState({
        email : '',
        password : '',
        errormsg : ''
   });
   const [errors, setErrors] = useState();

   const inputLogin = (e) => {
       e.persist()
      setState({...state,  [e.target.name] : e.target.value});
   }

    const doLogin = async (e) => {
        e.preventDefault()

       const response = await axios.post(`/api/login`,state);
        if(response.data.status === 200){
            localStorage.setItem('auth_token', response.data.token )
            localStorage.setItem('auth_name', response.data.firstname + ' '+ response.data.lastname  )
            swal("Success!",response.data.message,"success");
            if(response.data.role === 1){
                history.push('/admin')
            }else{
                history.push('/')
            }
           
        } else if(response.data.status === 401){
            setErrors('');
            setState({...state, errormsg : response.data.message}) 
        }else{
            setErrors(response.data.validation_errors)
        }
       
    }

    return (
        <div>
            {/* <Navbar/> */}
        <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                <div className="card-body">
                                    <form onSubmit={doLogin}>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputEmail" name='email' type="email" onChange={inputLogin} />
                                            <label for="inputEmail">Email address</label>
                                            <span className='text-danger'> { errors && errors.email } </span>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputPassword" name='password' onChange={inputLogin} type="password"/>
                                            <label for="inputPassword">Password</label>
                                            <span className='text-danger'> { errors && errors.password } </span>
                                        </div>
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                            <label className="form-check-label" for="inputRememberPassword">Remember Password</label>
                                        </div>
                                        <span className='text-danger'> { state && state.errormsg } </span>
                                        <div className="mt-4 mb-0">
                                                <div className="d-grid"><button type='submit' className="btn btn-primary btn-block" >Login</button></div>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center py-3">
                                    <div className="small"><Link to="/register">Need an account? Sign up!</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <div id="layoutAuthentication_footer">
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; Your Website 2021</div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    </div>
    )
}


export default Login
