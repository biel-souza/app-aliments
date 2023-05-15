import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { Formik, FormikProps } from 'formik';
import React, { useContext, useState } from 'react';

import { Input, PasswordInput } from '../../components/Form';
import { ActionButton } from '../../components/ActionButton';
import { RootAuthListType } from '../../routes/auth.routes';
import type { SubmitValues } from '../../types/SignIn';
import { Container } from '../../components/Container';
import AuthContext from '../../context/AuthContext';
import { styles } from './styles';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootAuthListType, 'SignIn'>;
};

const SignIn = ({ navigation }: HomeScreenProps) => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const handleSubmit = ({ email, password }: SubmitValues) => {
    signIn({ email: email.trim(), password: password.trim() });
  };

  return (
    <Container loading={loading}>
      <View style={styles.content}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ handleChange, handleSubmit, values }: FormikProps<SubmitValues>) => (
            <View style={styles.form}>
              <View>
                <Text style={styles.title}>LOGIN</Text>
              </View>
              <View style={styles.boxInput}>
                <Input label="Email" placeholder="Email" onChangeText={handleChange('email')} value={values.email} />
              </View>
              <View style={styles.boxInput}>
                <PasswordInput
                  label="Senha"
                  placeholder="Senha"
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
              </View>
              <View style={styles.boxButton}>
                <ActionButton onPress={() => handleSubmit()} title="ENTRAR" />
                <View style={styles.wrapper}>
                  <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordMail')}>
                    <Text style={styles.linkText}>Esqueceu a senha</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>Cadastre-se</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default SignIn;
