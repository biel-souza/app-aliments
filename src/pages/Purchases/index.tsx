import { useState, useEffect, useCallback, useContext } from 'react';
import ProgressCircle from 'react-native-progress-circle';
import { View, Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Toast } from 'toastify-react-native';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';

import { PurchaseModal } from '../../components/PurchaseModal';
import { NumberFormat } from '../../components/NumberFormat';
import type { PurchasesType } from '../../types/Purchases';
import { Container } from '../../components/Container';
import AuthContext from '../../context/AuthContext';
import colors from '../../styles/colors';
import api from '../../services/api';
import { styles } from './styles';

const Purchases = () => {
  const [purchases, setPurchases] = useState<PurchasesType[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const date = new Date();
  const limit = 200;

  const getData = useCallback(async () => {
    if (!open) {
      setLoading(true);
      try {
        const { data } = await api.get('/purchases', {
          params: {
            user_id: user?.user_id,
            filter_month: date.getMonth() + 1,
            filter_year: date.getFullYear(),
            limit: '100',
          },
        });

        setPurchases(
          data.purchases?.map((purchase: PurchasesType) => ({
            ...purchase,
            createdAt: format(parseISO(`${purchase.createdAt}`), 'dd/MM/yyyy HH:mm:ss', {
              locale: pt,
            }),
          })),
        );

        setTotalValue(data.total_value);
      } catch (error) {
        Toast.error('Erro ao buscar dados');
      }
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Container loading={loading}>
      <View style={styles.progressBarContainer}>
        <Text style={styles.progressBarText}>
          <NumberFormat value={totalValue} />
        </Text>
        <ProgressCircle
          percent={(totalValue / limit) * 100}
          radius={50}
          borderWidth={8}
          color={colors.darkGreen}
          shadowColor="#e0e0e0"
          bgColor={colors.white}
        >
          <Text>{((totalValue / limit) * 100).toFixed(0)}%</Text>
        </ProgressCircle>
        <Text style={styles.progressBarText}>
          <NumberFormat value={limit} />
        </Text>
      </View>
      <View style={styles.containerList}>
        {purchases.map((purchase, key) => (
          <View style={styles.list} key={key}>
            <View style={styles.wrapper}>
              <AntDesign name="shoppingcart" size={16} color={colors.darkGreen} />
            </View>
            <View style={styles.wrapper}>
              <Text style={{ color: colors.darkGreen }}>{purchase.createdAt}</Text>
            </View>
            <View style={styles.wrapper}>
              <NumberFormat value={purchase.value} />
            </View>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addBottom} onPress={() => setOpen(true)}>
          <Entypo name="plus" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
      <PurchaseModal open={open} setOpen={setOpen} limit={limit} actualValue={totalValue} />
    </Container>
  );
};

export default Purchases;
