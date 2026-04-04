import { motion } from 'framer-motion'

export default function Registry() {
    return (
        <main className="main-content">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="names">registry</span>
            </motion.h1>

            <section className="registry-section">
                <motion.div
                    className="registry-links"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <a
                        href="https://withjoy.com/kalyn-and-jack-mar-26/registry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="registry-img-link floating"
                    >
                        <div className="wedding-img">
                            <img src={"/assets/clickus.png"} alt={"kalyn and jack with 'click us to view registry' text"} />
                        </div>
                    </a>
                </motion.div>
            </section>
        </main>
    )
}
