import { useEffect, useState, createContext, useCallback, FC, PropsWithChildren, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from './config/constant';
import axios from 'axios';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

axios.defaults.withCredentials = true;

type AuthContextType = {
    loggedIn: boolean;
    checkLoginState: () => Promise<void>;
    user: string; 
};

const AuthContext = createContext<AuthContextType>({ loggedIn: false, checkLoginState: async () => {}, user: "" });

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<string>('');
    const IdToken = localStorage.getItem('IdToken');

    const checkLoginState = useCallback(async () => {
        try {
        const { data: { user, role }} = await axios.get(`${serverUrl}/auth/login`, { headers: { Authorization: `Bearer ${IdToken}` } });
        const logged_in = role !== '';
        setLoggedIn(logged_in);
        user && setUser(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${IdToken}`
        } catch (err) {
        console.error(err);
        }
    }, []);

    useEffect(() => {
        checkLoginState();
    }, [checkLoginState]);

    return (
        <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>
        {children}
        </AuthContext.Provider>
    );
}

export const LoginButton = () => {
    const navigate = useNavigate();
    const { checkLoginState } = useContext(AuthContext);
    const login = async (response: CredentialResponse) => {
        const IdToken = response.credential ?? '';
        localStorage.setItem('IdToken', IdToken);
        await checkLoginState();
        navigate('/');
    }
    const errorMessage = () => {
        console.error('Error logging in');
    }
    return (
        <GoogleLogin onSuccess={login} onError={errorMessage} />
    );
}