import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KripAiStackParamList } from '../navigation/KripAIStackNavigator';
import { useNavigation } from '@react-navigation/native';

const BotAvatar = () => (
  <View style={styles.botAvatarContainer}>
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C10.34 2 9 3.34 9 5V6H7C5.9 6 5 6.9 5 8V18C5 19.1 5.9 20 7 20H17C18.1 20 19 19.1 19 18V8C19 6.9 18.1 6 17 6H15V5C15 3.34 13.66 2 12 2ZM12 4C12.55 4 13 4.45 13 5V6H11V5C11 4.45 11.45 4 12 4ZM9 11C9.55 11 10 11.45 10 12C10 12.55 9.55 13 9 13C8.45 13 8 12.55 8 12C8 11.45 8.45 11 9 11ZM15 11C15.55 11 16 11.45 16 12C16 12.55 15.55 13 15 13C14.45 13 14 12.55 14 12C14 11.45 14.45 11 15 11ZM8 15H16V16H8V15Z"
        fill="#FF8C00"
      />
    </Svg>
  </View>
);

type KripAiScreenNavigationProp = NativeStackNavigationProp<
  KripAiStackParamList,
  'KripAiChat'
>;

const Chatmessage = ({ chat }) => {
  const isUser = chat.role === 'user';
  if (chat.text == null) return null;
  return (
    <View style={styles.messageContainer}>
      {!isUser && (
        <View style={styles.botAvatarWrapper}>
          <BotAvatar />
          <Text style={styles.botLabel}>FitBot</Text>
          <View style={styles.activeIndicator}>
            <Text style={styles.activeText}>● Always active</Text>
          </View>
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text style={[styles.messageText, isUser && styles.userMessageText]}>
          {chat.text}
        </Text>
      </View>
      {!isUser && chat.timestamp && (
        <Text style={styles.timestamp}>{chat.timestamp}</Text>
      )}
    </View>
  );
};

const COINGECKO_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  XRP: 'ripple',
};

function useLivePrices() {
  const [prices, setPrices] = useState({
    BTC: 65000,
    ETH: 3400,
    SOL: 180,
    XRP: 0.55,
  });

  const fetchNow = useCallback(async () => {
    try {
      const ids = Object.values(COINGECKO_IDS).join(',');
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
      );
      const j = await res.json();
      setPrices({
        BTC: j?.bitcoin?.usd ?? 65000,
        ETH: j?.ethereum?.usd ?? 3400,
        SOL: j?.solana?.usd ?? 180,
        XRP: j?.ripple?.usd ?? 0.55,
      });
    } catch {
      // do nothing, keep working
    }
  }, []);

  useEffect(() => {
    fetchNow();
    const interval = setInterval(fetchNow, 30000);
    return () => clearInterval(interval);
  }, [fetchNow]);

  return { prices };
}

/* =========================================
   Gemini API call
========================================= */
async function callGemini(prompt: string) {
  const API_KEY = 'AIzaSyAkjLpOvf09DLjcL_THHCKpc6nCKZAd4TM';
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        }),
      },
    );
    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No answer available.';
    return text.split(/\n/).filter(Boolean).slice(0, 3).join('\n');
  } catch {
    return 'Unable to get response right now.';
  }
}

function useCryptoAssistant({ onOpenTransak, openAmountModal } = {}) {
  const { prices } = useLivePrices();
  const [portfolio, setPortfolio] = useState({
    cash: 10000,
    positions: { BTC: 0.15, ETH: 2 },
  });

  const symMap = useMemo(
    () => ({
      btc: 'BTC',
      bitcoin: 'BTC',
      eth: 'ETH',
      ethereum: 'ETH',
      sol: 'SOL',
      solana: 'SOL',
      xrp: 'XRP',
      ripple: 'XRP',
    }),
    [],
  );

  const isCryptoIntent = (m: string) =>
    /(btc|bitcoin|eth|ethereum|sol|solana|xrp|ripple|crypto|coin|wallet|exchange|trade|price|portfolio|buy|sell|tax|staking|defi)/i.test(
      m,
    );

  const isQuestion = (m: string) =>
    /\?\s*$/.test(m) ||
    /^(can|how|what|why|when|where|which|should|is|are|do|does|did|will|would|could|may|might)\b/i.test(
      m,
    );

  const fmt = (n: number) =>
    `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  const brand = (txt: string) => `${txt}\n\n— KRIP AI Assistant`;

  const handle = useCallback(
    async (message: any) => {
      const m = (message || '').trim();
      const lower = m.toLowerCase();

      if (!isCryptoIntent(lower)) {
        return {
          text: brand(
            "I'm your crypto trading assistant. Try: 'buy btc 100', 'price eth', 'portfolio', or ask any crypto question!",
          ),
        };
      }

      // Trade command
      const trade = lower.match(
        /^(buy|sell)\s+(btc|bitcoin|eth|ethereum|sol|solana|xrp|ripple)(?:\s+(\d+(?:\.\d+)?))?$/,
      );
      if (trade) {
        const side = trade[1];
        const sym = symMap[trade[2]];
        const usd = trade[3] ? parseFloat(trade[3]) : null;

        if (usd == null) {
          if (typeof openAmountModal === 'function') openAmountModal(side, sym);
          return {
            text: `${side.toUpperCase()} ${sym} — enter amount to continue…`,
          };
        }

        if (typeof onOpenTransak === 'function')
          onOpenTransak(sym, usd, side === 'buy' ? 'Buy' : 'Sell');

        const px = prices[sym] || 0;
        const qty = px ? usd / px : 0;
        if (side === 'buy') {
          if (portfolio.cash < usd)
            return { text: 'Insufficient cash (demo mode).' };
          setPortfolio(p => ({
            ...p,
            cash: p.cash - usd,
            positions: { ...p.positions, [sym]: (p.positions[sym] || 0) + qty },
          }));
        } else {
          const have = portfolio.positions[sym] || 0;
          if (have < qty)
            return {
              text: `Insufficient ${sym}. You have ${have.toFixed(6)}.`,
            };
          setPortfolio(p => ({
            ...p,
            cash: p.cash + usd,
            positions: { ...p.positions, [sym]: (p.positions[sym] || 0) - qty },
          }));
        }
        return {
          text: `${side.toUpperCase()} ${sym} → opening payment widget…`,
        };
      }

      // Help
      if (/(help|menu|commands)/.test(lower)) {
        const prompt = `${m} — KRIP crypto trading app`;
        const t = await callGemini(prompt);
        return { text: brand(t) };
      }

      // Prices
      if (
        lower.startsWith('price') ||
        /(\bbtc\b|\bbitcoin\b|\beth\b|\bethereum\b|\bsol\b|\bsolana\b|\bxrp\b|\bripple\b)/.test(
          lower,
        )
      ) {
        const asked = lower.split(/\s+/)[1];
        if (asked && symMap[asked]) {
          const s = symMap[asked];
          return { text: brand(`${s} ≈ ${fmt(prices[s] || 0)}`) };
        }
        return {
          text: brand(
            `Current Prices:\nBTC ${fmt(prices.BTC)} | ETH ${fmt(
              prices.ETH,
            )}\nSOL ${fmt(prices.SOL)} | XRP ${fmt(prices.XRP)}`,
          ),
        };
      }

      // Portfolio
      if (/(portfolio|holdings)/.test(lower)) {
        const pv =
          portfolio.cash +
          Object.entries(portfolio.positions).reduce(
            (t, [s, q]) => t + (prices[s] || 0) * q,
            0,
          );
        const lines = Object.entries(portfolio.positions).map(
          ([s, q]) => `${s}: ${q.toFixed(6)} ≈ ${fmt((prices[s] || 0) * q)}`,
        );
        return {
          text: brand(
            [
              `Cash: ${fmt(portfolio.cash)}`,
              ...lines,
              `Total Value: ${fmt(pv)}`,
            ].join('\n'),
          ),
        };
      }

      // News
      if (lower.includes('news')) {
        return {
          text: brand(
            [
              'Latest Headlines:',
              '• Bitcoin holds gains amid steady ETF inflows',
              '• Ethereum gas fees drop after network upgrade',
              '• Solana ecosystem announces new DeFi platform',
            ].join('\n'),
          ),
        };
      }

      // General questions to Gemini
      const prompt = isQuestion(lower)
        ? `${m} — KRIP crypto trading app`
        : `${m} (crypto context) — KRIP`;
      const t = await callGemini(prompt);
      return { text: brand(t) };
    },
    [prices, portfolio, symMap, onOpenTransak, openAmountModal],
  );

  return { handle };
}

const QuickActions = ({ onAction }) => {
  return (
    <View style={styles.quickActionsContainer}>
      {/* <TouchableOpacity
        style={styles.quickActionButton}
        onPress={() => onAction('Show me other options')}
      >
        <Text style={styles.quickActionText}>Show me other options</Text>
      </TouchableOpacity> */}
      {/* commented as no need */}
    </View>
  );
};

/* =========================================
   Input Form
========================================= */
const Chatform = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const [input, setInput] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    const updated = [
      ...chatHistory,
      { role: 'user', text },
      { role: 'model', text: 'Thinking...', timestamp: null },
    ];
    setChatHistory(updated);
    generateBotResponse(updated);
    setInput('');
  };

  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
          returnKeyType="send"
          onSubmitEditing={() => send(input)}
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity style={styles.micButton}>
          <Icon name="mic" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => send(input)} style={styles.sendButton}>
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* =========================================
   Main KRIP AI Screen
========================================= */
export const KripAiScreen = ({ navigation }: any) => {
  // const navigation = useNavigation<KripAiScreenNavigationProp>();
  const [transakUrl, setTransakUrl] = useState('');
  const [showTransak, setShowTransak] = useState(false);
  const [amountModal, setAmountModal] = useState({
    open: false,
    side: 'Buy',
    symbol: 'BTC',
    amount: '',
  });
  const [showMenu, setShowMenu] = useState(false);

  const openAmountModal = (side: string, symbol: any) =>
    setAmountModal({
      open: true,
      side: side === 'buy' ? 'Buy' : 'Sell',
      symbol,
      amount: '',
    });

  const openTransak = useCallback((symbol: string, amount: any, side: any) => {
    const apiKey = '8dd96a64-fedb-4153-98db-d168a878f23a';
    const walletAddress = '0xf0c6Eb0f878f8c91C2711a10900d3B9D0CF8B221';
    const network =
      symbol === 'BTC' ? 'bitcoin' : symbol === 'SOL' ? 'solana' : 'ethereum';

    const url =
      `https://global-stg.transak.com?apiKey=${apiKey}` +
      `&fiatAmount=${Number(amount) || 100}` +
      `&cryptoCurrencyCode=${symbol}` +
      `&network=${network}` +
      `&walletAddress=${walletAddress}` +
      `&productsAvailed=${(side || 'Buy').toUpperCase()}` +
      `&hideExchangeScreen=true` +
      `&disableWalletAddressForm=true`;

    setTransakUrl(url);
    setShowTransak(true);
  }, []);

  const { handle } = useCryptoAssistant({
    onOpenTransak: (sym: any, amt: any, side: any) =>
      openTransak(sym, amt, side),
    openAmountModal,
  });

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const [chatHistory, setChatHistory] = useState([
    {
      role: 'model',
      text: "Hello, I'm FitBot! 👋 I'm your personal sport assistant. How can I help you?",
      timestamp: 'Wed 8:21 AM',
    },
  ]);
  const scrollRef = useRef();

  const generateBotResponse = async (history: any) => {
    const lastUser = [...history].reverse().find(m => m.role === 'user');
    try {
      const { text } = await handle(lastUser?.text || '');
      setChatHistory(prev => {
        const idx = prev.findIndex(m => m.text === 'Thinking...');
        if (idx === -1) return prev;
        const copy = [...prev];
        if (text == null) {
          copy.splice(idx, 1);
        } else {
          copy.splice(idx, 1, { role: 'model', text, timestamp: null });
        }
        return copy;
      });
    } catch {
      setChatHistory(prev => {
        const idx = prev.findIndex(m => m.text === 'Thinking...');
        if (idx === -1) return prev;
        const copy = [...prev];
        copy.splice(idx, 1, {
          role: 'model',
          text: 'Sorry, something went wrong.',
          isError: true,
          timestamp: null,
        });
        return copy;
      });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        try {
          scrollRef.current.scrollToEnd({ animated: true });
        } catch {}
      }, 100);
    }
  }, [chatHistory]);

  const confirmAmount = () => {
    const amt = Number(amountModal.amount || 0);
    if (!amt || amt <= 0) return;
    openTransak(amountModal.symbol, amt, amountModal.side);
    setAmountModal(s => ({ ...s, open: false, amount: '' }));
  };

  const handleQuickAction = (text: string) => {
    const updated = [
      ...chatHistory,
      { role: 'user', text },
      { role: 'model', text: 'Thinking...', timestamp: null },
    ];
    setChatHistory(updated);
    generateBotResponse(updated);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>KRIP Chatbot</Text>
          {/* <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setShowMenu(true)}
          >
            <Icon name="menu" size={20} color="#333" />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('LimitOrders')}
          >
            <Icon name="list" size={20} color="#333" />
            {/* <Text style={styles.menuItemText}>Limit Orders</Text> */}
          </TouchableOpacity>
        </View>

        <View style={styles.chatContainer}>
          <ScrollView
            ref={scrollRef}
            style={styles.chatBody}
            contentContainerStyle={styles.chatContent}
          >
            {chatHistory.map((chat, index) => (
              <Chatmessage key={index} chat={chat} />
            ))}
            {chatHistory.length === 1 && (
              <QuickActions onAction={handleQuickAction} />
            )}
          </ScrollView>

          <Chatform
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </View>

        {/* Transak Modal */}
        <Modal
          visible={showTransak}
          animationType="slide"
          onRequestClose={() => setShowTransak(false)}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity
              style={styles.closeTransak}
              onPress={() => setShowTransak(false)}
            >
              <Icon name="x" size={24} color="#fff" />
              <Text style={styles.closeTransakText}>Close</Text>
            </TouchableOpacity>
            {transakUrl ? (
              <WebView source={{ uri: transakUrl }} style={{ flex: 1 }} />
            ) : null}
          </SafeAreaView>
        </Modal>

        {/* Amount Modal */}
        <Modal
          visible={amountModal.open}
          transparent
          animationType="fade"
          onRequestClose={() => setAmountModal(s => ({ ...s, open: false }))}
        >
          <View style={styles.amountOverlay}>
            <View style={styles.amountCard}>
              <Text style={styles.amountTitle}>
                {amountModal.side} {amountModal.symbol}
              </Text>
              <Text style={styles.amountHint}>Enter amount in USD</Text>
              <TextInput
                value={amountModal.amount}
                onChangeText={t => setAmountModal(s => ({ ...s, amount: t }))}
                placeholder="e.g., 100"
                keyboardType="numeric"
                style={styles.amountInput}
                placeholderTextColor="#999"
              />
              <View style={styles.amountButtons}>
                <TouchableOpacity
                  style={[styles.btn, styles.btnGhost]}
                  onPress={() => setAmountModal(s => ({ ...s, open: false }))}
                >
                  <Text style={[styles.btnText, styles.btnGhostText]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, styles.btnPrimary]}
                  onPress={confirmAmount}
                  disabled={!Number(amountModal.amount)}
                >
                  <Text style={styles.btnText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Menu Modal */}
        <Modal
          visible={showMenu}
          transparent
          animationType="fade"
          onRequestClose={() => setShowMenu(false)}
        >
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => setShowMenu(false)}
          >
            <View style={styles.menuCard}>
              {/* NEW: Limit Orders menu item */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowMenu(false);
                  navigation.navigate('LimitOrders');
                }}
              >
                <Icon name="list" size={20} color="#333" />
                <Text style={styles.menuItemText}>Limit Orders</Text>
              </TouchableOpacity>

              {/* UPDATED: Clear Chat with functionality */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  setShowMenu(false);
                  setChatHistory([
                    {
                      role: 'model',
                      text: "Hello, I'm FitBot! 👋 I'm your personal sport assistant. How can I help you?",
                      timestamp: 'Wed 8:21 AM',
                    },
                  ]);
                }}
              >
                <Icon name="trash-2" size={20} color="#333" />
                <Text style={styles.menuItemText}>Clear Chat</Text>
              </TouchableOpacity>

              {/* EXISTING: Settings (no change) */}
              <TouchableOpacity style={styles.menuItem}>
                <Icon name="settings" size={20} color="#333" />
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

/* =========================================
   Styles
========================================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  chatContainer: {
    flex: 1,
  },
  chatBody: {
    flex: 1,
  },
  chatContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageContainer: {
    marginBottom: 24,
  },
  botAvatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  botAvatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  botLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  activeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeText: {
    fontSize: 12,
    color: '#00C853',
  },
  messageBubble: {
    maxWidth: '85%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  botBubble: {
    backgroundColor: '#f5f5f5',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    color: '#333',
  },
  userMessageText: {
    color: '#fff',
  },
  timestamp: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  quickActionsContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  quickActionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  inputWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    maxHeight: 100,
    paddingVertical: 8,
  },
  micButton: {
    padding: 8,
    marginRight: 4,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeTransak: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ff8c00',
    gap: 8,
  },
  closeTransakText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  amountOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  amountTitle: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
  },
  amountHint: {
    color: '#666',
    marginTop: 8,
    marginBottom: 16,
  },
  amountInput: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  amountButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: '#ff8c00',
  },
  btnGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  btnGhostText: {
    color: '#333',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 16,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  menuItemText: {
    fontSize: 15,
    color: '#333',
  },
});
