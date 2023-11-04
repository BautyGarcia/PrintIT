/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const getPrice = (height: number, width: number, depth: number, volume: number) => {
    const meliSecret = "dA8cJ7xMtpSTe7oBdQV2O32AaakQzR9O"
    const meliId = "154519291358798"
    const redirect_uri = "https://printitweb.vercel.app/"
    const access_token = "APP_USR-154519291358798-110416-16338068b7cdb80555397e99be3b3a1c-200994358"
    //curl -X  GET https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=$APP_ID&state=ABC123&redirect_uri=$REDIRECT_URL

    fetch("https://api.mercadolibre.com/products/search?status=active&site_id=MLA&q=Filamento_PLA_1kg_negro", {
        headers: {
            "Authorization": `Bearer APP_USR-154519291358798-110416-16338068b7cdb80555397e99be3b3a1c-200994358`
        }
    }).then(async (response) => {
        const data = await response.json()
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
}

export default getPrice;