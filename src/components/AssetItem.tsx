import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Asset } from '../types';

interface AssetItemProps {
  asset: Asset;
  onPress?: () => void;
}

export const AssetItem: React.FC<AssetItemProps> = ({ asset, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <View
          style={[styles.icon, { backgroundColor: asset.color || '#f0f0f0' }]}
        >
          <Text style={styles.iconText}>{asset.icon}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{asset.name}</Text>
          <Text style={styles.symbol}>{asset.symbol}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>{asset.amount}</Text>
        <Text style={styles.value}>Rs {asset.value.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  info: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  symbol: {
    fontSize: 14,
    color: '#999',
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: '#999',
  },
});
