import { useEffect, useState } from 'react'
import { currency } from '../store'
import { useRecoilValue } from 'recoil'
import axios from 'axios'
import './Navbar.css'
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'
import LoadingComp from './LoadingComp'
export function numberWithCommas(x: any){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}
const Carousel = () => {
  const [loading, setloading] = useState(false)
    const currentCurrency = useRecoilValue(currency)
    useEffect(() => {
        GetCoins()
    }, [])
    
    
    interface trendingCoinInter{
        name: string,
        id: number,
        image: string,
        symbol: string,
        price_change_percentage_24h: number,
        current_price: string
    }
    
    
    const [coin, setcoin] = useState<trendingCoinInter[]>([])
    const GetCoins= async()=>{
      setloading(true)
        const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
        setcoin(data)
        setloading(false)
    }
    const items = coin.map((c) => {
        let price = c.price_change_percentage_24h >= 0;
        return (
        <Link to={`/coins/${c.id}`} className='px-14 mt-2 flex flex-col justify-center items-center text-center gap-2'>
            <img className='min-w-24 max-w-24' src={c.image} alt="" />
            <span className='text-white mt-2 font-bold'>{c.symbol.toUpperCase()}<span className={`font-bold ${price ? 'text-green-700': 'text-red-700'}`}>{price && " +"} {c?.price_change_percentage_24h?.toFixed(2)}%</span></span>
            <span className='text-white font-bold text-xl'>$ {numberWithCommas(parseFloat(c.current_price)?.toFixed(2))}</span>
        </Link>)
    })
    const responsive = {
      0: {
        items: 2
      },
      512: {
        items: 4
      }
    }
  
  return (<>{loading? <LoadingComp/> : 
    <div className="banner h-[53vh] w-full">
      <div className='w-full pl-28'>
    <div className='flex flex-col justify-center'>
        <h1 className='text-center text-white font-bold text-5xl my-4'>Crypto Monster</h1>
        <span className='text-center text-slate-100 font-light my-4'>Get all the info Regarding your Favorite Crypto Currency</span>
      <AliceCarousel mouseTracking infinite responsive={responsive} autoPlayInterval={1000} autoPlay disableDotsControls animationDuration={1500} disableButtonsControls items={items}/>
    </div>
    </div>
    </div>
    }</>
  )
}

export default Carousel
