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
} from 'react-native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';

/* =========================================
   Chat Avatar Icon
========================================= */
const Chatboticon = () => (
  <Svg width={19} height={18} viewBox="0 0 19 18" fill="none">
    <G clipPath="url(#clip0_94_1875)">
      <Path
        d="M5.92226 17.3521C5.92226 16.5576 5.92226 15.8046 5.92226 15.0295C5.8301 15.0267 5.75522 15.0184 5.68034 15.0184C5.19938 15.0184 4.71554 15.0212 4.23458 15.0184C2.86082 14.0073 1.8701 14.0883 1.85858 12.765C1.8413 10.6971 1.84418 8.62646 1.85858 6.55856C1.86722 5.22702 2.86082 4.29964 4.24898 4.29688C7.45154 4.29411 10.657 4.29411 13.8595 4.29688C15.2477 4.29964 16.2355 5.22425 16.2471 6.55856C16.2615 8.62093 16.2615 10.6833 16.2471 12.7457C16.2384 14.091 15.2506 15.0101 13.848 15.0184C12.4944 15.0267 11.1408 15.0323 9.78722 15.0489C9.6461 15.0516 9.49058 15.0987 9.3725 15.1734C8.28674 15.8544 7.20962 16.5437 6.12962 17.2303C6.0749 17.2635 6.02018 17.2939 5.92226 17.3521ZM6.16706 10.9186C6.15554 12.0619 7.59266 13.1941 9.01538 13.1747C10.4583 13.1554 11.8752 12.0148 11.8176 10.9186C9.93698 10.9186 8.05058 10.9186 6.16706 10.9186ZM7.89218 7.62158C7.89218 7.00702 7.37666 6.5115 6.7373 6.51427C6.10082 6.51704 5.58818 7.01533 5.59106 7.62988C5.59394 8.24167 6.11234 8.73996 6.74594 8.7372C7.38242 8.73443 7.89218 8.23891 7.89218 7.62158ZM12.5232 7.6548C12.5405 7.04301 12.0451 6.53918 11.4 6.51704C10.7751 6.49489 10.2307 6.99318 10.2163 7.59943C10.2019 8.20845 10.7059 8.72059 11.3424 8.7372C11.976 8.75657 12.5059 8.26936 12.5232 7.6548Z"
        fill="white"
      />
      <Path
        d="M1.3659 7.73783C1.3659 9.06383 1.3659 10.3622 1.3659 11.7048C1.10094 11.6909 0.835979 11.7075 0.582539 11.6577C0.271499 11.5968 0.0612594 11.3311 0.0583794 11.0238C0.0497394 10.1518 0.0468594 9.27976 0.0583794 8.41052C0.0641394 8.04788 0.352139 7.77105 0.723659 7.7406C0.928139 7.72399 1.13838 7.73783 1.3659 7.73783Z"
        fill="white"
      />
      <Path
        d="M16.7422 7.74886C16.9956 7.74886 17.2404 7.72394 17.4766 7.75439C17.7847 7.79592 18.0353 8.07551 18.0411 8.38002C18.0526 9.26587 18.0555 10.149 18.0411 11.0348C18.0353 11.4002 17.7156 11.677 17.3355 11.6909C17.1425 11.6992 16.9495 11.6909 16.7422 11.6909C16.7422 10.3704 16.7422 9.06102 16.7422 7.74886Z"
        fill="white"
      />
      <Path
        d="M9.31782 3.38332C9.0903 3.38332 8.89734 3.38332 8.66982 3.38332C8.66982 3.1314 8.66406 2.88779 8.6727 2.64142C8.67846 2.51408 8.64102 2.44764 8.5143 2.39227C8.03046 2.17081 7.78278 1.66975 7.90662 1.1853C8.03046 0.689781 8.47398 0.352051 9.00102 0.352051C9.51654 0.352051 9.97158 0.695317 10.0868 1.16869C10.2106 1.67529 9.97158 2.16527 9.4791 2.39227C9.35526 2.45041 9.31206 2.51131 9.31782 2.64142C9.32646 2.88226 9.31782 3.1231 9.31782 3.38332Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_94_1875">
        <Rect
          width={18}
          height={17}
          fill="white"
          transform="translate(0.0498047 0.352051)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);

/* =========================================
   Single chat message
========================================= */
type ChatMessageType = {
  role: string;
  text?: string;
  isError?: boolean;
};

const Chatmessage = ({ chat }: { chat: ChatMessageType }) => {
  const isUser = chat.role === 'user';
  if (chat.text == null) return null;
  return (
    <View
      style={[
        styles.messageWrapper,
        isUser ? styles.userMessage : styles.botMessage,
      ]}
    >
      {isUser ? (
        <View style={styles.userIcon}>
          <Icon name="user" size={20} color="#666" />
        </View>
      ) : (
        <View style={styles.botIcon}>
          <Chatboticon />
        </View>
      )}
      <View style={isUser ? styles.userMessageBubble : styles.botMessageBubble}>
        <Text style={{ color: chat.isError ? '#B00020' : '#111' }}>
          {chat.text}
        </Text>
      </View>
    </View>
  );
};

/* =========================================
   Live prices (CoinGecko)
========================================= */
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
      // Keep previous prices on error
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
async function callGemini(prompt) {
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

/* =========================================
   Crypto Assistant Logic
========================================= */
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

  const isCryptoIntent = m =>
    /(btc|bitcoin|eth|ethereum|sol|solana|xrp|ripple|crypto|coin|wallet|exchange|trade|price|portfolio|buy|sell|tax|staking|defi)/i.test(
      m,
    );

  const isQuestion = m =>
    /\?\s*$/.test(m) ||
    /^(can|how|what|why|when|where|which|should|is|are|do|does|did|will|would|could|may|might)\b/i.test(
      m,
    );

  const fmt = n =>
    `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  const brand = txt => `${txt}\n\n— KRIP AI Assistant`;

  const handle = useCallback(
    async message => {
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

/* =========================================
   Quick Action Chips
========================================= */
const QuickChips = ({ onPick }) => {
  const chips = [
    { label: 'Prices', text: 'price' },
    { label: 'Portfolio', text: 'portfolio' },
    { label: 'Buy BTC $100', text: 'buy btc 100' },
    { label: 'News', text: 'news' },
    { label: 'Help', text: 'help' },
  ];
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.chipsContainer}
    >
      {chips.map(c => (
        <TouchableOpacity
          key={c.label}
          onPress={() => onPick(c.text)}
          style={styles.chip}
        >
          <Text style={styles.chipText}>{c.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

/* =========================================
   Input Form
========================================= */
const Chatform = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const [input, setInput] = useState('');

  const send = text => {
    if (!text.trim()) return;
    const updated = [
      ...chatHistory,
      { role: 'user', text },
      { role: 'model', text: 'Thinking...' },
    ];
    setChatHistory(updated);
    generateBotResponse(updated);
    setInput('');
  };

  return (
    <View style={styles.formContainer}>
      <QuickChips onPick={send} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Ask me anything about crypto..."
          value={input}
          onChangeText={setInput}
          style={styles.input}
          returnKeyType="send"
          onSubmitEditing={() => send(input)}
          placeholderTextColor="#999"
        />
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
export const KripAiScreen = () => {
  const [transakUrl, setTransakUrl] = useState('');
  const [showTransak, setShowTransak] = useState(false);
  const [amountModal, setAmountModal] = useState({
    open: false,
    side: 'Buy',
    symbol: 'BTC',
    amount: '',
  });

  const openAmountModal = (side, symbol) =>
    setAmountModal({
      open: true,
      side: side === 'buy' ? 'Buy' : 'Sell',
      symbol,
      amount: '',
    });

  const openTransak = useCallback((symbol, amount, side) => {
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
    onOpenTransak: (sym, amt, side) => openTransak(sym, amt, side),
    openAmountModal,
  });

  const [chatHistory, setChatHistory] = useState([
    {
      role: 'model',
      text: "👋 Welcome to KRIP AI!\n\nI can help you with crypto prices, trading, portfolio management, and answer your questions.\n\nTry: 'price btc', 'buy eth 50', or ask me anything!\n\n— KRIP AI Assistant",
    },
  ]);
  const scrollRef = useRef();

  const generateBotResponse = async history => {
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
          copy.splice(idx, 1, { role: 'model', text });
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

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>KRIP AI</Text>
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
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
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
  },
  chipsContainer: {
    maxHeight: 44,
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chipText: {
    color: '#333',
    fontSize: 14,
  },
  formContainer: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 24,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#ff8c00',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  userIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  botIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#ff8c00',
    borderRadius: 18,
  },
  userMessageBubble: {
    maxWidth: '75%',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  botMessageBubble: {
    maxWidth: '75%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 16,
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
});
