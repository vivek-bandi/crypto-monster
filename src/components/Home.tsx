import Carousel from "./Carousel"
import CoinTable from "./CoinTable"

const Home = () => {
  return (
    <div className="w-full h-auto min-h-[100vh] bg-gray-950">
        <Carousel/>
      <CoinTable/>
    </div>
  )
}

export default Home
