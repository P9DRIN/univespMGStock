import React, { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  onClose: () => void;
}

interface DataItem {
  data: string;
  tipo: string;
  meio: string;
  subTotal: number;
  subTotalPix: number;
  subTotalDebito: number;
  subTotalCredito: number;
  subTotalDinheiro: number;
}

const DatabaseSummary: React.FC<Props> = ({ onClose }) => {
  const [data, setData] = useState<DataItem[]>([]);
  const [sum, setSum] = useState<number>(0);
  const [sumPix, setSumPix] = useState<number>(0);
  const [sumDebito, setSumDebito] = useState<number>(0);
  const [sumCredito, setSumCredito] = useState<number>(0);
  const [sumDinheiro, setSumDinheiro] = useState<number>(0);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>(
          "https://api-univesp-mgs-tock.vercel.app/products"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching database data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateSum = () => {
    let calculatedSum = 0;
    let calculatedSumPix = 0;
    let calculatedSumDebito = 0;
    let calculatedSumCredito = 0;
    let calculatedSumDinheiro = 0;

    data.forEach((item) => {
      if (
        item.data >= startDate &&
        item.data <= endDate &&
        item.tipo === "Venda"
      ) {
        calculatedSum += item.subTotal;
      }
      if (
        item.data >= startDate &&
        item.data <= endDate &&
        item.tipo === "Venda" &&
        item.meio === "Pix"
      ) {
        calculatedSumPix += item.subTotalPix;
      }
      if (
        item.data >= startDate &&
        item.data <= endDate &&
        item.tipo === "Venda" &&
        item.meio === "Debito"
      ) {
        calculatedSumDebito += item.subTotalDebito;
      }
      if (
        item.data >= startDate &&
        item.data <= endDate &&
        item.tipo === "Venda" &&
        item.meio === "Credito"
      ) {
        calculatedSumCredito += item.subTotalCredito;
      }
      if (
        item.data >= startDate &&
        item.data <= endDate &&
        item.tipo === "Venda" &&
        item.meio === "Dinheiro"
      ) {
        calculatedSumDinheiro += item.subTotalDinheiro;
      }
    });
    setSum(calculatedSum);
    setSumPix(calculatedSumPix);
    setSumDebito(calculatedSumDebito);
    setSumCredito(calculatedSumCredito);
    setSumDinheiro(calculatedSumDinheiro);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
        <span
          className="absolute top-2 right-2 cursor-pointer bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
          onClick={onClose}
        >
          X
        </span>
        <h2 className="text-2xl font-bold mb-4">Resumo:</h2>
        <div className="mb-4">
          <label className="block mb-1">Data inicial:</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Data final:</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <button
          onClick={calculateSum}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Calcular
        </button>
        <p className="mt-4">Subtotal de vendas: <b> R$ {sum}</b></p>
        <p className="mt-4">Subtotal de vendas Pix: <b>R$ {sumPix}</b></p>
        <p className="mt-4">Subtotal de vendas Débito: <b>R$ {sumDebito}</b></p>
        <p className="mt-4">Subtotal de vendas Crédito: <b>R$ {sumCredito}</b></p>
        <p className="mt-4">Subtotal de vendas Dinheiro: <b>R$ {sumDinheiro}</b></p>
        <p className="mt-4">Despesas: <b>R$ </b></p>
        <p className="mt-4">Total líquido: <b>R$ </b></p>
        <p className="mt-4">Quantidade de itens vendidos :<b></b></p>
        
      </div>
    </div>
  );
};

export default DatabaseSummary;
