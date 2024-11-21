import React, { createContext, useEffect, useState } from 'react'
export const TokenAuthContext = createContext()

const AuthContext = ({children}) => {

    const [isAuthorised,setIsAuthorised] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem("username")){
            setIsAuthorised(true)
        }else{
            setIsAuthorised(false)
        }
    },[])

  return (
    <>
        <TokenAuthContext.Provider value={{isAuthorised,setIsAuthorised}}>
            {children}
        </TokenAuthContext.Provider>
    </>
  )
}

export default AuthContext
