"use client";
import { Types } from "@requestnetwork/request-client.js";
import { RequestNetwork } from "@requestnetwork/request-client.js";

const useFetchInvoice = () => {
    const requestClientWithoutSignature = new RequestNetwork({
        nodeConnectionConfig: {
            baseURL: process.env.NEXT_PUBLIC_NODE_URL,
        },
    });
    async function fetchUsersInvoice(userAddress: string) {
        ``;
        try {
            const requests = await requestClientWithoutSignature.fromIdentity({
                type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
                value: userAddress,
            });
            const requestDatas = requests.map((request, i) => {
                const data = request.getData();
                const requestStatus =
                    data.expectedAmount ===
                    (data.balance ? data?.balance.balance : "");
                const formattedData = {
                    id: data.requestId,
                    status: requestStatus,
                    amount: data.expectedAmount,
                    receipient_address: data.payee ? data.payee.value : "",
                    donator_address: data.payer ? data.payer.value : "",
                    created_at: data.timestamp,
                };
                return formattedData;
            });
            return requestDatas;
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
            const requestStatus =
                requestData.expectedAmount ===
                (requestData.balance ? requestData?.balance.balance : "");
                // console.log("request data invoice by id: ", requestData);
            const formattedReason = requestData.contentData.reason
                .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":') // Wrap keys in quotes
                .replace(/:\s*([^,}]+)/g, ': "$1"'); // Wrap values in quotes;
                // console.log("formatted reason: ", formattedReason);
            const result = JSON.parse(formattedReason);
            // console.log("result: ", result);
            const formattedData = {
                id: requestData.requestId,
                title: result.reason,
                status: requestStatus,
                amount: requestData.expectedAmount,
                receipient_address: requestData.payee
                    ? requestData.payee.value
                    : "",
                donator_address: requestData.payer
                    ? requestData.payer.value
                    : "",
                created_at: requestData.timestamp,
                contractAddress: result.contract,
            };
            // console.log(`request data invoice by id: `, formattedData);
            return formattedData;
            // console.log(`request data invoice by id: ${JSON.stringify(requestData)}`);
        } catch (error) {
            console.log("Error getting invoice by id: ", error);
        }
    }

    return { fetchUsersInvoice, fetchInvoiceById };
};

export default useFetchInvoice;
