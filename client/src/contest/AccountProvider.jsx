import React, { createContext, useState } from "react";

export const AccountContext = createContext('');

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState();

    return (
        <AccountContext.Provider value={{ 
            account, 
            setAccount,
            }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
