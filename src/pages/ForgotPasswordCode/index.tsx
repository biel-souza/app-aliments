import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity } from 'react-native';
import { Toast } from 'toastify-react-native';
import { Formik, FormikProps } from 'formik';
import { useState } from 'react';

import { SubmitValues } from '../../types/ForgotPasswordCode';
import { ActionButton } from '../../components/ActionButton';
import { RootAuthListType } from '../../routes/auth.routes';
import { Container } from '../../components/Container';
import { Input } from '../../components/Form';
import api from '../../services/api';
import { styles } from './styles';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootAuthListType>;
};

const ForgotPasswordCode = ({ navigation }: HomeScreenProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SubmitValues) => {
    setLoading(true);
    try {
      const { code } = values;

      const email = await AsyncStorage.getItem('email_forgot');

      const { data: verifyCode } = await api.get('/auth/user/forgot-password/code', {
        params: { email, code },
      });

      if (verifyCode) {
        navigation.navigate('ForgotPassword', { code });
      } else {
        Toast.warn('Código inválido');
      }
    } catch (error) {
      Toast.error('Código de alteração expirou');
    }
    setLoading(false);
  };

  return (
    <Container loading={loading}>
      <View style={styles.content}>
        <Formik
          initialValues={{ code: '' }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ handleChange, handleSubmit, values }: FormikProps<SubmitValues>) => (
            <View style={styles.form}>
              <Text style={styles.title}>Insira o código:</Text>
              <View style={styles.boxInput}>
                <Input label="Código" placeholder="Código" onChangeText={handleChange('code')} value={values.code} />
              </View>
              <View style={styles.boxButton}>
                <ActionButton onPress={() => handleSubmit()} title="VERIFICAR" />
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

export default ForgotPasswordCode;
