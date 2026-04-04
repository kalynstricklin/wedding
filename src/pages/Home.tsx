import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const RECEPTION_DATE = new Date('2026-04-26T16:00:00-05:00')

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

function getTimeLeft(target: Date) {
  const now = new Date().getTime()
  const diff = target.getTime() - now

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    passed: false,
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' as const },
  }),
}

function Flourish() {
  return (
    <div className="flourish">
      <span className="flourish-leaf">&bull;</span>
    </div>
  )
}

export default function Home() {
  const countdown = useCountdown(RECEPTION_DATE)

  return (
    <main className="main-content">
      <motion.h1
        initial="hidden"
        animate="visible"
        custom={0}
        variants={fadeUp}
      >
        <span className="names">Kalyn & Jack</span>
      </motion.h1>

      <motion.div
        className="wedding-img ken-burns"
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
      >
        <img src="/assets/engagement/IMG_14.jpg" alt="Kalyn and Jack" />
      </motion.div>

      <Flourish />

      <motion.section
        className="wedding-day"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        custom={0}
        variants={fadeUp}
      >
        <p className="script">we got married!</p>
        <p className="wedding-details">March 16, 2026</p>
        <div className="venue-name">San Francisco City Hall</div>
        <div className="address-line">San Francisco, CA</div>
      </motion.section>

      <Flourish />

      <motion.section
        className="wedding-day"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        custom={1}
        variants={fadeUp}
      >
        <p className="script">join us for the reception</p>
        <p className="wedding-details">Sunday, April 26, 2026, 4 - 7 PM</p>
        <div className="venue-name">Grisham Pavilion</div>
        <div className="venue-name-sub">Huntsville Botanical Gardens</div>
        <div className="address-line">4747 Bob Wallace Avenue</div>
        <div className="address-line">Huntsville, AL 35805</div>

        {!countdown.passed && (
          <motion.div
            className="countdown-timer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="countdown-unit">
              <span className="countdown-number">{countdown.days}</span>
              <span className="countdown-label">days</span>
            </div>
            <div className="countdown-unit">
              <span className="countdown-number">{countdown.hours}</span>
              <span className="countdown-label">hours</span>
            </div>
            <div className="countdown-unit">
              <span className="countdown-number">{countdown.minutes}</span>
              <span className="countdown-label">min</span>
            </div>
            <div className="countdown-unit">
              <span className="countdown-number">{countdown.seconds}</span>
              <span className="countdown-label">sec</span>
            </div>
          </motion.div>
        )}
      </motion.section>
    </main>
  )
}
