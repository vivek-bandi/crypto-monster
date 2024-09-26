import { Link } from "react-router-dom"
// import { useState } from "react";
// import { useRecoilState } from "recoil";

const Navbar = () => {
  // const [recoilUser, setRecoilUser] = useRecoilState(currency)
  // const changeValue = (newCurrency: string) => {
  //   setRecoilUser(newCurrency)
  // };
  return (<>
<nav className="bg-gray-950 text-white">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <span className="flex items-center space-x-3 rtl:space-x-reverse">
        <Link to={'/'} className="self-center text-2xl md:text-4xl font-semibold whitespace-nowrap text-yellow-300">Crypto Monster</Link>
    </span>
    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul className="flex flex-col font-medium mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
        <li>
          <a href="https://github.com/aakashsaini09/Crypto-Monster.git" target="_blank" className="py-2 px-3 hover:text-yellow-400" aria-current="page">Github Code</a>
        </li>
        {/* <li>
          <a href="#" className="py-2 px-3 md:p-0">Linkedin</a>
        </li> */}
        <li>
        {/* <select id="currency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value={currency} onChange={(e) => changeValue(e.target.value)}>
        <option value="USD">USD</option>
        <option value="INR">INR</option>
        </select> */}
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    
    </>
  )
}

export default Navbar
