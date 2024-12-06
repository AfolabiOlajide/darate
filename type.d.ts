type InvoiceDetailType = {
    id: string;
    title: string;
    status: boolean;
    amount: string;
    receipient_address: string;
    donator_address: string;
    created_at: number;
}

type InvoiceTableType = {
    id: string;
    status: boolean;
    amount: string;
    receipient_address: string;
    donator_address: string;
    created_at: number;
}