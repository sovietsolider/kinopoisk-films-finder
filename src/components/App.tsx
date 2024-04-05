import { router } from '@/router/index'
import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom/dist/index'
import Navbar from './common/navbar/Navbar'
import { ConfigProvider } from 'antd'

export default function App() {
  return <>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: '#00b96b',
          borderRadius: 2, 
          // Alias Token
          colorBgContainer: '#f6ffed',
        },
        components: {
          Input: {
            hoverBorderColor: '#f6ffed'
          }
        }
      }}
    ></ConfigProvider>
    <RouterProvider router={router} />
  </>
}