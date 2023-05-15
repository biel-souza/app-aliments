import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Toast } from 'toastify-react-native';
import { useContext, useState } from 'react';

import AuthContext from '../../context/AuthContext';
import { NumberFormat } from '../NumberFormat';
import { ActionButton } from '../ActionButton';
import { Input, PasswordInput } from '../Form';
import colors from '../../styles/colors';
import api from '../../services/api';
import { styles } from './styles';

interface PropsType {
  open: boolean;
  setOpen: (data: boolean) => void;
  limit: number;
  actualValue: number;
}

export const PurchaseModal = ({ open, setOpen, limit, actualValue }: PropsType) => {
  const [submitExecuted, setSubmitExecuted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [observation, setObservation] = useState('');
  const [password, setPassword] = useState('');
  const [value, setValue] = useState(1);
  const { user } = useContext(AuthContext);

  const addValue = () => {
    if (value < limit) {
      const totalValue = value + actualValue + 1;

      if (totalValue <= limit) {
        setValue(value + 1);
      } else {
        Toast.error('Você excedeu o limite de compras!');
      }
    }
  };

  const reduceValue = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handleSubmit = async () => {
    if (!submitExecuted) {
      setSubmitExecuted(true);
      try {
        const { data: verify } = await api.get('/auth/user/verify-password', {
          params: { email: user?.email, password },
        });

        if (verify) {
          const data = { user_id: user?.user_id, value: Number(value), observation };

          await api.post('/purchases', data);

          setOpen(false);
          setShowPassword(false);
          Toast.success('Adicionado com sucesso!');
        } else {
          Toast.error('Senha incorreta!');
        }
      } catch (error) {
        Toast.error('Erro ao adicionar valor!');
      }
      setSubmitExecuted(false);
      setPassword('');
    }
  };

  return (
    <Modal visible={open} onRequestClose={() => setOpen(false)} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setOpen(false)}>
            <Ionicons name="close" size={25} color={colors.darkGreen} />
          </TouchableOpacity>
          {!showPassword ? (
            <View style={styles.wrapper}>
              <Text style={styles.title}>NOVA COMPRA</Text>
              <View style={styles.containerInput}>
                <TouchableOpacity style={styles.customButton} onPress={reduceValue}>
                  <Ionicons name="remove" size={20} color={colors.white} />
                </TouchableOpacity>
                <View style={styles.fakeInput}>
                  <NumberFormat value={value} />
                </View>
                <TouchableOpacity style={styles.customButton} onPress={addValue}>
                  <Entypo name="plus" size={20} color={colors.white} />
                </TouchableOpacity>
              </View>
              <View style={styles.boxInput}>
                <Input
                  placeholder="Observação"
                  maxLength={25}
                  value={observation}
                  onChangeText={(e: any) => {
                    setObservation(e);
                  }}
                />
              </View>
              <View style={styles.boxButton}>
                <ActionButton title="Adicionar" onPress={() => setShowPassword(true)} />
              </View>
            </View>
          ) : (
            <View style={styles.wrapper}>
              <Text style={styles.title}>
                VALOR - <NumberFormat value={value} />
              </Text>
              <PasswordInput label="Senha" placeholder="Senha" onChangeText={(e) => setPassword(e)} value={password} />
              <View style={styles.boxButton}>
                <View style={styles.wrapperButtons}>
                  <ActionButton title="Cancelar" onPress={() => setShowPassword(false)} background={colors.darkRed} />
                </View>
                <View style={styles.wrapperButtons}>
                  <ActionButton title="Confirmar" onPress={() => handleSubmit()} />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
