import { Card } from "./card";

interface DetailedRelatoryProps{
    pixValue?: number
    debitValue?: number
    creditValue?: number
    moneyValue?: number
    totalValue?: number
    discountByServiceValue?: number
    discountByCharges?: number
    finalTotalValue?: number

}

export function DetailedRelatory({pixValue, debitValue, creditValue, moneyValue, totalValue, discountByServiceValue, discountByCharges, finalTotalValue}: DetailedRelatoryProps){
    return(
        <>
        <div className="w-full flex flex-col ">

        <div className="w-full flex flex-wrap gap-6  p-8 justify-center">
        <Card name="Pix" value={pixValue || 0} paymentByLabel />
        <Card name="Débito" value={debitValue || 0} paymentByLabel />
        <Card name="Crédito" value={creditValue || 0} paymentByLabel />
        <Card name="Dinheiro" value={moneyValue || 0} paymentByLabel />
        </div>
        <div>
            <Card name="Total" value={totalValue || 0} totalLabel />
        </div>
        <div className="flex w-full justify-center gap-6 p-2">
            <Card name="Serviço prestado" value={discountByServiceValue || 0} discountByServiceLabel />
            <Card name="Desconto de despesas " value={discountByCharges || 0} discountByCharges />
        </div>
        <div className="flex w-full justify-center gap-6 p-2 ">
            <Card name="Total" value={finalTotalValue || 0} totalValueLabel finalTotalLabel className="w-full text-4xl font-bold gap-1" />
        </div>
        </div>

        </>
    )
}