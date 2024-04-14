import { LoginOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { storedIsAuth } from '@/store';

export interface LoginDataType {
  login: string;
  password: string;
}

export function LoginModal({
  opened,
  onModalClose,
}: {
  opened: boolean;
  onModalClose: () => void;
}) {
  const [model, setModel] = useState<LoginDataType>({ login: '', password: '' });
  const [isAuth, setIsAuth] = useRecoilState(storedIsAuth);

  const handleLogin = () => {
    if (model.login === 'user1' && model.password === 'pwd1') {
      Cookies.set('auth', 'true', { expires: 1 }); // Cookie истекает через 1 день
      setIsAuth(true);
      onModalClose();
    } else {
      alert('Неверные учетные данные');
    }
  };

  return (
    <>
      <Modal open={opened} footer={null} onCancel={() => onModalClose()}>
        <div className='content-container text-white'>
          <div className='title-2 text-bold modal-title'>Авторизация</div>
          <div className='title-3 text-bold text-white'>Логин</div>
          <Input
            className='name-input'
            placeholder='Введите логин...'
            onChange={(e) => setModel({ ...model, login: e.target.value })}
          />
          <div className='title-3 text-bold text-white'>Пароль</div>
          <Input
            className='name-input'
            placeholder='Введите пароль...'
            onChange={(e) => setModel({ ...model, password: e.target.value })}
          />
          <Button
            type='primary'
            shape='round'
            icon={<LoginOutlined />}
            size={'large'}
            onClick={handleLogin}
          >
            Войти
          </Button>
        </div>
      </Modal>
    </>
  );
}
