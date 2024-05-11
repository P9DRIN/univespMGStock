import { Card } from "../components/card"



export function Dashboard(){
    return(
        <>
        <div className="bg-neutral-100 h-full w-full">
        <h2 className="text-lg font-semibold bg-gray-200 p-4 drop-shadow">Relatório</h2>
        <div className="w-full bg-gray-100 p-4 ">
            <form className="flex gap-4 w-full justify-end">
            <div className="flex justify-center items-center gap-4">
            <label className="flex flex-col items-start justify-start ">
            <span className="text-xs">
                Digite o total de despesas:
            </span>
            <input
              required
                className="border px-2 py-1 rounded"
              />
            </label>
            
            <label className="flex flex-col items-start justify-start ">
                <span className="text-xs">
                Selecione o intervalo de datas:
                </span>
            <select
             className="border rounded   py-1 drop-shadow">
             <option >
                Selecione uma opção...
             </option>
             
           </select>
           </label>
            
            </div>

        <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 drop-shadow-lg">
            Gerar Relatório
            </button>
            </form>
        </div>
        </div>
        <div className="w-full flex flex-wrap gap-6 border p-8 justify-center">
        <Card name="Pix" value={300} paymentByLabel />
        <Card name="Débito" value={300} paymentByLabel />
        <Card name="Crédito" value={300} paymentByLabel />
        <Card name="Dinheiro" value={300} paymentByLabel />
        </div>
        </>
    )
}