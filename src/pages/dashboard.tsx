import { DetailedRelatory } from "@/components/detailed-relatory"
import { GeralRelatory } from "@/components/geral-relatory"
import { ProductsContext } from "@/contexts/ProductsContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { CaretLeft } from "phosphor-react"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import * as z from 'zod'

const generateRelatorySchema = z.object({
    charge: z.string(),
    startDate: z.string(),
    endDate: z.string()
})

type GenerateRelatoryDataInputs = z.infer<typeof generateRelatorySchema>

export function Dashboard(){

    const [isDetailedRelatory, setIsDetailedRelatory] = useState(false)
    const [detailedProduct, setDetailedProduct] = useState<GenerateRelatoryDataInputs | null>(null)

    const { handleSubmit, register } = useForm<GenerateRelatoryDataInputs>({
        resolver: zodResolver(generateRelatorySchema),
        defaultValues: {
            charge: '0',
        }
    })

    function formatDate(date: string) {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    }

    const { products } = useContext(ProductsContext)

    const pixValue = products.filter(product => product.saleType === "pix").reduce((acc, product) => acc + product.price!, 0)
    const debitValue = products.filter(product => product.saleType === "debit").reduce((acc, product) => acc + product.price!, 0)
    const creditValue = products.filter(product => product.saleType === "credit").reduce((acc, product) => acc + product.price!, 0)
    const moneyValue = products.filter(product => product.saleType === "money").reduce((acc, product) => acc + product.price!, 0)
    const totalValue = pixValue + debitValue + creditValue + moneyValue
    const discountByServiceValue = 1550
    const finalTotalValue = totalValue 

    const pixValueWithDate = products.filter(product => {
        if (product.saleType !== "pix") return false;
      
        const postDate = new Date(product.postDate!);
        const startDate = new Date(detailedProduct?.startDate || '');
        const endDate = new Date(detailedProduct?.endDate || '');
        endDate.setDate(endDate.getDate() + 1);

        if (endDate.getDate() === 1) {
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(1);
        }
        const finalDate = new Date(endDate);
        console.log(finalDate)

        return postDate >= startDate && postDate <= finalDate;
      }).reduce((acc, product) => acc + product.price!, 0);
      
      const debitValueWithDate = products.filter(product => {
        if (product.saleType !== "debit") return false;
      
        const postDate = new Date(product.postDate!);
        const startDate = new Date(detailedProduct?.startDate || '');
        const endDate = new Date(detailedProduct?.endDate || '');
        endDate.setDate(endDate.getDate() + 1);

        if (endDate.getDate() === 1) {
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(1);
        }
        const finalDate = new Date(endDate);
        console.log(finalDate)

        return postDate >= startDate && postDate <= finalDate;
      }).reduce((acc, product) => acc + product.price!, 0);

      const creditValueWithDate = products.filter(product => {
        if (product.saleType !== "credit") return false;
      
        const postDate = new Date(product.postDate!);
        const startDate = new Date(detailedProduct?.startDate || '');
        const endDate = new Date(detailedProduct?.endDate || '');
        endDate.setDate(endDate.getDate() + 1);

        if (endDate.getDate() === 1) {
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(1);
        }
        const finalDate = new Date(endDate);
        console.log(finalDate)

        return postDate >= startDate && postDate <= finalDate;
      }).reduce((acc, product) => acc + product.price!, 0);

      const moneyValueWithDate = products.filter(product => {
        if (product.saleType !== "money") return false;
      
        const postDate = new Date(product.postDate!);
        const startDate = new Date(detailedProduct?.startDate || '');
        const endDate = new Date(detailedProduct?.endDate || '');
        endDate.setDate(endDate.getDate() + 1);

        if (endDate.getDate() === 1) {
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(1);
        }
        const finalDate = new Date(endDate);
        console.log(finalDate)

        return postDate >= startDate && postDate <= finalDate;
      }).reduce((acc, product) => acc + product.price!, 0);

      const totalWithDate = pixValueWithDate + debitValueWithDate + creditValueWithDate + moneyValueWithDate


    const finalTotalValueWithCharges = finalTotalValue - parseInt(detailedProduct?.charge || '0')

    async function handleGenerateRelatory(data: GenerateRelatoryDataInputs){
        setIsDetailedRelatory(true)
        setDetailedProduct(data)
    }

    return(
        <>
        <div className="bg-neutral-100 h-full w-full">
        <div className="text-lg font-semibold bg-gray-200 p-4 drop-shadow w-full flex gap-2 items-center">
        <Link to="/">
                <CaretLeft size={32} className="hover:text-blue-500"/>
        </Link>
            <span>Relatório</span>
        </div>
        <div className="w-full bg-gray-100 p-4 ">
            <form className="flex gap-4 w-full justify-between items-center" action="" onSubmit={handleSubmit(handleGenerateRelatory)}>

                <span className="text-md text-neutral-800 font-medium">Vendo agora de: 
                <b className="text-blue-500 font-semibold"> {detailedProduct?.startDate && detailedProduct?.endDate ? `${formatDate(detailedProduct.startDate)} até ${formatDate(detailedProduct.endDate)}` : 'Relatório Geral'}
                    </b> <span className="text-neutral-400 font-light">{isDetailedRelatory ? '' : '(sem despesas)'}</span></span>
                <div className="flex items-center gap-4">

            <div className="flex items-center justify-center gap-4">
            <label className="flex flex-col items-start justify-start ">
            <span className="text-xs">
                Digite o total de despesas:
            </span>
            <input
                type="text"
                className="border px-2 py-1 rounded"
                {...register('charge')}
              />
            </label>
            
            <label className="flex flex-col items-start justify-start ">
                <span className="text-xs">
                Selecione o intervalo de datas:
                </span>
                <div className="flex gap-2">

            <input
            type="date"
            placeholder="Selecione uma opção..."
            className="border rounded   p-1 px-2 drop-shadow"
            {...register('startDate')}
            />
             
           <input 
           type="date"
            className="border rounded   p-1 px-2 drop-shadow"
            placeholder="Selecione uma opção..."
            {...register('endDate')}
            />

             </div>

           </label>
            
            </div>

        <button
            className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 drop-shadow-lg " type="submit">
            Gerar Relatório
            </button>
            </div>

            </form>
        </div>
        </div>
        <div>
            {
                isDetailedRelatory ? 
                (
                    <DetailedRelatory pixValue={pixValueWithDate} debitValue={debitValueWithDate} creditValue={creditValueWithDate} moneyValue={moneyValueWithDate} totalValue={totalWithDate} discountByServiceValue={discountByServiceValue} finalTotalValue={finalTotalValueWithCharges} discountByCharges={parseInt(detailedProduct?.charge || '') }/>
                )
                : (
                    <GeralRelatory pixValue={pixValue} debitValue={debitValue} creditValue={creditValue} discountByServiceValue={discountByServiceValue} totalValue={totalValue} finalTotalValue={finalTotalValue}/>
                )
            }
           
        </div>
        </>
    )
}