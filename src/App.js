import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import WorkingWithUs from './components/WorkingWithUs'
import EngagementModels from './components/EngagementModels'
import CookieBanner from './components/CookieBanner'
import WhatsAppFAB from './components/WhatsAppFAB'
import RouteSeo from './components/RouteSeo'
import RouteEffects from './components/RouteEffects'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import './components/brand.css'
import './App.css'

// Route-level code splitting (home, navbar, footer stay eager)
const ServiceDetail = lazy(() => import('./components/ServiceDetail'))
const ProjectDetail = lazy(() => import('./components/ProjectDetail'))
const IndustryDetail = lazy(() => import('./components/IndustryDetail'))
const AIDetail = lazy(() => import('./components/AIDetail'))
const AISolutionsPage = lazy(() => import('./components/AISolutionsPage'))
const WebDevelopmentPage = lazy(() => import('./components/WebDevelopmentPage'))
const ServicesList = lazy(() => import('./components/ServicesList'))
const IndustriesList = lazy(() => import('./components/IndustriesList'))
const AIList = lazy(() => import('./components/AIList'))
const BusinessProfile = lazy(() => import('./components/BusinessProfile'))
const PortfolioPage = lazy(() => import('./components/PortfolioPage'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./components/TermsOfService'))
const CookiePolicy = lazy(() => import('./components/CookiePolicy'))

const RouteFallback = () => <div aria-busy="true" style={{ minHeight: '70vh' }} />

// Home page component
const HomePage = () => (
  <main id="main">
    <Hero />
    <About />
    <Services />
    <WorkingWithUs />
    <Portfolio />
    <Testimonials />
    <EngagementModels />
    <FAQ />
    <Contact />
  </main>
)

// Layout wrapper: hides navbar/footer on full-screen blog posts
const Layout = ({ children }) => {
  const location = useLocation()

  // Check if it's a blog post page (has slug) vs blog list page
  const pathParts = location.pathname.split('/').filter(Boolean)
  const isBlogPostPage = pathParts[0] === 'blog' && pathParts.length === 3 // /blog/category/slug

  const showNavbar = !isBlogPostPage
  const showFooter = !isBlogPostPage

  return (
    <div className="App">
      <RouteSeo />
      <RouteEffects />
      <ScrollProgress />
      {showNavbar && <Navbar />}
      <div key={location.pathname} className="page-enter">{children}</div>
      {showFooter && <Footer />}
      <CookieBanner />
      <BackToTop />
      {!isBlogPostPage && <WhatsAppFAB />}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesList />} />
            <Route path="/services/ai-solutions" element={<AISolutionsPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentPage />} />
            <Route path="/services/app-development" element={<ServiceDetail serviceSlug="app-development" />} />
            <Route path="/services/cloud-integration" element={<ServiceDetail serviceSlug="cloud-integration" />} />
            <Route path="/services/uiux-design" element={<ServiceDetail serviceSlug="uiux-design" />} />
            <Route path="/services/digital-marketing" element={<ServiceDetail serviceSlug="digital-marketing" />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:slug" element={<ProjectDetail />} />
            <Route path="/industries" element={<IndustriesList />} />
            <Route path="/industries/:slug" element={<IndustryDetail />} />
            <Route path="/ai" element={<AIList />} />
            <Route path="/ai/:slug" element={<AIDetail />} />
            <Route path="/business-profile" element={<BusinessProfile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/blog/*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
