import {createContext, useContext, useEffect, useState} from "react";
import {getCurrentUser} from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [likedProperties, setLikedProperties] = useState([]);

    // Update likedProperties
    const handleLikeProperty = (property) => {
        setLikedProperties(prev =>
            prev.some(item => item.$id === property.$id)
                ? prev.filter(item => item.$id !== property.$id)
                : [...prev, property]
        );
    };
    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLogged(true);
                    setUser(res);
                } else {
                    setIsLogged(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);;
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                setIsLogged,
                user,
                setUser,
                isLoading,
                likedProperties,
                setLikedProperties,
                handleLikeProperty,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
