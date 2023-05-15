import React, { createContext, useEffect, useState } from 'react';
import { Toast } from 'toastify-react-native';
import { AxiosError } from 'axios';

import type { AuthContextType, SignInType, UpdateType, UserType } from '../types/AuthContext';
import { getAuthToken, setAuthToken } from '../helpers/authToken';
import api from '../services/api';

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const handleUser = async () => {
    setLoading(true);
    try {
      const token = await getAuthToken();

      if (token) {
        try {
          api.defaults.headers['Authorization'] = token;

          const { data } = await api.get('/auth/user');

          if (data) {
            setUser(data);
          }
        } catch (error) {
          setUser(null);
        }
      }
    } catch (error) {
      Toast.error('Erro ao conectar com a API');
    }
    setLoading(false);
  };

  const signIn = async ({ email, password }: SignInType) => {
    setLoading(true);
    try {
      const { data: token } = await api.post('/auth/sign', { email, password });

      await setAuthToken(token);

      await handleUser();
    } catch (error) {
      Toast.error('Dados Incorretos!');
    }
    setLoading(false);
  };

  const signOut = async () => {
    try {
      await api.post('/auth/signout', {});

      setAuthToken('');
      setUser(null);
    } catch (error) {
      Toast.error('Erro ao sair da conta!');
    }
  };

  const updateUser = async (values: UpdateType, password: string) => {
    try {
      await api.put('/auth/user', values, {
        params: { email: user?.email, password },
      });

      handleUser();
      Toast.success('Atualizado com sucesso');

      return true;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 406) {
        Toast.error('Senha inválida');
      } else {
        Toast.error('Erro ao atualizar usuario');
      }
    }

    return false;
  };

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, updateUser, isLoading }}>{children}</AuthContext.Provider>
  );
}

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
