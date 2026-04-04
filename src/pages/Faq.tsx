import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggle = (i: number) => {
        setOpenIndex(openIndex === i ? null : i)
    }

    return (
        <main className="main-content">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="names">all the info</span>
            </motion.h1>

            <section className="faq-section">
                {faqs.map((faq, i) => (
                    <motion.div
                        className="faq-item"
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                    >
                        <div
                            className="faq-question"
                            onClick={() => toggle(i)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle(i) }}
                        >
                            <span>{faq.question}</span>
                            <span className={`faq-chevron ${openIndex === i ? 'open' : ''}`}>
                                &#9662;
                            </span>
                        </div>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <p className="faq-answer">{faq.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </section>
        </main>
    )
}
