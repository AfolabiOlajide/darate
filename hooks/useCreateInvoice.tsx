"use client";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { Types, Utils } from "@requestnetwork/request-client.js";
import { ethers, providers } from "ethers";
import { toast } from "sonner";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { ICreateRequestParameters } from "@requestnetwork/request-client.js/dist/types";
import { RequestNetwork } from "@requestnetwork/request-client.js";
import useContract from "./useContract";
import { prepareContractCall } from "thirdweb";
import { useEffect } from "react";

type useRequestProps = {
    recieverIdentity: string;
    payerIdentity: string;
    amountToBePaid: string;
    contractAddress: string;
};

const useCreateInvoice = ({
    recieverIdentity,
    payerIdentity,
    amountToBePaid,
    contractAddress
}: useRequestProps) => {
    const account = useActiveAccount();
    const {contract} = useContract({address: recieverIdentity});
    const { mutate: sendTransaction, isPending, isError, isSuccess } = useSendTransaction();
    
    const saveInvoiceId = (invoiceId: string) => {
        const transaction = prepareContractCall({
            contract,
            method: "function addInvoiceId(string _invoiceId)",
            params: [invoiceId],
        });
        sendTransaction(transaction);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success("Invoice Id saved successfully");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error("Error saving invoice Id");
        }
    }, [isError]);

    // fee reciepient is who recieves the fee for each transaction (like collecting 1% platform fees)
    const feeRecipient = process.env.NEXT_PUBLIC_FEE_RECIPIENT;
    // calcluate platform fees and new amount to be paid
    // const feePercentage = 0.1 / 100; // 0.1% fee per transaction
    // const feeAmount = parseFloat(amountToBePaid) * feePercentage;
    // const newAmountToBePaid = parseFloat(amountToBePaid) - feeAmount;

    // construct request parameters
    const createRequestParameters = {
        requestInfo: {
            // The currency in which the request is denominated
            currency: {
                type: Types.RequestLogic.CURRENCY.ETH,
                // value: "0x370DE27fdb7D1Ff1e1BaA7D11c5820a324Cf623C",
                value: "eth",
                network: "sepolia",
            },

            // The expected amount as a string, in parsed units, respecting `decimals`
            // Consider using `parseUnits()` from ethers or viem
            expectedAmount: amountToBePaid.length > 0 ? ethers.utils
                .parseEther(amountToBePaid.toString())
                .toString() : "",

            // The payee identity. Not necessarily the same as the payment recipient.
            // Reciever Identity
            payee: {
                type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
                value: recieverIdentity,
            },

            // The payer identity. If omitted, any identity can pay the request.
            payer: {
                type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
                value: payerIdentity,
            },

            // The request creation timestamp.
            timestamp: Utils.getCurrentTimestampInSecond(),
        },
        // The identity that signs the request, either payee or payer identity.
        signer: {
            type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
            value: payerIdentity,
        },

        // The paymentNetwork is the method of payment and related details.
        paymentNetwork: {
            id: Types.Extension.PAYMENT_NETWORK_ID.ETH_FEE_PROXY_CONTRACT,
            parameters: {
                paymentNetworkName: "sepolia",
                paymentAddress: recieverIdentity,
                feeAddress: feeRecipient,
                feeAmount: "0",
                // feeAmount: ethers.utils
                //     .parseEther(feeAmount.toString())
                //     .toString(),
            },
        },

        // The contentData can contain anything.
        // Consider using rnf_invoice format from @requestnetwork/data-format
        contentData: {
            reason: "This is test request",
        },
    };

    async function createInvoice() {
        if (!account) {
            toast.error("Please connect your wallet");
            return;
        }
        if (window.ethereum) {
            const provider = new providers.Web3Provider(window.ethereum);

            const web3SignatureProvider = new Web3SignatureProvider(
                provider.provider
            );
            console.log("Creating request client....");
            toast("Creating Request client....");
            const requestClient = new RequestNetwork({
                nodeConnectionConfig: {
                    baseURL: process.env.NEXT_PUBLIC_NODE_URL,
                },
                signatureProvider: web3SignatureProvider,
            });
            try {
                const request = await requestClient.createRequest(
                    createRequestParameters as ICreateRequestParameters
                );
                const confirmedRequestData =
                    await request.waitForConfirmation();
                // console.log(
                //     `Created Request: ${JSON.stringify(confirmedRequestData)}`
                // );
                console.log("requestId: ", confirmedRequestData.requestId);
                if (confirmedRequestData.requestId) {
                    const invoiceId = confirmedRequestData.requestId;
                    toast.success("Invoice Id created successfully");
                    toast("Saving Invoice Id on the blockchain...");
                    saveInvoiceId(invoiceId);
                }
            } catch (error) {
                toast.error("Error creating invoice");
                console.log("request error: ", error);
            }
        } else {
            toast.error("Please install metamask");
        }
    }

    return { createInvoice };
};

export default useCreateInvoice;
