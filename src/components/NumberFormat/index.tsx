import { Text } from 'react-native';
import React from 'react';

import colors from '../../styles/colors';

type PropsType = {
  value: number;
};

export const NumberFormat = ({ value }: PropsType) => {
  const formattedValue = value.toFixed(2).replace('.', ',');
  const displayValue = `R$ ${formattedValue}`;

  return <Text style={{ color: colors.darkGreen }}>{displayValue}</Text>;
};
