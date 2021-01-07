import React from 'react'

const AuthLayout = (props)=> {
    return (
        <div className={'w-100 h-100'}>
            {props.children}
        </div>
    )
}

export default AuthLayout;
