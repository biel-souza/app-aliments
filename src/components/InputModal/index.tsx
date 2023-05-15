import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import { Modal } from 'react-native';

import colors from '../../styles/colors';
import { styles } from './styles';

interface PropsType {
  open: boolean;
  setOpen: (data: boolean) => void;
  children: any;
}

const InputModal = ({ children, open, setOpen }: PropsType) => {
  return (
    <Modal visible={open} onRequestClose={() => setOpen(false)} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setOpen(false)}>
            <Ionicons name="close" size={25} color={colors.darkGreen} />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;
