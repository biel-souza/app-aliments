import { MutableRefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Toast } from 'toastify-react-native';
import { Formik, FormikProps } from 'formik';

import { Input, PasswordInput, Select } from '../../components/Form';
import { ActionButton } from '../../components/ActionButton';
import { RootAppListType } from '../../routes/app.routes';
import { Container } from '../../components/Container';
import InputModal from '../../components/InputModal';
import AuthContext from '../../context/AuthContext';
import { SubmitValues } from '../../types/Account';
import { styles } from './styles';

type ScreenProps = {
  navigation: NativeStackNavigationProp<RootAppListType, 'Account'>;
};

const Account = ({ navigation }: ScreenProps) => {
  const formRef: MutableRefObject<FormikProps<SubmitValues> | null> = useRef(null);
  const { user, signOut, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');

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

  const handleSubmit = async (values?: SubmitValues) => {
    if (!values) {
      return;
    }

    setLoading(true);
    try {
      const sucess = await updateUser(values, password);

      setPassword('');

      if (sucess) {
        setOpen(false);
      }
    } catch (error) {
      Toast.error('Erro ao atualizar!');
    }
    setLoading(false);
  };

  const getData = useCallback(async () => {
    if (!user) {
      return;
    }

    setLoading(true);
    try {
      formRef.current?.setValues({
        email: user.email,
        name: user.name,
        sector: user.sector,
      });
    } catch (error) {
      Toast.error('Erro ao buscar dados!');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container loading={loading}>
      <View style={styles.content}>
        <Formik
          innerRef={formRef}
          initialValues={{ email: '', name: '', sector: '' }}
          onSubmit={() => {
            setOpen(true);
          }}
        >
          {({ handleChange, handleSubmit, values, errors }: FormikProps<SubmitValues>) => (
            <View style={styles.form}>
              <View>
                <Text style={styles.title}>Dados cadastrais</Text>
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
                />
              </View>
              <View style={styles.boxButton}>
                <ActionButton onPress={() => handleSubmit()} title="SALVAR" />
                <View style={styles.wrapper}>
                  <TouchableOpacity onPress={() => navigation.navigate('Purchases')}>
                    <Text style={styles.linkText}>Voltar</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.wrapper}>
                  <TouchableOpacity onPress={() => signOut()}>
                    <Text style={styles.linkText}>
                      <Icon name="arrow-expand-left" size={17} /> Sair da conta
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </View>
      <InputModal open={open} setOpen={setOpen}>
        <PasswordInput label="Senha" placeholder="Senha" onChangeText={(e) => setPassword(e)} value={password} />
        <View style={styles.boxButton}>
          <ActionButton title="Confirmar" onPress={() => handleSubmit(formRef.current?.values)} />
        </View>
      </InputModal>
    </Container>
  );
};

export default Account;
