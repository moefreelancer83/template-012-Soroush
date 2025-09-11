'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface NavigationContextValue {
  isStaticExport: boolean
  basePath: string
}

const NavigationContext = createContext<NavigationContextValue>({
  isStaticExport: false,
  basePath: ''
})

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [basePath, setBasePath] = useState('')
  const [isStaticExport, setIsStaticExport] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Detect base path from current URL
    const pathname = window.location.pathname
    const match = pathname.match(/^(\/[^\/]+)\//)
    
    if (match && !pathname.includes('/_next/')) {
      const detectedBasePath = match[1]
      setBasePath(detectedBasePath)
      setIsStaticExport(true)
      console.log('NavigationProvider: Detected base path:', detectedBasePath)
    }
  }, [])

  useEffect(() => {
    if (!isStaticExport || !basePath) return

    console.log('NavigationProvider: Static export mode active with base path:', basePath)

    // Override click behavior for internal links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (!link || !link.href) return
      
      const href = link.getAttribute('href')
      console.log('NavigationProvider: Intercepted click on:', href)
      
      if (!href) return
      
      // Check if this is an internal navigation that needs fixing
      if (href === '/' || href.startsWith('/#') || href.startsWith(basePath)) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
      
      const url = new URL(link.href)
      const currentUrl = new URL(window.location.href)
      
      // Only handle internal links
      if (url.origin !== currentUrl.origin) return
      
      // Handle navigation to root with hash
      if (href.startsWith('/#')) {
        const hash = href.substring(1) || ''
        const newUrl = `${basePath}/index.html${hash}`
        console.log('NavigationProvider: Redirecting to:', newUrl)
        window.location.replace(newUrl)
        return
      }
      
      // Handle navigation to root
      if (href === '/') {
        window.location.replace(`${basePath}/index.html`)
        return
      }
      
      // Special handling for basePath#hash links
      if (href.startsWith(`${basePath}#`)) {
        const hash = href.substring(basePath.length)
        const newUrl = `${basePath}/index.html${hash}`
        console.log('NavigationProvider: Redirecting basePath#hash to:', newUrl)
        window.location.replace(newUrl)
        return
      }
      
      // Fix links that point to directories without index.html
      if (url.pathname === basePath || url.pathname.startsWith(`${basePath}/`)) {
        // Check if it's a directory (no file extension)
        if (!url.pathname.includes('.')) {
          e.preventDefault()
          
          if (url.pathname === basePath) {
            window.location.replace(`${basePath}/index.html${url.hash}`)
          } else {
            // For Next.js static export with trailingSlash: true,
            // all routes are directories with index.html
            window.location.replace(`${url.pathname}/index.html${url.hash}`)
          }
        }
      }
    }

    // Use capture phase to intercept before Next.js router
    document.addEventListener('click', handleClick, true)
    
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [isStaticExport, basePath])

  return (
    <NavigationContext.Provider value={{ isStaticExport, basePath }}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => useContext(NavigationContext)