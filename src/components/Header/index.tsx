import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useContext } from 'react';

import AuthContext from '../../context/AuthContext';
import colors from '../../styles/colors';
import { styles } from './styles';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Header = ({ navigation }: Props) => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{user?.name}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Account')}>
        <Icon name="person" size={25} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
