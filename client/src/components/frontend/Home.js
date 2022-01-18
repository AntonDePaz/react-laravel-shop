import React from 'react'

import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts.js'
import Navbar from '../../layouts/frontend/Navbar'




const Home = () => {
    return (
        <div>
            <Navbar/>
             <main>
                    <div className="container">
                        <h1 className='text-center' >This is Users Home</h1>
                    </div>
            </main>
        </div>
    )
}

export default Home
