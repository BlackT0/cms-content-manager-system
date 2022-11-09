import {useState} from 'react'
import {Redirect} from 'react-router-dom'

function Auth({children}) {
    const [token] = useState(() => {
        return window.sessionStorage.getItem('token')
    })

    return (
        <>
            {token ? <>{children}</> : <Redirect to='/'/>}
        </>
    )
}

export default Auth;