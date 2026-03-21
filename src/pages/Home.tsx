import {Link} from 'react-router-dom'

export default function Home() {
    return (
        <main className="main-content">
            <h1>
                <span className="names">Kalyn & Jack</span>
            </h1>

            <div className="wedding-img">
                <img src="/assets/engagement/IMG_14.jpg" alt="Kalyn and Jack"/>
            </div>

            <section className="wedding-day">
                <p className="script">wedding details</p>
                <p className="wedding-details">Monday, March 16, 2026</p>
                <div className="venue-name">San Francisco City Hall</div>
                <div className="address-line">San Francisco, CA</div>
            </section>

            <section className="wedding-day">
                <p className="script">reception details</p>
                <p className="wedding-details">Sunday, April 26, 2026, 4 - 7 PM</p>
                <div className="venue-name">Grisham Pavilion</div>
                <div className="venue-name-sub">Huntsville Botanical Gardens</div>
                <div className="address-line">4747 Bob Wallace Avenue</div>
                <div className="address-line">Huntsville, AL 35805</div>
            </section>

            <section className="wedding-day">
                <div className="rsvp-link">
                    <Link to="/rsvp" className="registry-btn">
                        RSVP
                    </Link>
                </div>
            </section>
        </main>
    )
}
