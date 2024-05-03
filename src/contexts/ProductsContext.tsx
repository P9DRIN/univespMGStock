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

  const apiUrl = `https://api-univesp-mgs-tock.vercel.app/products`

  useEffect(() => {
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

    fetchData();

    console.log(products)

  }, []);
    
  
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
    const newProduct = data

    setProducts([...products, newProduct])

  }

    return (
        <ProductsContext.Provider value={{ products, setProducts, CreateProduct}}>
            {children}
        </ProductsContext.Provider>
    )
}