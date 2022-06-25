import React, { useState, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isLog, setIsLog] = useState(false);
    const [loggedSecurity, setLoggedSecurity] = useState("");

    return(
        <AuthContext.Provider value={{ isLog, setIsLog, loggedSecurity, setLoggedSecurity }}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthContext, AuthProvider};