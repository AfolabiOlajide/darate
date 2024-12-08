"use client";
import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function Faq() {
    const [faqs, setFaqs] = useState([
        {
            question: "How many organizations can I create",
            answer:
                "You can olny create one organization per account, but you can create as many campaigns as you want.",
            open: true
        },
        {
            question: "How can i add the Sepolia Network to my metamask",
            answer: "Go to Chainlist.org then connect to your metamask wallet, search for Sepolia with chain id 11155111 and then click to add to metamask",
            open: false
        },
        {
            question:
                "Is there a limit to the number of campaigns I can create.",
            answer: "No, there is no limit, you can create as many campaigns as you want.",
            open: false
        },
        {
            question: "Are we paying a fee to use this platform",
            answer: "The platform is free for everyone to use.",
            open: false
        },
        {
            question: "I love this platform, how do I donate towards the growth",
            answer: "Navigate to the organization page and you'll see an organization named Darate you can donate to that oragnization.",
            open: false
        }
    ]);

    const toggleFAQ = (index: number) => {
        setFaqs(
            faqs.map((faq, i) => {
                if (i === index) {
                faq.open = !faq.open;
                } else {
                faq.open = false;
                }
        
                return faq;
            })
            );
        };

    return (
        <div className='mt-[6rem] cont'>
            <h1 className='text-3xl lg:text-5xl font-medium text-center my-6'>Frequently Asked Questions</h1>
            <p className='mb-12 text-center text-neutral-300'>What questions do you have in your mind, browse through our most asked questions</p>
            {/* faqs */}
            <div className="flex flex-col space-y-6">
                { faqs.map((faq, i) => (
                    <div className="rounded-xl bg-dark shadow-lg shadow-brand/10" key={i}>
                        <div className={`question ${faq.open ? "" : ""}  p-6 flex gap-4 justify-between items-center cursor-pointer`} onClick={() => toggleFAQ(i)}  >
                            <h1 className="font-bold text-brand" onClick={() => toggleFAQ(i)}>{faq.question}</h1>
                            {faq.open ? <AiOutlineMinus className='text-brand cursor-pointer'  /> : <AiOutlinePlus className='text-brand cursor-pointer' />}
                        </div>
                        <div className={`answer ${faq.open? "block" : "hidden"} bg-brand/15 rounded-bl-xl rounded-br-xl`}>
                            <p className='text-neutral-400 p-6'>{faq.answer}</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default Faq;