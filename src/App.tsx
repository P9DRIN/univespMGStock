// import PostForm from "./components/PostForm";

import { AuthProvider } from "./contexts/AuthContext";

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


