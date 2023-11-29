import { useEffect, useState, createContext, useCallback, FC, PropsWithChildren, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './config/axiosConfig';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

axios.defaults.withCredentials = true;

type AuthContextType = {
    role: string;
    checkLoginState: () => Promise<void>;
    user: string; 
};

export const AuthContext = createContext<AuthContextType>({ role: "", checkLoginState: async () => {}, user: "" });


export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [role, setRole] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const IdToken = localStorage.getItem('IdToken');

    const checkLoginState = useCallback(async () => {
        try {
        const { data: { user, role }} = await axios.get(`/auth/login`, { headers: { Authorization: `Bearer ${IdToken}` } });
        role && setRole(role);
        user && setUser(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${IdToken}`
        } catch (err) {
            setRole('');
            setUser('');
            localStorage.removeItem('IdToken');
            console.error(err);
        }
    }, []);

    useEffect(() => {
        checkLoginState();
    }, [checkLoginState]);

    return (
        <AuthContext.Provider value={{ role, checkLoginState, user }}>
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
