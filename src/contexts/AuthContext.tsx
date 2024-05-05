import { LoginProps } from '@/@types/login';
import { api } from '@/lib/axios';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  loginAccount: (data: LoginProps) => Promise<void>
  logout: () => void;
  setLoading: (loading: boolean) => void;
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  async function loginAccount(data: LoginProps) { 

    const { username, password } = data;
   
    const searchAcc = await api.get(`/acc/${username}`)
    const filter = searchAcc.data.account.filter((acc: LoginProps) => acc.username === username)
    
    if(searchAcc.data.account.length == 1){
      try{
          const response = await fetch('https://api-univesp-mgs-tock.vercel.app/sessions', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"

              },
              body: JSON.stringify({
                  _id: filter._id,
                  username,
                  password,
              })
          })
          const data = await response.json()
          const token = data.token
          api.defaults.headers.Authorization = `Bearer ${token}`
          Cookies.set('MGStockToken', token, { expires: 1 })
          navigate("/")
          setLoading(false)
          

        }catch(err){
          console.log(err)
        }
    }

  }

  const isAuthenticated = !!Cookies.get('MGStockToken');

  useEffect(() => {
    if (Cookies.get('MGStockToken')) {
      api.defaults.headers.Authorization = `Bearer ${Cookies.get('MGStockToken')}`
    }
    setLoading(false)
  }, [])

  const logout = () => {
    Cookies.remove('MGStockToken')
    setLoading(true)
    navigate("/login")
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginAccount, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};