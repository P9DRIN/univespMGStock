import React, { useEffect, useState } from 'react';
import PostForm from './PostForm';

interface Product {
  _id: string;
  prodType: string;
  prodName: string;
  prodDescription: string;
  prodGender: string;
  prodBrand: string;
  quality: string;
  price: number;
  postDate: string;
  _v: number;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filterValues, setFilterValues] = useState({
    prodType: '',
    prodName: '',
    prodDescription: '',
    prodGender: '',
    prodBrand: '',
    quality: '',
    price: '',
    postDate: '',
    _v: '',
  });

  useEffect(() => {
    // Buscar dados da API
    const fetchData = async () => {
      try {
        const response = await fetch('API_ENDPOINT_URL');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Falha ao buscar dados');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

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
    <div className="rounded-lg overflow-hidden shadow-lg">
      <h2 className="text-lg font-semibold bg-gray-200 p-4">Tabela de Produtos</h2>
      <div className="flex flex-wrap mb-4 p-4 bg-gray-100 space-y-4">
        <select
          value={filterField}
          onChange={handleFilterChange}
          className="border rounded px-2 h-10 m-4 py-1"
        >
          <option value="">Selecione o Campo</option>
          {Object.keys(filterValues).map((key) => (
            <option key={key} value={key}>
              {key}
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
            <th className="border px-4 py-2">Versão</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id} className="bg-gray-100">
              <td className="border px-4 py-2">{product._id}</td>
              <td className="border px-4 py-2">{product.prodType}</td>
              <td className="border px-4 py-2">{product.prodName}</td>
              <td className="border px-4 py-2">{product.prodDescription}</td>
              <td className="border px-4 py-2">{product.prodGender}</td>
              <td className="border px-4 py-2">{product.prodBrand}</td>
              <td className="border px-4 py-2">{product.quality}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.postDate}</td>
              <td className="border px-4 py-2">{product._v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
