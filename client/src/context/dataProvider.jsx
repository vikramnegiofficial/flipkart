import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider=({children}) => {
    const [userAcc, setUserAcc] = useState("");
    return (
        <DataContext.Provider value={{
            userAcc, 
            setUserAcc
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;