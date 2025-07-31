import React, { createContext, useState, useEffect} from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

//aqui defino el estado de autenticacion de todos los usuarios en toda la app
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(user) return;

        const accesToken = localStorage.getItem("token");
        if(!accesToken){
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error("Usuario no auntenticado", error);
                clearUser();
            }finally {
                setLoading(false);
            }
        };

        fetchUser();

    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        //aqui me guarda el token
        localStorage.setItem("token", userData.token);
        setLoading(false);
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value ={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );

}

export default UserProvider