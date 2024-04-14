import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { storedIsAuth } from '@/store';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = useRecoilValue(storedIsAuth);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to='/films' state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
