import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { AllocationItem } from '../types';

interface AssetAllocationProps {
  allocations: AllocationItem[];
  onToggleView: () => void;
}

export const AssetAllocation: React.FC<AssetAllocationProps> = ({
  allocations,
  onToggleView,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Asset Allocation</Text>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bar-chart-2" size={20} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={onToggleView}>
            <Icon name="clock" size={20} color="#ff8c00" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.donutPlaceholder}>
          <View style={styles.donutCenter}>
            <Text style={styles.donutText}>Asset</Text>
            <Text style={styles.donutText}>Distribution</Text>
          </View>
        </View>

        <View style={styles.legend}>
          {allocations.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendDot, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>{item.name}</Text>
              <Text style={styles.legendPercent}>{item.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  donutPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4169E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutCenter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutText: {
    fontSize: 10,
    color: '#666',
  },
  legend: {
    flex: 1,
    marginLeft: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  legendPercent: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
