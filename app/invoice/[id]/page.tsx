import InvoiceContainer from "@/components/InvoiceContainer";
import PageHeader from "@/components/PageHeader";
import React from "react";

const page = ({ params: { id } }: { params: { id: string } }) => {
    return (
        <div className="cont">
            <PageHeader title="Invoice" />
            <InvoiceContainer id={id} />
        </div>
    );
};

export default page;
