import { useState, useEffect } from 'react'
import { useBlinkAuth } from '@blinkdotnew/react'
import { blink } from './lib/blink'
import { LandingPage } from './components/LandingPage'
import { EditorLayout } from './components/EditorLayout'
import { Spinner } from './components/ui/spinner'

export default function App() {
  const { isAuthenticated, isLoading } = useBlinkAuth()

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LandingPage onLogin={() => blink.auth.login(window.location.href)} />
  }

  return <EditorLayout />
}
