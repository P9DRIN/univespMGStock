import React, { useContext, useState } from 'react';
import { PostForm } from './PostForm';
import { ProductsContext } from '@/contexts/ProductsContext'
import { Product } from '@/@types/product';
import { priceFormatter } from '@/utils/priceFormatter';
import { useAuth } from '@/contexts/AuthContext';


export function ProductTable(){
  const { isAuthenticated } = useAuth();

  const { products } = useContext(ProductsContext);
  
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filterValues, setFilterValues] = useState({
    prodName: '',
  });

  const fieldNames = {
    prodName: 'Nome do produto',
    prodGender: "Genero do produto",
    prodBrand: "Marca do produto",
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedField = e.target.value;
    setFilterField(selectedField);
    setFilterValue('');
    setFilterValues({ ...filterValues, [selectedField]: '' });
  };

  const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterValue(value);
    setFilterValues({ ...filterValues, [filterField]: value });
  };

  const handleFilterSubmit = () => {
    // Realizar a filtragem aqui
    console.log('Filtragem realizada:', filterValues);
  };

  const filteredProducts = products.filter((product) =>
    Object.entries(filterValues).every(([key, value]) =>
      value === '' || String(product[key as keyof Product]).toLowerCase().includes(value.toLowerCase())
    )
  );

  return (
    <div>
      {isAuthenticated ? (
         <div className="rounded-lg overflow-hidden shadow-lg">
         <h2 className="text-lg font-semibold bg-gray-200 p-4">Tabela de Produtos</h2>
         <div className="flex flex-wrap mb-4 p-4 bg-gray-100 space-y-4">
           <select
             value={filterField}
             onChange={handleFilterChange}
             className="border rounded px-2 h-10 m-4 py-1"
           >
             {Object.keys(fieldNames).map((field) => (
             <option key={field} value={field}>
               {fieldNames[field as keyof typeof fieldNames]}
             </option>
           ))}
           </select>
           <input
             type="text"
             value={filterValue}
             onChange={handleFilterValueChange}
             className="border rounded px-2 h-10 m-4 py-1"
           />
           <button
             onClick={handleFilterSubmit}
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 m-4 py-2 px-4 rounded"
           >
             Filtrar
           </button>
           <PostForm/>
         </div>
         <table className="table-auto w-full bg-white">
           <thead>
             <tr className="bg-gray-200">
               <th className="border px-4 py-2">ID</th>
               <th className="border px-4 py-2">Tipo</th>
               <th className="border px-4 py-2">Nome</th>
               <th className="border px-4 py-2">Descrição</th>
               <th className="border px-4 py-2">Gênero</th>
               <th className="border px-4 py-2">Marca</th>
               <th className="border px-4 py-2">Qualidade</th>
               <th className="border px-4 py-2">Preço</th>
               <th className="border px-4 py-2">Data de Postagem</th>
             </tr>
           </thead>
                   <tbody>
             {filteredProducts.sort((a, b) => {
               const dateA = a.postDate ? new Date(a.postDate) : null;
               const dateB = b.postDate ? new Date(b.postDate) : null;
               return (dateB?.getTime() ?? 0) - (dateA?.getTime() ?? 0);
             }).map((product) => (
               <tr key={product._id} className="bg-gray-100">
                 <td className="border px-4 py-2">{product._id}</td>
                 <td className="border px-4 py-2">{product.prodType && product.prodType === "clothing" && "Roupas" || product.prodType === "shoes" && "Calçados" || product.prodType === "pet" && "Itens de Pet"}</td>
                 <td className="border px-4 py-2">{product.prodName}</td>
                 <td className="border px-4 py-2">{product.prodDescription}</td>
                 <td className="border px-4 py-2">{product.prodGender && product.prodGender === "male" && "Masculino" || product.prodGender === "female" && "Feminino" || product.prodGender === "none" && "Nenhum ou N/A"}</td>
                 <td className="border px-4 py-2">{product.prodBrand}</td>
                 <td className="border px-4 py-2">{product.quality && product.quality === "new" && "Novo" || product.quality === "used" && "Usado" || product.quality === "damaged" && "Usado, com detalhes"}</td>
                 <td className="border px-4 py-2">{priceFormatter.format(product.price || 0)}</td>
                 <td className="border px-4 py-2">{product.postDate ? new Date(product.postDate).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : ''}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
      ) : (
        <h1>Please login to access Dashboard.</h1>
      )}
    </div>
   
  );
}

