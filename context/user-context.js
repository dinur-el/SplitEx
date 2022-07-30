import { createContext, useState } from 'react';

export const UserContext = createContext({
    id: null,
    setUser: (id) => { }
})

function UserContextProvider({ children }) {
    const [userId, setUserId] = useState(null);

    function setUser(id) {
        setUserId(id);
    }

    const value = {
        id: userId,
        setUser: setUser
    }

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export default UserContextProvider; 