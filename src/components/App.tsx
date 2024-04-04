import { router } from '@/router/index'
import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom/dist/index'

export default function App() {
  return <div>
    <RouterProvider router={router}/>
  </div>
}