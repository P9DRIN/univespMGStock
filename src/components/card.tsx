interface CardProps{
    name: string;
    value: number;
    paymentByLabel?: boolean
    totalLabel?: boolean
    discountByServiceLabel?: boolean
    finalTotalLabel?: boolean
    className?: string
    totalValueLabel?: boolean
    discountByCharges?: boolean
}


export function Card({name, value, paymentByLabel, totalLabel, finalTotalLabel, discountByServiceLabel, discountByCharges, totalValueLabel, className}: CardProps){
    return(
        <>
        <div className={`${className} p-8 min-h-40 border border-neutral-300 hover:bg-blue-200 hover:border-blue-300 rounded-md flex flex-col justify-around items-center`}>
            <div className="flex flex-col items-center">
            <span className="text-xl text-neutral-500">{name}</span>
            {
                totalValueLabel ? (
                    <span className={`text-5xl ${value > 0 && 'text-green-500'} ${value < 0 && 'text-red-400'} ${value === 0 && 'text-blue-300'} font-semibold flex gap-1 items-end`}><span className="text-sm text-neutral-500">R$</span>{value}</span>
                ) :
                (
                    <span className="text-5xl text-neutral-700 font-semibold flex gap-1 items-end"><span className="text-sm text-neutral-500">R$</span>{value}</span>
                )
            }
            </div>

            {
                paymentByLabel && (
                    <span>Pagamentos efetuados</span>
                ) || 
                totalLabel && (
                    <span>Total arrecadado em vendas</span>
                ) ||
                discountByServiceLabel && (
                    <span>Total por serviço prestado</span>
                ) ||
                finalTotalLabel && (
                    <span>Total Geral</span>
                ) ||
                discountByCharges && (
                    <span>Total por despesas</span>
                )
            }
        </div>
        </>
    )
}