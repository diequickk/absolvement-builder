import React, { useState } from 'react'
import Layout from './Layout.jsx'

// ---------------------------------------------------------------------------
// Page registry — drop your page components here as you build them out.
// Each key becomes the route name shown in the nav (if you add one).
// ---------------------------------------------------------------------------
import BuildCalculator from './pages/BuildCalculator.jsx'

const PAGES = {
  BuildCalculator,
  // WeaponCompare: ...,
  // TalentTree:    ...,
}

const PAGE_KEYS  = Object.keys(PAGES)
const MAIN_PAGE  = PAGE_KEYS[0]  // default landing page

// ---------------------------------------------------------------------------
// Simple hash-based client-side routing (no react-router needed).
// Change the URL hash to navigate: window.location.hash = '#WeaponCompare'
// ---------------------------------------------------------------------------
function useHashPage() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    return PAGE_KEYS.includes(hash) ? hash : MAIN_PAGE
  })

  React.useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#', '')
      setPage(PAGE_KEYS.includes(hash) ? hash : MAIN_PAGE)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = (pageName) => {
    window.location.hash = pageName
  }

  return { page, navigate }
}

// ---------------------------------------------------------------------------
// Root app — completely open, no login, no platform deps.
// ---------------------------------------------------------------------------
export default function App() {
  const { page, navigate } = useHashPage()
  const CurrentPage = PAGES[page] ?? (() => <p style={{ color: '#888' }}>Page not found.</p>)

  return (
    <Layout currentPageName={page} navigate={navigate} pageKeys={PAGE_KEYS}>
      <CurrentPage navigate={navigate} />
    </Layout>
  )
}
