import { Product } from "@/@types/product";
import { api } from "@/lib/axios";
import { ReactNode, createContext, useEffect, useState } from "react";


interface ProductContextType{
    products: Product[];
    setProducts: (products: Product[]) => void;
    CreateProduct: (data: Product) => void;
    fetchData: () => void;
   
}


export const ProductsContext = createContext({} as ProductContextType);

export function ProductsProvider( {children}: {children: ReactNode}){

  const [products, setProducts] = useState<Product[]>([]);

  const apiUrl = `https://api-univesp-mgs-tock.vercel.app/products`

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setProducts(data?.products);
      } else {
        console.error('Falha ao buscar dados');
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);
    
  
  async function CreateProduct(data: Product) {
    const { transactionType, saleType, prodDescription, price, quantity, quality } = data

    await api.post('/products', 
    {
      transactionType,
      prodDescription,
      saleType,
      quantity,
      quality,
      price,
    }
    )
    const newProduct = data

    setProducts([...products, newProduct])

  }

    return (
        <ProductsContext.Provider value={{ products, setProducts, CreateProduct, fetchData}}>
            {children}
        </ProductsContext.Provider>
    )
}