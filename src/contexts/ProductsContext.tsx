import { Product } from "@/@types/product";
import { api } from "@/lib/axios";
import { ReactNode, createContext, useEffect, useState } from "react";


interface ProductContextType{
    products: Product[];
    setProducts: (products: Product[]) => void;
    CreateProduct: (data: Product) => void;
}


export const ProductsContext = createContext({} as ProductContextType);

export function ProductsProvider( {children}: {children: ReactNode}){

  const [products, setProducts] = useState<Product[]>([]);

  // const apiUrl = `https://api-univesp-mg-stock.vercel.app`
  const apiUrl = `http://localhost:3333/products`

  useEffect(() => {
    // Buscar dados da API
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data?.products);
        } else {
          console.error('Falha ao buscar dados');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, [apiUrl]);
    
  
  async function CreateProduct(data: Product) {
    const { prodType, prodName, prodDescription, prodGender, prodBrand, quality, price } = data

    await api.post('/products', 
    {
      prodType: prodType,
      prodName: prodName,
      prodDescription: prodDescription,
      prodGender: prodGender,
      prodBrand: prodBrand,
      quality: quality,
      price: price
    }
    )

    setProducts([...products, data])

  }

    return (
        <ProductsContext.Provider value={{ products, setProducts, CreateProduct}}>
            {children}
        </ProductsContext.Provider>
    )
}