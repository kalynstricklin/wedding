import {useCallback, useEffect, useState} from 'react'

const ceremonyPhotos = [
    'DSCF0259.JPEG', 'DSCF0309.JPEG', 'DSCF0146.JPEG',
    'DSCF0574.JPEG', 'IMG_6094.JPG', 'IMG_6106.JPG'
].map((f) => ({src: `/assets/ceremoney/${f}`, alt: 'Kalyn and Jack'}))

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
            {/*<h1><span className="names">Kalyn & Jack</span></h1>*/}
            {/*<p className="wedding-details">April 26, 2026</p>*/}

            <section className="photos-section">
                {/*<h2 className="script">ceremony</h2>*/}
                <div className="photo-gallery">
                    {allPhotos.map((photo, i) => (
                        <div className="photo-item" key={i} onClick={() => setLightboxIndex(i)}>
                            <img src={photo.src} alt={photo.alt}/>
                        </div>
                    ))}
                </div>

            </section>

            {lightboxIndex !== null && (
                <div className="lightbox-overlay" onClick={close}>
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
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={allPhotos[lightboxIndex].src} alt={allPhotos[lightboxIndex].alt}/>
                    </div>
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
                </div>
            )}
        </main>
    )
}
