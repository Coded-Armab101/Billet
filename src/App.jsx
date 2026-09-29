import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import KeyboardCarousel from './components/KeyboardCarousel'
import Editorial from './components/Editorial'
import CommunitySection from './components/CommunitySection'
import TapeGallery from './components/TapeGallery'
import Team from './components/Team'
import Categories from './components/Categories'
import Build from './components/Build'
import Footer from './components/Footer'
import './styles/site.css'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div id="top" />
      <Header />

      <main id="main">
        <Hero />
        <ProductGrid />
        <KeyboardCarousel />
        <Editorial />
        <CommunitySection />
        <TapeGallery />
        <Team />
        <Categories />
        <Build />
      </main>

      <Footer />
    </>
  )
}
