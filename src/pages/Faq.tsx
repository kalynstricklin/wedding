const faqs = [
    {
        question: 'What should I RSVP by?',
        answer: 'Please RSVP by April 8th so we can save you a seat at the reception! If you have any questions you can email us at kalynandjack@aol.com',
    },
    {
        question: 'What should I wear?',
        answer: "Dressy Casual. Wear something you'd be comfortable in for a spring evening in the gardens.",
    },
    {
        question: 'Can I bring a date or plus one?',
        answer: 'Due to limited space, we can only accommodate guests whose names appear on the invitation.',
    },
    {
        question: 'Is the venue indoors or outdoors?',
        answer: "The reception is at the Grisham Pavilion in Huntsville Botanical Gardens, which is a covered outdoor space. We recommend dressing for a spring evening\u2014it may be warm, so light layers are a good idea.",
    },
    {
        question: 'Is there parking at the venue?',
        answer: 'Yes! Free parking is available at the Huntsville Botanical Gardens. Follow signs to the Grisham Pavilion parking area.',
    },
    {
        question: 'What time should I arrive?',
        answer: 'Please arrive by 4:00 PM. The celebration will run until 7:00 PM.',
    },
    {
        question: 'Will there be food and drinks?',
        answer: "Yes! There will be food and drinks available throughout the reception.",
    },
]

export default function Faq() {
    return (
        <main className="main-content">
            <section className="faq-section">
                {faqs.map((faq, i) => (
                    <div className="faq-item" key={i}>
                        <p className="faq-question">{faq.question}</p>
                        <p className="faq-answer">{faq.answer}</p>
                    </div>
                ))}
            </section>
        </main>
    )
}
