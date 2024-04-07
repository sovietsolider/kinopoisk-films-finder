import { router } from '@/router/index'
import { RouterProvider } from 'react-router-dom/dist/index'
import { ConfigProvider } from 'antd'
import { RecoilRoot } from 'recoil'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
            },
            Modal: {
              contentBg: `#100e19`
            }
          }
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </RecoilRoot>
  </>
}