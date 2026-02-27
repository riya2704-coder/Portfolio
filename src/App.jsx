import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Portfolio from './Pages/Portfolio'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>

     <Route path="/" element={<Portfolio />} />

    </Routes>
    
    </BrowserRouter>
    
  )
}
