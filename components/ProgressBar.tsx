'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, speed: 400 })

export default function ProgressBar() {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.done()
    return () => {
      NProgress.start()
    }
  }, [pathname])

  return null
}
