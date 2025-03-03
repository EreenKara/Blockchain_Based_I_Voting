import {useEffect, useState} from 'react';
import {useAuthContext} from '@contexts/index';
import {
  ServiceContainer,
  ServiceType,
} from '@services/backend/concrete/service.container';
import {UserService} from '@services/backend/concrete/user.service';
import {RegisterViewModel} from '@viewmodels/register.viewmodel';

const codeLength = 6;

export const useAuth = (login: boolean = true) => {
  const {login: authLogin, rememberUser, getUser} = useAuthContext();
  const [submitError, setSubmitError] = useState('');
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailOrIdentity, setEmailOrIdentity] = useState('');
  const userService = ServiceContainer.getService(
    ServiceType.UserService,
  ) as UserService;

  useEffect(() => {
    if (login) {
      setLoading(true);
      getUser().then(user => {
        setEmailOrIdentity(user || '');
        setLoading(false);
      });
    }
  }, [login]);

  const submitLogin = async (values: {
    emailOrIdentity: string;
    password: string;
    rememberMe: boolean;
  }) => {
    console.log('submitLogin', values);
    try {
      const token = await userService.login({
        emailOrIdentity: values.emailOrIdentity,
        password: values.password,
      });
      if (values.rememberMe === true) {
        rememberUser(values.emailOrIdentity);
      }
      authLogin(token);
      setMessage('Giriş başarılı');
      setVisible(true);
      return true;
    } catch (error: any) {
      setSubmitError(error.message);
      return false;
    }
  };

  const submitRegister = async (values: RegisterViewModel) => {
    try {
      const message = await userService.register(values);
      setMessage(message);
      setVisible(true);
      return true;
    } catch (error: any) {
      setSubmitError(error.message);
      return false;
    }
  };

  const submitEmailVerification = async (
    emailOrIdentity: string,
    verificationCode: string,
  ) => {
    if (verificationCode.length !== codeLength) {
      setMessage('Lütfen 6 haneli kodu eksiksiz giriniz.');
      setVisible(true);
      return false;
    }
    try {
      const response = await userService.verifyEmail(
        emailOrIdentity,
        verificationCode,
      );
      setMessage(`Email doğrulama başarılı-${response}`);
      setVisible(true);
      return true;
    } catch (error: any) {
      setSubmitError('Doğrulama başarısız oldu. Lütfen tekrar deneyiniz.');
      return false;
    }
  };

  return {
    emailOrIdentity,
    submitLogin,
    submitRegister,
    submitEmailVerification,
    submitError,
    message,
    visible,
    setVisible,
    loading,
    setLoading,
  };
};
