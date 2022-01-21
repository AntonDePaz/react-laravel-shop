import axios from "axios"
import React from "react"
import { Link, useHistory } from "react-router-dom"
import swal from "sweetalert"

const Navbar = () => {

    const history = useHistory()
    
    const logout = async (e) => {
        e.persist()

      const response = await axios.post(`/api/logout`);
      console.log(response);
      if(response.data.status === 200){
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_name');
          swal("Success!",response.data.message,"success");
        history.push('/login');
      }
    }

    var authButtons = '';
    var name  = '';
    if(!localStorage.getItem('auth_token')){
        authButtons = (
            <>
            <Link className="nav-item nav-link" to="/login">Login</Link>
            <Link className="nav-item nav-link" to="/register">Register</Link>
            </>
        )
    }else{

       name = localStorage.getItem('auth_name')
       authButtons = (
        <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {name}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button onClick={logout} class="btn bbtn-sm">Logout</button>
        </div>
        </div>)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark  bg-primary shadow sticky-top ">
        <Link className="navbar-brand" to="/">MNHS</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse  navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-item nav-link active" to="/">Home <span className="sr-only">(current)</span></Link>
            <Link className="nav-item nav-link active" to="/about">About <span className="sr-only"></span></Link>
            <Link className="nav-item nav-link active" to="/contact">Contact <span className="sr-only"></span></Link>
            <Link className="nav-item nav-link active" to="/collections">Collections <span className="sr-only"></span></Link>
            <Link className="nav-item nav-link active" to="/cart">Cart <span className="sr-only"></span></Link>
            {authButtons}
          </div>
        </div>
      </nav>
    )
}


export default Navbar
