import React, { useState } from "react";
import Modal from "react-modal";

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

const PostForm: React.FC = () => {
  // State for form data
  const [formData, setFormData] = useState({
    prodType: "",
    prodName: "",
    prodDescription: "",
    prodGender: "",
    prodBrand: "",
    quality: "",
    price: 0,
  });
  // State for modal visibility
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Make API call to post form data
      const response = await fetch("API_ENDPOINT_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Handle response
      if (response.ok) {
        // Handle successful submission
        console.log("Form submitted successfully!");
        // Close modal after successful submission
        setModalIsOpen(false);
      } else {
        // Handle error
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white px-4 h-10 py-2 absolute right-12 rounded hover:bg-blue-600"
      >
        Novo
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="p-4">
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600"
          >
            X
          </button>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="prodType" className="block">
                Tipo:
              </label>
              <input
                type="text"
                id="prodType"
                name="prodType"
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="prodName" className="block">
                Nome:{" "}
              </label>
              <input
                type="text"
                id="prodName"
                name="prodName"
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="prodDescription" className="block">
                Descrição:
              </label>
              <input
                type="text"
                id="prodDescription"
                name="prodDescription"
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="prodGender" className="block">
                Gênero:
              </label>
              <input
                type="text"
                id="prodGender"
                name="prodGender"
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="prodBrand" className="block">
              Marca:
              </label>
              <input
                type="text"
                id="prodBrand"
                name="prodBrand"
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="quality" className="block">
                Qualidade:
              </label>
              <input
                type="text"
                id="quality"
                name="quality"
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="price" className="block">
                Preço:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default PostForm;
