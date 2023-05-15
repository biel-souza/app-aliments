import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import { Toast } from 'toastify-react-native';
import { useContext, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { Input, PasswordInput, Select } from '../../components/Form';
import { ActionButton } from '../../components/ActionButton';
import { RootAuthListType } from '../../routes/auth.routes';
import { Container } from '../../components/Container';
import { SubmitValues } from '../../types/Register';
import AuthContext from '../../context/AuthContext';
import api from '../../services/api';
import { styles } from './styles';

type ScreenProps = {
  navigation: NativeStackNavigationProp<RootAuthListType, 'SignIn'>;
};

const Register = ({ navigation }: ScreenProps) => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  const sectorOptions = [
    {
      value: 'ti',
      label: 'Ti',
    },
    {
      value: 'marketing',
      label: 'Marketing',
    },
    {
      value: 'sac',
      label: 'Sac',
    },
    {
      value: 'product',
      label: 'Produto',
    },
    {
      value: 'other',
      label: 'Outro',
    },
  ];

  const schema = Yup.object().shape({
    email: Yup.string().required('E-mail é um valor obrigatório!'),
    name: Yup.string().required('Nome é um valor obrigatório!'),
    password: Yup.string().min(6, 'Insira pelo menos 6 caracteres!').required('Senha é um velor obrigatório!'),
    sector: Yup.string().required('Setor é um valor obrigatório!'),
  });

  const handleSubmit = async (values: SubmitValues) => {
    setLoading(true);
    try {
      await api.post('/auth/user', values);

      await signIn({ email: values.email, password: values.password });
      Toast.success('Cadastrado com sucesso');
    } catch (error) {
      Toast.error('Erro ao cadastrar');
    }
    setLoading(false);
  };

  return (
    <Container loading={loading}>
      <View style={styles.content}>
        <Formik
          initialValues={{ email: '', password: '', name: '' }}
          validationSchema={schema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ handleChange, handleSubmit, values, errors }: FormikProps<SubmitValues>) => (
            <View style={styles.form}>
              <View>
                <Text style={styles.title}>CADASTRE-SE</Text>
              </View>
              <View style={styles.boxInput}>
                <Input
                  label="Nome"
                  placeholder="Nome"
                  onChangeText={handleChange('name')}
                  value={values.name}
                  error={errors.name}
                />
              </View>
              <View style={styles.boxInput}>
                <Select
                  label="Setor"
                  onChange={handleChange('sector')}
                  value={values.sector}
                  options={sectorOptions}
                  error={errors.sector}
                />
              </View>
              <View style={styles.boxInput}>
                <Input
                  label="Email"
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.boxInput}>
                <PasswordInput
                  label="Senha"
                  placeholder="Senha"
                  onChangeText={handleChange('password')}
                  value={values.password}
                  error={errors.password}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.boxButton}>
                <ActionButton onPress={() => handleSubmit()} title="CRIAR CONTA" />
                <View style={styles.wrapper}>
                  <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.linkText}>Voltar</Text>
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

export default Register;
