import React, { useState } from 'react';



function Login()
{
    const app_name = 'dead-ringer'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }

    return(
        <h1>Dead Ringer is underconstruction</h1>
    );
};
export default Login;