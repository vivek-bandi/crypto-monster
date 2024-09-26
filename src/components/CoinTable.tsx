import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { currency } from "../store"
import { numberWithCommas } from "./Carousel"
import { createTheme, Pagination } from "@mui/material"
import { ThemeProvider } from '@mui/system';
import { useNavigate } from "react-router-dom"
import LoadingComp from "./LoadingComp"
const CoinTable = () => {
    const currentCurrency = useRecoilValue(currency)
    useEffect(() => {
        GetCoins()
    }, [currency])
    interface allcoins{
        name: string,
        id: string,
        image: string,
        symbol: string,
        price_change_percentage_24h: number,
        current_price: string,
        market_cap: number
    }
    const [page, setpage] = useState(1)
    const [coins, setcoins] = useState<allcoins[]>([])
    const [loading, setloading] = useState(false)
    const GetCoins= async()=>{
      setloading(true)
        const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=gecko_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`)
        setcoins(data)
        setloading(false)
    }
    const [search, setSearch] = useState("");
    const handleSearch = () => {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    };
    const theme = createTheme({
      palette: {
        background: {
          paper: '#fc0800',
        },
        text: {
          primary: '#FFFF00',
          secondary: '#fc0800',
        },
        primary: {
          main: "#fc0800"
        },
        action: {
          active: '#fc0800',
        }
      },
    });
    const navigate = useNavigate()
    function goCoinPage(id: String){
      navigate(`/coins/${id}`)
      // console.log(id)
    }
   return (
     <div>{loading ? <LoadingComp/> : 
      <ThemeProvider theme={theme}>
        <div className="top">
            <h1 className="text-white text-4xl font-semibold text-center pt-24">Cryptocurrency Prices by Market Cap</h1>
        </div>
        <div className="w-full text-white flex justify-center items-center">
          <input onChange={(e) => setSearch(e.target.value)} type="text" className="bg-gray-950 border border-gray-700 text-gray-300 rounded-sm focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300 mt-4 p-3 py-5 text-base md:p4 md:pl-5 w-[78vw] " placeholder="Search for a crypto currency..." />
        </div>
        <div className="w-full flex justify-center">
          <div className="relative overflow-x-auto shadow-md rounded-sm flex items-center justify-center mt-6">
                <table className="w-[78vw] text-sm text-left rtl:text-right text-gray-500 mx-6 font-bold ">
                  <thead className="text-base uppercase bg-yellow-400 text-gray-900 h-16">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Coins
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                              24h Change
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Market Cap 
                          </th>
                      </tr>
                  </thead>
                  <tbody className="pt-5">
                    {handleSearch().slice((page -1) * 10, (page -1) * 10 +10).map((coin) => {
                      const profit = coin.price_change_percentage_24h > 0;
                      return <tr key={coin.symbol} className="text-white py-3 text-lg border-b border-gray-500 hover:bg-slate-900 cursor-pointer" onClick={() => goCoinPage(coin.id)}>
                          <th scope="row" className="px-2 py-4 gap-3 font-medium text-gray-100 whitespace-nowrap flex">
                              <img src={coin.image} className="w-20" alt="" /> <span className="text-gray-400 font-medium text-sm w-full my-auto"><span className="uppercase text-white text-base font-bold">{coin.symbol} </span><br/>{coin.name}</span>
                          </th>
                          <td className="px-6 py-4">
                              ${coin.current_price}
                          </td>
                          <td className={`px-6 py-4 ${profit ? 'text-green-600': 'text-red-600'}`}>
                          {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
                          </td>
                          <td className="px-6 py-4">
                          {numberWithCommas(coin.market_cap).toString().slice(0, -6)}M
                          </td>
                      </tr>  })}
                  </tbody>
                </table>
          </div>
        </div>
        <div className="w-full h-auto py-1">
        <Pagination size="large" color={"standard"} sx={{color: 'text.secondary'}} className="my-5 flex justify-center text-center" count={Number((coins.length/10).toFixed(0))} onChange={(_, value) => { setpage(value); window.scroll(0, 450)}}/>
        </div>
    </ThemeProvider>}
    </div>
  )
}

export default CoinTable
