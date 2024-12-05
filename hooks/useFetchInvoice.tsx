"use client"
import { Types, Utils } from "@requestnetwork/request-client.js";
import { RequestNetwork } from "@requestnetwork/request-client.js";

const useFetchInvoice = () => {
    const requestClientWithoutSignature = new RequestNetwork({
        nodeConnectionConfig: {
            baseURL: process.env.NEXT_PUBLIC_NODE_URL,
        },
    });
    async function fetchUsersInvoice(userAddress: string) {``
        try {
            const requests = await requestClientWithoutSignature.fromIdentity({
                type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
                value: userAddress,
            });
            const requestDatas = requests.map((request, i) => {
                const data = request.getData()
                console.log(`request data ${i+1}: ${JSON.stringify(data)}`);
            });
        } catch (error) {
            console.log("Error getting user invoice: ", error);
        }
    }
    

    return { fetchUsersInvoice }
}

export default useFetchInvoice