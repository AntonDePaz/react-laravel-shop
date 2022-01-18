import React from 'react'
import { Link } from 'react-router-dom'

function Page403() {
    return (
        <div className="container">
            <div className='row justify-content-center'>
                <div className='col-md-12'>
                    <h1>Page 403 | Forbidden  </h1>
                    <h3>Access Denied! You are not admin</h3>
                    <br/>
                    <Link to='/login'>Back</Link>
                </div>
            </div>
        </div>
    )
}



export default Page403

