import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Photos from './pages/Photos'
import Registry from './pages/Registry'
import Rsvp from './pages/Rsvp'
import Faq from './pages/Faq'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/rsvp" element={<Rsvp />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
