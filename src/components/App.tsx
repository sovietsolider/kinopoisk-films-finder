import { router } from '@/router/index'
import { RouterProvider } from 'react-router-dom/dist/index'
import { ConfigProvider } from 'antd'
import { RecoilRoot, useRecoilState } from 'recoil'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from 'js-cookie';
import { storedIsAuth } from '@/store';
import RecoilInitializer from './common/RecoilInitializer/RecoilInitializer';

export default function App() {

  return <>
    <RecoilRoot>
      <RecoilInitializer />
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