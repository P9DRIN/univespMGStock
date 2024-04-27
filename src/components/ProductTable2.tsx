import React, { useEffect, useState } from 'react';

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
  const [filterValues, setFilterValues] = useState({
    Tipo: '',
    Nome: '',
    Descrição: '',
    Gênero: '',
    Marca: '',
    Qualidade: '',
    Preço: '',
    Data: '',
    V: '',
  });

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('API_ENDPOINT_URL');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof Product) => {
    const { value } = e.target;
    setFilterValues({ ...filterValues, [key]: value });
  };

  const filteredProducts = products.filter((product) =>
    Object.entries(filterValues).every(([key, value]) =>
      value === '' || String(product[key as keyof Product]).toLowerCase().includes(value.toLowerCase())
    )
  );

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <h2 className="text-lg font-semibold bg-gray-200 p-4">Product Table</h2>
      <div className="flex flex-wrap mb-4 p-4 bg-gray-100">
        {Object.entries(filterValues).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-2 mb-2">
            <label className="text-gray-600">{key}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleFilterChange(e, key as keyof Product)}
              className="border rounded px-2 py-1"
            />
          </div>
        ))}
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
            <th className="border px-4 py-2">Estado</th>
            <th className="border px-4 py-2">Preço</th>
            <th className="border px-4 py-2">Data</th>
            <th className="border px-4 py-2">V</th>
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
