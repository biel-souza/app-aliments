import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity } from 'react-native';
import { Toast } from 'toastify-react-native';
import { Formik, FormikProps } from 'formik';
import { useState, useContext } from 'react';
import { AxiosError } from 'axios';

import { ActionButton } from '../../components/ActionButton';
import { RootAuthListType } from '../../routes/auth.routes';
import { SubmitValues } from '../../types/ForgotPassword';
import { Container } from '../../components/Container';
import { PasswordInput } from '../../components/Form';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import { styles } from './styles';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootAuthListType>;
  route: any;
};

const ForgotPassword = ({ navigation, route }: HomeScreenProps) => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const handleSubmit = async (values: SubmitValues) => {
    setLoading(true);
    try {
      const { password } = values;
      const email = (await AsyncStorage.getItem('email_forgot')) as string;

      await api.post('/auth/user/forgot-password', { password, email, code: route.params.code });

      signIn({ email, password });
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 406) {
        Toast.error('Código invalido');
      } else {
        Toast.error('Erro ao alterar senha!');
      }
    }
    setLoading(false);
  };

  return (
    <Container loading={loading}>
      <View style={styles.content}>
        <Formik
          initialValues={{ password: '' }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ handleChange, handleSubmit, values }: FormikProps<SubmitValues>) => (
            <View style={styles.form}>
              <Text style={styles.title}>Insira sua nova senha:</Text>
              <View style={styles.boxInput}>
                <PasswordInput
                  label="Senha"
                  placeholder="Senha"
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
              </View>
              <View style={styles.boxButton}>
                <ActionButton onPress={() => handleSubmit()} title="SALVAR" />
              </View>
              <View style={styles.wrapper}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                  <Text style={styles.linkText}>Voltar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default ForgotPassword;
