import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
    return (
        <div className="container">
            <div className='row justify-content-center'>
                <h1>Page 404 | Page Not Found  </h1>
                <h3>Access Denied!</h3>
                <br/>
                <Link to='/login'>Back</Link>
            </div>
        </div>
    )
}



export default Page404

