const photos = [
  { src: '/assets/DSCF8753.JPG', alt: 'Kalyn and Jack' },
  { src: '/assets/IMG_0756.JPG', alt: 'Kalyn and Jack' },
  { src: '/assets/IMG_7471.JPG', alt: 'Kalyn and Jack' },
  { src: '/assets/DSCF6375.jpg', alt: 'Kalyn and Jack' },
  { src: '/assets/000198080003.JPG', alt: 'Kalyn and Jack' },
]

export default function Photos() {
  return (
    <main className="main-content">
      <h1><span className="names">Kalyn & Jack</span></h1>
      <p className="wedding-details">April 26, 2026</p>

      <section className="photos-section">
        <div className="photo-gallery">
          {photos.map((photo, i) => (
            <div className="photo-item" key={i}>
              <img src={photo.src} alt={photo.alt} />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
