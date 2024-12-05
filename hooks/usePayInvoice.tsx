"use client";
import { toast } from "sonner";
import { hasSufficientFunds, payRequest } from "@requestnetwork/payment-processor";
import { useActiveAccount } from "thirdweb/react";
import { RequestNetwork } from "@requestnetwork/request-client.js";
import { providers } from "ethers";

const usePayInvoice = ({payerIdentity}: {payerIdentity: string}) => {
    const account = useActiveAccount();

    const requestClientWithoutSignature = new RequestNetwork({
        nodeConnectionConfig: {
            baseURL: process.env.NEXT_PUBLIC_NODE_URL,
        },
    });
    async function payInvoice(invoiceId: string) {
        if (account && window.ethereum) {
            const provider = new providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const request = await requestClientWithoutSignature.fromRequestId(
                invoiceId
            );
            const requestData = request.getData();
            console.log("gotten request data: ", requestData);

            // check if user has sufficient funds
            toast(`Checking if user has sufficient funds...`);
            console.log(
                `Checking if payer ${payerIdentity} has sufficient funds...`
            );
            const _hasSufficientFunds = await hasSufficientFunds({
                request: requestData,
                address: payerIdentity,
                providerOptions: {
                    provider: provider,
                },
            });

            console.log(`_hasSufficientFunds = ${_hasSufficientFunds}`);

            if (_hasSufficientFunds) {
                // user has sufficient funds proceed with payment
                // add modal to show user has suffiecient funds
                toast.success("User has sufficient funds");
                console.log("user has sufficient funds");
                // proceed with payment
                try {
                    const paymentTx = await payRequest(requestData, signer);
                    await paymentTx.wait(2);
                    toast.success("Payment complete");
                    console.log(`Payment complete. ${paymentTx.hash}`);
                    if (paymentTx.hash) {
                        toast.success("Payment complete");
                        console.log(`Payment complete. ${paymentTx.hash}`);
                    }
                } catch (error) {
                    toast.error("Payment error");
                    console.log("payment error: ", error);
                }
            } else if (!_hasSufficientFunds) {
                // user doesn't have sufficient funds
                // show toast
                toast.error("User does not have sufficient funds");
                console.log("user does not have sufficient funds");
            }
        } else {
            toast.error("Please connect your wallet");
            console.log("Please connect your wallet");
        }
    }

    return { payInvoice };
}

export default usePayInvoice