import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity } from 'react-native';
import { Toast } from 'toastify-react-native';
import { Formik, FormikProps } from 'formik';
import { useState } from 'react';

import { SubmitValues } from '../../types/ForgotPasswordMail';
import { ActionButton } from '../../components/ActionButton';
import { RootAuthListType } from '../../routes/auth.routes';
import { Container } from '../../components/Container';
import { Input } from '../../components/Form';
import api from '../../services/api';
import { styles } from './styles';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootAuthListType>;
};

const ForgotPasswordMail = ({ navigation }: HomeScreenProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: SubmitValues) => {
    setLoading(true);
    try {
      await api.post('/auth/user/forgot-password/mail', { email: values.email });

      await AsyncStorage.setItem('email_forgot', values.email);

      navigation.navigate('ForgotPasswordCode');
    } catch (error) {
      Toast.error('Email inválido!');
    }
    setLoading(false);
  };

  return (
    <Container loading={loading}>
      <View style={styles.content}>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ handleChange, handleSubmit, values }: FormikProps<SubmitValues>) => (
            <View style={styles.form}>
              <Text style={styles.title}>Insira o email do seu cadastro:</Text>
              <View style={styles.boxInput}>
                <Input label="Email" placeholder="Email" onChangeText={handleChange('email')} value={values.email} />
              </View>
              <View style={styles.boxButton}>
                <ActionButton onPress={() => handleSubmit()} title="ENVIAR" />
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

export default ForgotPasswordMail;
