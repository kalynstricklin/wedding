import { motion } from 'framer-motion'

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-inner">
        <div className="flourish">
          <span className="flourish-leaf">&bull;</span>
        </div>
        <h1 className="footer-initials">K & J</h1>
        <p className="footer-date">04.26.2026</p>
      </div>
    </motion.footer>
  )
}

export default Footer
