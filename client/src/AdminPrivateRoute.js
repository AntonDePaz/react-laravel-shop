import axios from "axios";
import React, {useEffect, useState} from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import swal from "sweetalert";
import MasterLayout from './layouts/admin/MasterLayout'

const  AdminPrivateRoute = ({...rest}) => {

    const history = useHistory();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

     useEffect(()  => {

        try {
            axios.get(`/api/checkAuthenticate`).then((response) => {
                if(response.status === 200){
                    setAuthenticated(true);
                }
                setLoading(false);
            });
            return () =>{
                setAuthenticated(false)
            }    
        } catch (error) {
            console.log('Error:',error)  
        }

    }, []);


    axios.interceptors.response.use(undefined , function axiosRetryInterceptor(err){
        if(err.response.status === 401){
          //  swal('Unauthorized', err.response.data.message,'warning')
            history.push('/login');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (res){
        return res; 
    }, function  (error) {
        if(error.response.status === 403){
            swal('Forbidden',error.response.data.message,'warning');
            history.push('/page403');
        }else if(error.response.status === 404) { ///page not found
            swal('Forbidden','Page Not Found','warning');
            history.push('/page404');
        }
        return Promise.reject(error);
    }
    
    )

    if(loading){
        return <h2>Loading...</h2>
    }

   
    return (
        <Route {...rest}
            render={ ({props, location}) => (
                Authenticated ?
                    ( <MasterLayout {...props} /> ) :
                    ( <Redirect to={ {pathname: '/login', state: {from : location }  } } /> )
             ) 
            }   

        />
    )


}

export default AdminPrivateRoute