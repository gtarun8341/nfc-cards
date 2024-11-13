// src/app/components/FAQ.js
"use client"; // Next.js Client Component

const FAQ = ({ faqs }) => {
    return (
        <section className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border p-4 rounded">
                        <h3 className="font-semibold">{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
