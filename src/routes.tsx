

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
            <span>Carregando...</span>
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
           <Route path="/home" element={<PrivateRoute><ProductTable/></PrivateRoute>}/>
           {/* <Route path="/home" element={<ProductTable/>}/> */}
            <Route path="/login" element={<Login/>}/>
        </Routes>
    </Fragment>
    )
}