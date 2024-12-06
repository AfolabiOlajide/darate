"use client"
import { Types } from "@requestnetwork/request-client.js";
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
                console.log(`request data invoice by address ${i+1}: ${JSON.stringify(data)}`);
            });
        } catch (error) {
            console.log("Error getting user invoice: ", error);
        }
    }

    async function fetchInvoiceById(invoiceId: string) {
        try {
            const request = await requestClientWithoutSignature.fromRequestId(
                invoiceId
            );
            const requestData = request.getData();
            const requestStatus = requestData.expectedAmount === ( requestData.balance ? requestData?.balance.balance : "")
            const formattedData = {
                id: requestData.requestId,
                title: requestData.contentData.reason,
                status: requestStatus,
                amount: requestData.expectedAmount,
                receipient_address: (requestData.payee ? requestData.payee.value : ""),
                donator_address: (requestData.payer ? requestData.payer.value : ""),
                created_at: requestData.timestamp,
            }
            // console.log(`request data invoice by id: `, formattedData);
            return formattedData
            // console.log(`request data invoice by id: ${JSON.stringify(requestData)}`);
        } catch (error) {
            console.log("Error getting invoice by id: ", error);
        }
    }    

    return { fetchUsersInvoice, fetchInvoiceById }
}

export default useFetchInvoice