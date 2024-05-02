import  { useContext, useState } from "react";
import Modal from "react-modal";
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductsContext } from "@/contexts/ProductsContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    maxWidth: "400px",
    borderRadius: "0.5rem",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

  const newProductSchema = z.object({
    prodType: z.enum(["clothing", "shoes", "pet"]) ,
    prodName: z.string(),
    prodDescription: z.string(),
    prodGender: z.enum(["male", "female", "none"]),
    prodBrand: z.string(),
    quality: z.enum(["new", "used", "damaged"]),
    price: z.string(),
  });

  type NewProductInput = z.infer<typeof newProductSchema>;
 
export function PostForm()  {

  const { CreateProduct } = useContext(ProductsContext)

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,

  } = useForm<NewProductInput>({
    resolver: zodResolver(newProductSchema),
  })
  enum ProductType {
    clothing = "Roupas",
    shoes = "Sapatos",
    pet =  "Itens de pet"
  }
  enum ProductGender {
    male = "Masculino",
    female = "Feminino",
    none = "Nenhum ou N/A"
  }
  enum ProductQuality {
    new = "Novo",
    used = "Usado",
    damaged = "Usado, com detalhes"
  }

  // State for modal visibility
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function to handle form submission
  async function handleCreateProduct(data: NewProductInput) {
    const { prodType, prodName, prodDescription, prodGender, prodBrand, quality, price } = data
      CreateProduct({
        prodType: prodType,
        prodName: prodName,
        prodDescription: prodDescription,
        prodGender: prodGender,
        prodBrand: prodBrand,
        quality: quality,
        price: Number(price)
      
      })

      reset()
      setModalIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white px-4 h-10 py-2 absolute right-12 rounded hover:bg-blue-600"
      >
        Novo
      </button>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="p-4">
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
          >
            X
          </button>
          <form action="" onSubmit={handleSubmit(handleCreateProduct)} className="space-y-4">
            <div>
              <label htmlFor="prodType" className="block">
                Tipo:
              </label>
              <Controller

              control={control}
              name="prodType"
              render={({ field }) => (
              <select {...field} id="prodType" className="border p-2 rounded">
              <option value="">Select...</option>
              {Object.entries(ProductType).map(([value, label]) => (
              <option key={value} value={value}>
              {label}
            </option>
            ))}
            </select>
             )}
            />    
               
            </div>
            <div>
              <label htmlFor="prodName" className="block">
                Nome:{" "}
              </label>
              <input
                required
                type="text"
                id="prodName"
                className="border p-2 rounded"
                {...register('prodName')}
              />
            </div>
            <div>
              <label htmlFor="prodDescription" className="block">
                Descrição:
              </label>
              <input
              required
                type="text"
                id="prodDescription"
                className="border p-2 rounded"
                {...register('prodDescription')}
              />
            </div>
            <div>
              <label htmlFor="prodGender" className="block">
                Gênero:
              </label>
              <Controller
              control={control}
              name="prodGender"
              render={({ field }) => (
              <select {...field} id="prodGender" className="border p-2 rounded">
              <option value="">Select...</option>
              {Object.entries(ProductGender).map(([value, label]) => (
              <option key={value} value={value}>
              {label}
            </option>
            ))}
            </select>
             )}
            />  
            </div>
            <div>
              <label htmlFor="prodBrand" className="block">
                Marca:
              </label>
              <input
              required
                type="text"
                id="prodBrand"
                className="border p-2 rounded"
                {...register('prodBrand')}
              />
            </div>
            <div>
              <label htmlFor="quality" className="block">
                Qualidade:
              </label>
              <Controller
              control={control}
              name="quality"
              render={({ field }) => (
              <select {...field} id="quality" className="border p-2 rounded">
              <option value="">Select...</option>
              {Object.entries(ProductQuality).map(([value, label]) => (
              <option key={value} value={value}>
              {label}
            </option>
            ))}
            </select>
             )}
            />  
            </div>
            <div>
              <label className="block">
                Preço:
              </label>
              <input
                required
                minLength={1}
                type="number"
                className="border p-2 rounded"
                {...register('price')}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

