import React from 'react'
import { Link } from 'react-router-dom'

import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts.js'
import Navbar from '../../layouts/frontend/Navbar'




const Thankyou = () => {
    return (
        <div>
       
             <main>
                    <div className="container">
                        <div className='card'>
                            <div className='card-header mt-4'>
                              <h4 className='text-center' >Thank You for purchasing our product. Please Come Again!!</h4>
                            </div>
                            <div className='card-body text-center'>
                               <Link to='/' className='btn btn-default mt-4'> <i className='fa fa-back'></i> BACK</Link>
                            </div>
                        </div>
                    </div>
            </main>
        </div>
    )
}

export default Thankyou
