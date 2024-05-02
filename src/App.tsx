// import PostForm from "./components/PostForm";
import { ProductTable } from "./components/ProductTable";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div>
        <Login />
        <ProductTable />
      </div>
    </AuthProvider>
    
      
  
  );
};

export default App;
