import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import publicroute from '../../routes/publicroute'
import Navbar from './Navbar'


const FrontendLayout = () => {
    return (
        <div >
            <Navbar/>
            <div>
               
                        <Switch>
                            {
                                publicroute.map((route, idx) => {
                                  
                                    return (
                                        route.component && (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact = {route.exact}
                                            name={route.name}
                                            render={(props)=> (
                                                <route.component {...props} />
                                            )}

                                        />
                                        )
                                    )
                                })
                            }
                        </Switch>
            </div>
        </div>
    )
}


export default FrontendLayout
