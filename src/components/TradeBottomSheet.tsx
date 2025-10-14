import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface TradeOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

interface TradeBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onOptionPress: (optionId: string) => void;
}

const tradeOptions: TradeOption[] = [
  {
    id: 'buy',
    title: 'Buy',
    subtitle: 'Buy crypto with USDT',
    icon: 'calendar',
  },
  {
    id: 'sell',
    title: 'Sell',
    subtitle: 'Sell crypto to USDT',
    icon: 'calendar',
  },
  {
    id: 'convert',
    title: 'Convert',
    subtitle: 'Trade with Convert instantly',
    icon: 'refresh-cw',
  },
];

export const TradeBottomSheet: React.FC<TradeBottomSheetProps> = ({
  visible,
  onClose,
  onOptionPress,
}) => {
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const handleOptionPress = (optionId: string) => {
    onOptionPress(optionId);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[styles.bottomSheet, { transform: [{ translateY }] }]}
            >
              <View style={styles.content}>
                {tradeOptions.map((option, index) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionItem,
                      index < tradeOptions.length - 1 && styles.optionBorder,
                    ]}
                    onPress={() => handleOptionPress(option.id)}
                  >
                    <View style={styles.iconContainer}>
                      <Icon name={option.icon} size={24} color="#333" />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.optionTitle}>{option.title}</Text>
                      <Text style={styles.optionSubtitle}>
                        {option.subtitle}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <View style={styles.closeButtonCircle}>
                  <Icon name="x" size={28} color="#fff" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
  },
  content: {
    paddingTop: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 24,
  },
  closeButtonCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ff8c00',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
