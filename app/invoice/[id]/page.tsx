'use client';
// import InvoiceContainer from "@/components/InvoiceContainer";
import PageHeader from "@/components/PageHeader";
import React from "react";

import dynamic from 'next/dynamic';

const InvoiceContainer = dynamic(() => import('@/components/InvoiceContainer'), {
    ssr: false // This ensures the component is not SSR'd
});

const page = ({ params: { id } }: { params: { id: string } }) => {
    return (
        <div className="cont">
            <PageHeader title="Invoice" />
            <InvoiceContainer id={id} />
        </div>
    );
};

export default page;
