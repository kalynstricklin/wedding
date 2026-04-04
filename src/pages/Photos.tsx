import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ceremonyPhotos = [
    'DSCF0259.JPEG', 'DSCF0309.JPEG', 'DSCF0146.JPEG',
    'DSCF0574.JPEG', 'IMG_6094.JPG', 'IMG_6106.JPG'
].map((f) => ({ src: `/assets/ceremoney/${f}`, alt: 'Kalyn and Jack' }))

const allPhotos = [...ceremonyPhotos]

export default function Photos() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    const close = useCallback(() => setLightboxIndex(null), [])

    const prev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + allPhotos.length) % allPhotos.length : null)), [])

    const next = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % allPhotos.length : null)), [])

    useEffect(() => {
        if (lightboxIndex === null) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
        }
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
        }
    }, [lightboxIndex, close, prev, next])

    return (
        <main className="main-content">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="names">photos</span>
            </motion.h1>

            <section className="photos-section">
                <div className="photo-gallery">
                    {allPhotos.map((photo, i) => (
                        <motion.div
                            className="photo-item"
                            key={i}
                            onClick={() => setLightboxIndex(i)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <img src={photo.src} alt={photo.alt} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        className="lightbox-overlay"
                        onClick={close}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="lightbox-close" onClick={close} aria-label="Close">&times;</button>
                        <button
                            className="lightbox-arrow lightbox-prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                prev()
                            }}
                            aria-label="Previous"
                        >
                            &#8249;
                        </button>
                        <motion.div
                            className="lightbox-content"
                            onClick={(e) => e.stopPropagation()}
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img src={allPhotos[lightboxIndex].src} alt={allPhotos[lightboxIndex].alt} />
                        </motion.div>
                        <button
                            className="lightbox-arrow lightbox-next"
                            onClick={(e) => {
                                e.stopPropagation();
                                next()
                            }}
                            aria-label="Next"
                        >
                            &#8250;
                        </button>
                        <div className="lightbox-counter">
                            {lightboxIndex + 1} / {allPhotos.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
