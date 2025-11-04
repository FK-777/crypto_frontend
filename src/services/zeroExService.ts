// src/services/zeroExService.ts
const ZERO_X_API_KEY = '1482c004-2e55-4ede-893f-3271a178e9bb';
const ZERO_X_BASE_URL = 'https://api.0x.org';

export interface SwapQuoteParams {
  chainId: number;
  sellToken: string;
  buyToken: string;
  sellAmount: string;
  taker: string;
}

export interface SwapQuote {
  chainId: number;
  price: string;
  estimatedPriceImpact: string;
  buyAmount: string;
  sellAmount: string;
  buyToken: string;
  sellToken: string;
  allowanceTarget: string;
  to: string;
  data: string;
  value: string;
  gas: string;
  gasPrice: string;
}

export const getSwapQuote = async (
  params: SwapQuoteParams,
): Promise<SwapQuote> => {
  const { chainId, sellToken, buyToken, sellAmount, taker } = params;

  const url = `${ZERO_X_BASE_URL}/swap/permit2/quote?chainId=${chainId}&sellToken=${sellToken}&buyToken=${buyToken}&sellAmount=${sellAmount}&taker=${taker}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        '0x-api-key': ZERO_X_API_KEY,
        '0x-version': 'v2',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`0x API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching swap quote:', error);
    throw error;
  }
};

export const executeSwap = async (quote: SwapQuote) => {
  console.log('Executing swap with quote:', quote);
  throw new Error('Swap execution not yet implemented');
};
