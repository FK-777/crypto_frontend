import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PeriodSelectorProps {
  periods: string[];
  selectedPeriod: string;
  onSelectPeriod: (period: string) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  periods,
  selectedPeriod,
  onSelectPeriod,
}) => {
  return (
    <View style={styles.container}>
      {periods.map(period => (
        <TouchableOpacity
          key={period}
          style={[
            styles.button,
            selectedPeriod === period && styles.buttonActive,
          ]}
          onPress={() => onSelectPeriod(period)}
        >
          <Text
            style={[
              styles.text,
              selectedPeriod === period && styles.textActive,
            ]}
          >
            {period}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  buttonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff8c00',
  },
  text: {
    fontSize: 14,
    color: '#999',
  },
  textActive: {
    color: '#ff8c00',
    fontWeight: '600',
  },
});
