interface CardProps{
    name: string;
    value: number;
    paymentByLabel?: boolean
}


export function Card({name, value, paymentByLabel}: CardProps){
    return(
        <>
        <div className="p-8 min-h-64 min-w-64 border border-neutral-300 hover:bg-blue-200 hover:border-blue-300 rounded-md flex flex-col justify-around items-center">
            <div className="flex flex-col items-center">
            <span className="text-xl text-neutral-500">{name}</span>
            <span className="text-5xl text-neutral-700 font-semibold">{value}</span>
            </div>

            {
                paymentByLabel && (
                    <span>Pagamentos efetuados</span>
                )
            }
        </div>
        </>
    )
}