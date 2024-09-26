import { useRecoilValue } from "recoil"
import { currency } from "./index";
import { id } from "./index";
const currentCurrency = useRecoilValue(currency)
const currentId = useRecoilValue(id)
export const CoinList = () =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
  
  export const SingleCoin = () =>
    `https://api.coingecko.com/api/v3/coins/${currentId}`;
  
  export const HistoricalChart = (days = 365) =>
    `https://api.coingecko.com/api/v3/coins/${currentId}/market_chart?vs_currency=${currentCurrency}&days=${days}`;
  
  export const TrendingCoins = () =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;