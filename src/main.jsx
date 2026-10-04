import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './i18n'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import News from './pages/News'
import Contact from './pages/Contact'

function App() {
  return <BrowserRouter><div className="site-shell"><Header /><main><Routes>
    <Route path="/" element={<Home />} /><Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} /><Route path="/news" element={<News />} />
    <Route path="/contact" element={<Contact />} />
  </Routes></main><Footer /></div></BrowserRouter>
}

createRoot(document.getElementById('root')).render(<App />)
