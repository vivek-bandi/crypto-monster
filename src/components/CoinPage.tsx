import axios from "axios"
import { useState, useEffect } from "react"
import CoinInfo from "./CoinInfo"
import { useParams } from "react-router-dom"
import parse from 'html-react-parser';
import LoadingComp from "./LoadingComp"
import { numberWithCommas } from "./Carousel"
const CoinPage = () => {
  const [loading, setloading] = useState(false)
  const {id} = useParams<{id: string}>()
  const [coin, setCoin] = useState<CoinInfoProps>({
    image: {large: ""},
    name: "",
    symbol: "",
    market_cap_rank: 0,
    market_data: {current_price: {usd: 0}, market_cap: {usd: 0}},
    description:{
      en: ""
    }
  })
  interface CoinInfoProps {
    image: {large: string}
    name: string,
    market_cap_rank: number,
    market_data: { current_price: {usd: number}, market_cap: {usd: number}},
    symbol: string,
    description: {
      en: string
    }
  }
  const getCoin = async() => {
    setloading(true)
    const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
    setCoin(data)
    setloading(false)
  }
  useEffect(() => {
    getCoin()
  }, [id])
  const symbol = "$"
  return (
    <>
   {loading ? <LoadingComp/> : 
   <div className="flex flex-col md:flex-row bg-gray-950 text-white min-h-[100vh] h-auto items-start">
    <div className="border-0 md:border-r-2 md:border-gray-200 mt-2">
     <div className="w-full md:w-[32vw] h-auto flex flex-col items-center mt-2">
        <img src={coin.image.large} className="h-44 mb-4" alt="" />
        <div className="font-extrabold my-5 text-6xl">{coin.name}</div>
        <div className="pr-3 pl-3 md:pl-6 font-normal text-gray-200 text-base tracking-widest md:text-base w-full md:w-[28vw]">{parse(coin.description.en.split(". ")[0])}</div>
      </div>
        <div className="font-bold text-2xl md:text-3xl w-full gap-4 mt-6 pl-12">
          <div className="py-3">Rank: <span className="font-semibold text-gray-100">{numberWithCommas(coin.market_cap_rank)}</span></div>
          <div className="py-3">Current Price: <span className="font-semibold text-gray-100">{numberWithCommas(coin.market_data.current_price.usd)}$</span></div>
          <div className="py-3">Market Cap: <span className="font-semibold text-gray-100">{symbol}{numberWithCommas(coin.market_data.market_cap.usd.toString().slice(0, -6))}M</span></div>
        </div>
      </div>
      <div className="w-full h-full">
        <CoinInfo coin={coin}/>
      </div>
    </div>
    }
    </>
  )
}

export default CoinPage
