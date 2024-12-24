import {createContext, useContext, useState } from "react";
import toast, {Toaster} from 'react-hot-toast';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({children}) => {  // children should be small not
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false)

    async function loginUser(email, password, navigate){
        setBtnLoading(false);
        try{
            const {data} = await axios.post("/api/user/login", {email,password})

            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate('/');
        }catch(error){
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }
    return( 
    <UserContext.Provider value = {{loginUser, btnLoading, isAuth, user}}>
        {children}
        <Toaster/>
    </UserContext.Provider>
    )
}

export const UserData = () => useContext(UserContext);