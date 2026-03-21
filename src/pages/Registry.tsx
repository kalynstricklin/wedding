export default function Registry() {
    return (
        <main className="main-content">
            <h1><span className="names">registry</span></h1>

            <section className="registry-section">
                <div className="registry-links">
                    <a
                        href="https://withjoy.com/kalyn-and-jack-mar-26/registry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="registry-img-link"
                    >
                        <div className="wedding-img">
                            <img src={"/assets/clickus.png"} alt={"kalyn and jack with 'click us to view registry' text"}/>
                        </div>
                    </a>
                </div>


                <p className="details" style={{margin: '1.5rem 0'}}>
                    Rather than doing a formal guestbook at our reception, we would rather collect our family and
                    friends favorite recipes to add to our cookbook! Please take a moment and fill it out!
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
