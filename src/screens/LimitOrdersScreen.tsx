import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Order {
  id: string;
  type: 'Limit / Buy' | 'Limit / Sell';
  coin: string;
  amount: string;
  price: string;
  createdOn: string;
}

const OrderCard = ({ order, onEdit, onDelete }) => {
  const isBuy = order.type === 'Limit / Buy';

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text
          style={[styles.orderType, isBuy ? styles.buyType : styles.sellType]}
        >
          {order.type}
        </Text>
        <View style={styles.orderActions}>
          <TouchableOpacity
            onPress={() => onEdit(order)}
            style={styles.iconButton}
          >
            <Icon name="edit-2" size={18} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(order.id)}
            style={styles.iconButton}
          >
            <Icon name="x" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.coinPair}>{order.coin}</Text>

      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>{order.amount}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price</Text>
          <Text style={styles.detailValue}>{order.price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Created on</Text>
          <Text style={styles.detailValue}>{order.createdOn}</Text>
        </View>
      </View>
    </View>
  );
};

const EditOrderModal = ({ visible, order, onClose, onSave }) => {
  const [orderType, setOrderType] = useState(order?.type || 'Limit / Sell');
  const [coin, setCoin] = useState(order?.coin || 'BNB / USDT');
  const [amount, setAmount] = useState(order?.amount || '');
  const [price, setPrice] = useState(order?.price || '');

  const handleSave = () => {
    onSave({
      ...order,
      type: orderType,
      coin,
      amount,
      price,
    });
    onClose();
  };

  if (!order) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Order</Text>

          {/* Order Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Order Type</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{orderType}</Text>
              <Icon name="chevron-down" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Coin */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Coin</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{coin}</Text>
              <Icon name="chevron-down" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Amount */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Amount</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{amount}</Text>
              <Icon name="chevron-down" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Price */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Price</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{price}</Text>
              <Icon name="chevron-down" size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

/* =========================================
   Limit Orders Screen
========================================= */
export const LimitOrdersScreen = ({ navigation }: { navigation: any }) => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      type: 'Limit / Sell',
      coin: 'BNB / USDT',
      amount: '0.00 / 0.01',
      price: '328.00',
      createdOn: '2023 - 04 - 19, 13:19:54',
    },
    {
      id: '2',
      type: 'Limit / Buy',
      coin: 'BNB / USDT',
      amount: '0.00 / 0.49',
      price: '300.00',
      createdOn: '2023 - 04 - 20, 13:19:54',
    },
    {
      id: '3',
      type: 'Limit / Sell',
      coin: 'BNB / USDT',
      amount: '0.00 / 0.941',
      price: '400.00',
      createdOn: '2023 - 04 - 21, 13:19:54',
    },
    {
      id: '4',
      type: 'Limit / Buy',
      coin: 'BNB / USDT',
      amount: '0.00 / 0.01',
      price: '290.00',
      createdOn: '2023 - 04 - 22, 13:19:54',
    },
  ]);

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setShowEditModal(true);
  };

  const handleDelete = (orderId: string) => {
    setOrders(orders.filter(o => o.id !== orderId));
  };

  const handleSave = (updatedOrder: Order) => {
    setOrders(orders.map(o => (o.id === updatedOrder.id ? updatedOrder : o)));
    setShowEditModal(false);
    setEditingOrder(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>KRIP Chatbot</Text>
        {/* <TouchableOpacity style={styles.menuButton}>
          <Icon name="menu" size={24} color="#333" />
        </TouchableOpacity> */}
      </View>

      {/* Orders List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {orders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ScrollView>

      {/* Edit Modal */}
      <EditOrderModal
        visible={showEditModal}
        order={editingOrder}
        onClose={() => {
          setShowEditModal(false);
          setEditingOrder(null);
        }}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  menuButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderType: {
    fontSize: 14,
    fontWeight: '600',
  },
  buyType: {
    color: '#00C853',
  },
  sellType: {
    color: '#FF3B30',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  coinPair: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  orderDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
