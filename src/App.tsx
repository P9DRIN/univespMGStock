// import PostForm from "./components/PostForm";
import { ProductTable } from "./components/ProductTable";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import { RoutesPage } from "./routes";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <div>
        <RoutesPage />
      </div>
    </AuthProvider>
    
      
  
  );
};


