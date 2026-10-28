import { MotionConfig } from 'framer-motion'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ContentProvider } from './data/content'
import About from './pages/About'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Home from './pages/Home'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import WorkDetail from './pages/WorkDetail'
import Works from './pages/Works'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/works', element: <Works /> },
      { path: '/works/:slug', element: <WorkDetail /> },
      { path: '/about', element: <About /> },
      { path: '/news', element: <News /> },
      { path: '/news/:slug', element: <NewsDetail /> },
      { path: '/services', element: <Services /> },
      { path: '/services/:slug', element: <ServiceDetail /> },
      // one route element so switching the "Options" tabs doesn't remount the page
      { path: '/contact', element: <Contact />, children: [{ index: true }, { path: 'book' }] },
      { path: '/careers', element: <Careers /> },
      { path: '*', element: <Home /> },
    ],
  },
])

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ContentProvider>
        <RouterProvider router={router} />
      </ContentProvider>
    </MotionConfig>
  )
}
