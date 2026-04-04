import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Photos from './pages/Photos'
import Registry from './pages/Registry'
import Rsvp from './pages/Rsvp'
import Faq from './pages/Faq'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="page-transition"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/photos" element={<AnimatedPage><Photos /></AnimatedPage>} />
          <Route path="/registry" element={<AnimatedPage><Registry /></AnimatedPage>} />
          <Route path="/rsvp" element={<AnimatedPage><Rsvp /></AnimatedPage>} />
          <Route path="/faq" element={<AnimatedPage><Faq /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default App
