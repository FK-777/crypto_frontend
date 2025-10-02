import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Feather';

interface AssetTrendProps {
  data: {
    labels: string[];
    datasets: { data: number[] }[];
  };
  currentValue: string;
  startValue: string;
  onToggleView: () => void;
}

export const AssetTrend: React.FC<AssetTrendProps> = ({
  data,
  currentValue,
  startValue,
  onToggleView,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Asset Trend</Text>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconButton} onPress={onToggleView}>
            <Icon name="bar-chart-2" size={20} color="#ff8c00" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="clock" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.currentValue}>
        <Text style={styles.currentValueText}>{currentValue}</Text>
      </View>

      <LineChart
        data={data}
        width={Dimensions.get('window').width - 32}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ff8c00',
          },
        }}
        bezier
        style={styles.chart}
        withHorizontalLabels={false}
        withVerticalLabels={false}
        withDots={true}
        withInnerLines={false}
        withOuterLines={false}
      />

      <Text style={styles.startValue}>{startValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 8,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  icons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  currentValue: {
    position: 'absolute',
    top: 60,
    right: 24,
  },
  currentValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff8c00',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  startValue: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    marginTop: -8,
  },
});
