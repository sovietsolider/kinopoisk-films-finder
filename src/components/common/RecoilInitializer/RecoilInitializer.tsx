import { storedIsAuth } from "@/store";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function RecoilInitializer() {
  const [isAuth, setIsAuth] = useRecoilState(storedIsAuth);
  useEffect(() => {
    const authStatus = Cookies.get('auth') === 'true';
    setIsAuth(authStatus);
  }, []);

  return null; 
};