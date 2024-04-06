import { router } from '@/router/index'
import { RouterProvider } from 'react-router-dom/dist/index'
import { ConfigProvider } from 'antd'
import { RecoilRoot } from 'recoil'
import React from 'react'



export default function App() {
  return <>
  
    <RecoilRoot>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: `#f30745`,
          },
          components: {
            Slider: {
              
              handleLineWidth: 1
            }
          }
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </RecoilRoot>
  </>
}