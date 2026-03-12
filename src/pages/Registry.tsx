export default function Registry() {
  return (
    <main className="main-content">
      <h1><span className="names">Kalyn & Jack</span></h1>
      <p className="wedding-details">April 26, 2026</p>

      <section className="registry-section">
        <p className="details">
            Your presence is gift enough, but if you're feeling particularly generous, we have registered for a few items that would help us begin our life together.
        </p>

        <div className="registry-links">
          <a
            href="https://withjoy.com/kalyn-and-jack-mar-26/registry"
            target="_blank"
            rel="noopener noreferrer"
            className="registry-btn"
          >
            Wedding Registry
          </a>
        </div>

        <div className="registry-links">
          <a
            href="https://www.ikea.com/us/en/gift-registry/guest/?id=a3d115c6-eee8-4d5c-9e6d-a1846d42cc08&ranMID=53901&ranEAID=TnL5HPStwNw&ranSiteID=TnL5HPStwNw-ToeaY48tMEblnzSVrnm0vw"
            target="_blank"
            rel="noopener noreferrer"
            className="registry-btn"
          >
            Ikea Registry
          </a>
        </div>

          <p className="details" style={{ margin: '1.5rem 0' }}>
              Rather than doing a formal guestbook at our reception, we would rather collect our family and friends favorite recipes to add to our cookbook! Please take a moment and fill it out!
          </p>

          <div className="registry-links">
              <a
                  href="https://docs.google.com/presentation/d/1L5owO5KisyC4I4WzwjJv6Vz5WJyt5TRd7ShFeS5Afms/edit?slide=id.g3cddfb4786c_0_1&pli=1#slide=id.g3cddfb4786c_0_1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="registry-btn"
              >
                  Add to our Cookbook
              </a>
          </div>
      </section>
    </main>
  )
}
