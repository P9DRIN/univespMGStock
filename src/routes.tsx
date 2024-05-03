

import { Route, Routes, Navigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { ProductTable } from './components/ProductTable';
import Login from './components/Login';
import { useAuth } from './contexts/AuthContext';

interface RouterProps{
    children: React.ReactNode;
}

const PrivateRoute = ({children}: RouterProps) => {

    const { isAuthenticated } = useAuth()

    const { loading } = useAuth()
   
    if(loading){
        return(
            <>
            <div className='w-screen h-screen flex items-center justify-center'>
                <div className='bg-blue-50 rounded-full'>
                    <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-800 '/>
                </div>
            </div>
            </>
        )
    }
    if(!isAuthenticated){
        return <Navigate to="/login" />
    }
    return children

}

export function RoutesPage(){
    return(
    <Fragment>
        <Routes>
           <Route path="/" element={<PrivateRoute><ProductTable/></PrivateRoute>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </Fragment>
    )
}