import { FormEvent, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API_URL = 'https://api.kalynandjack.love'

interface GuestData {
    id: number
    first_name: string
    last_name: string
    email: string | null
    address: string | null
    is_attending: boolean | null
}

const CONFETTI_COLORS = ['#5a7a56', '#758fb2', '#c5d4c0', '#97aac4', '#f7f5f0', '#d4a574']

function Confetti() {
    const [pieces] = useState(() =>
        Array.from({ length: 40 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 2 + Math.random() * 2,
            color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
            size: 6 + Math.random() * 8,
        }))
    )

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 4500)
        return () => clearTimeout(timer)
    }, [])

    if (!visible) return null

    return (
        <div className="confetti-container">
            {pieces.map((p) => (
                <div
                    key={p.id}
                    className="confetti-piece"
                    style={{
                        left: `${p.left}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        backgroundColor: p.color,
                        width: p.size,
                        height: p.size,
                    }}
                />
            ))}
        </div>
    )
}

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export default function Rsvp() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [lookupMessage, setLookupMessage] = useState('')
    const [lookupLoading, setLookupLoading] = useState(false)

    const [guestData, setGuestData] = useState<GuestData | null>(null)
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [attendance, setAttendance] = useState('')
    const [formMessage, setFormMessage] = useState('')
    const [formMessageType, setFormMessageType] = useState<'success' | 'error' | ''>('')
    const [submitLoading, setSubmitLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleLookup = async () => {
        if (!firstName.trim() || !lastName.trim()) {
            setLookupMessage('Please enter both first and last name.')
            return
        }

        try {
            setLookupLoading(true)
            setLookupMessage('')

            const response = await fetch(
                `${API_URL}/rsvp/lookup?first_name=${encodeURIComponent(firstName.trim())}&last_name=${encodeURIComponent(lastName.trim())}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                }
            )

            if (response.ok) {
                const data: GuestData = await response.json()
                setGuestData(data)
                if (data.email) setEmail(data.email)
                if (data.address) setAddress(data.address)
                if (data.is_attending !== null && data.is_attending !== undefined) {
                    setAttendance(data.is_attending.toString())
                }
            } else if (response.status === 404) {
                setLookupMessage("We couldn't find your invitation. Please check your name and try again.")
            } else {
                throw new Error('Failed to find invitation')
            }
        } catch {
            setLookupMessage('Something went wrong. Please try again.')
        } finally {
            setLookupLoading(false)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!guestData) return

        const formData = {
            first_name: guestData.first_name,
            last_name: guestData.last_name,
            email,
            address: address || null,
            is_attending: attendance === 'true',
        }

        try {
            setSubmitLoading(true)
            const response = await fetch(`${API_URL}/rsvp/${guestData.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setFormMessage("Thank you for your RSVP! Don't forget to add a recipe to our cookbook on the Registry page!")
                setFormMessageType('success')
                setSubmitted(true)
            } else {
                throw new Error('Failed to submit RSVP')
            }
        } catch {
            setFormMessage('Something went wrong. Please try again.')
            setFormMessageType('error')
        } finally {
            setSubmitLoading(false)
        }
    }

    return (
        <main className="main-content">
            <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.5 }}
            >
                <span className="names">rsvp</span>
            </motion.h1>
            <motion.p
                className="wedding-details"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.1, duration: 0.5 }}
            >
                April 26, 2026
            </motion.p>

            <section className="rsvp-section">
                <AnimatePresence mode="wait">
                    {!guestData ? (
                        <motion.div
                            key="lookup"
                            className="invitation-form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="invitation-group">
                                <label htmlFor="first_name" className="details">First Name</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="invitation-group">
                                <label htmlFor="last_name" className="details">Last Name</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>

                            <p className="details" style={{ margin: '1.5rem 0' }}>
                                Due to limited space, attendance is reserved for those on our guest list. Please enter your
                                name to find your invitation.
                            </p>

                            <div className="rsvp-link">
                                <button
                                    className="invite-btn"
                                    onClick={handleLookup}
                                    disabled={lookupLoading}
                                >
                                    {lookupLoading ? 'Finding Invitation...' : 'Find your invitation'}
                                </button>
                            </div>

                            {lookupMessage && (
                                <motion.p
                                    className="details error-message"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {lookupMessage}
                                </motion.p>
                            )}
                        </motion.div>
                    ) : submitted ? (
                        <motion.div
                            key="success"
                            className="invitation-form"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Confetti />
                            <p className={`details ${formMessageType === 'success' ? 'success-message' : 'error-message'}`}>
                                {formMessage}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            className="rsvp-form invitation-form"
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <p className="details" style={{ marginBottom: '1.5rem' }}>
                                Welcome, {guestData.first_name}! Please complete your RSVP below.
                            </p>

                            <div className="form-group">
                                <label htmlFor="email" className="details">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address" className="details">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="attendance" className="details">Will you be attending?</label>
                                <select
                                    id="attendance"
                                    value={attendance}
                                    onChange={(e) => setAttendance(e.target.value)}
                                    required
                                >
                                    <option value="">Select an option</option>
                                    <option value="true">Yes, I will be there</option>
                                    <option value="false">No, I cannot make it</option>
                                </select>
                            </div>

                            <div className="rsvp-link">
                                <button type="submit" className="submit-btn" disabled={submitLoading}>
                                    {submitLoading ? 'Submitting...' : 'Submit RSVP'}
                                </button>
                            </div>

                            {formMessage && (
                                <motion.p
                                    className={`details ${formMessageType === 'success' ? 'success-message' : 'error-message'}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {formMessage}
                                </motion.p>
                            )}
                        </motion.form>
                    )}
                </AnimatePresence>
            </section>
        </main>
    )
}
