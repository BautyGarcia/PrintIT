import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const MercadPagoButton = ({ preferenceId }: { preferenceId: string }) => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_TEST_PK as string);
    return (
        <Wallet initialization={{ preferenceId }} />
    )
}

export default MercadPagoButton;