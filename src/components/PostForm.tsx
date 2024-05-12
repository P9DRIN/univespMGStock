import { useContext, useState } from "react";
import Modal from "react-modal";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
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
  transactionType: z.enum(["sold", "donation", "bought"]),
  saleType: z.enum(["pix", "debit", "money", "credit", "none"]),
  prodDescription: z.string(),
  price: z.string(),
  quantity: z.string(),
  quality: z.enum(["new", "used", "damaged"]),
});

type NewProductInput = z.infer<typeof newProductSchema>;

export function PostForm() {
  const { CreateProduct, fetchData } = useContext(ProductsContext);

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewProductInput>({
    resolver: zodResolver(newProductSchema),
  });
  enum ProductType {
    sold = "Venda",
    donation = "Doação",
    bought = "Compra",
  }
  enum saleType {
    pix = "Pix",
    debit = "Débito",
    credit = "Crédito",
    money = "Dinheiro",
    none = "Nenhum ou N/A",
  }
  enum ProductQuality {
    new = "Novo",
    used = "Usado",
    damaged = "Usado, com detalhes",
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState('');

  async function handleCreateProduct(data: NewProductInput) {
    const {
      transactionType,
      prodDescription,
      saleType,
      quantity,
      quality,
      price,
    } = data;

    if(Number(price) <= 0){
      setError('O preço deve ser maior do que zero!')
    }

   transactionType === "sold" && Number(price) > 0 && CreateProduct({
    transactionType: transactionType,
    saleType: saleType,
    prodDescription: prodDescription,
    quantity: Number(quantity),
    price: Number(price) * Number(quantity),
    quality: quality,
  });
  transactionType === "donation" || "bought" &&   
    CreateProduct({
    transactionType: transactionType,
    saleType: saleType,
    prodDescription: prodDescription,
    price: 0,
    quantity: Number(quantity),
    quality: quality,
  });

    reset();
    setModalIsOpen(false);
    fetchData();
  }

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white px-4 h-10 py-2 rounded hover:bg-blue-600 drop-shadow-lg"
      >
        Novo Produto
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
          <form
            action=""
            onSubmit={handleSubmit(handleCreateProduct)}
            className="space-y-4"
          >
            <div>
              <label htmlFor="transactionType" className="block">
                Tipo de Transação:
              </label>
              <Controller
                control={control}
                name="transactionType"
                render={({ field }) => (
                  <select
                    {...field}
                    id="transactionType"
                    className="border p-2 rounded"
                  >
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
              <label htmlFor="saleType" className="block">
                Meio de pagamento:
              </label>
              <Controller
                control={control}
                name="saleType"
                render={({ field }) => (
                  <select
                    {...field}
                    id="prodGender"
                    className="border p-2 rounded"
                  >
                    <option value="">Select...</option>
                    {Object.entries(saleType).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                )}
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
                {...register("prodDescription")}
              />
            </div>
            <div>
              <label className="block">Preço unitário da venda :</label>
              <input
                required
                type="text"
                className="border p-2 rounded"
                {...register("price")}
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block">
                Quantidade:
              </label>
              <input
                required
                type="number"
                id="quantity"
                className="border p-2 rounded"
                {...register("quantity")}
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
                  <select
                    {...field}
                    id="quality"
                    className="border p-2 rounded"
                  >
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
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
