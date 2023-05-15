import { ActivityIndicator, View } from 'react-native';
import React, { ReactNode } from 'react';

import colors from '../../styles/colors';
import { styles } from './styles';

interface PropsType {
  loading: boolean;
  children: ReactNode;
}

export const Container = ({ loading, children }: PropsType) => {
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      )}
      {children}
    </View>
  );
};
