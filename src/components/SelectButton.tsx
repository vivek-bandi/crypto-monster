
const SelectButton = ({children, selected, onClick}: any) => {
    
  return ( 
  <span className={`text-white bg-gray-950 border ${ selected? 'border-0 bg-yellow-400 text-black': 'border-yellow-400'} hover:bg-yellow-400 hover:border-0 hover:text-black hover:font-bold font-medium rounded-lg text-sm px-9 py-2.5 me-2 mb-2`} onClick={onClick}>
      {children}
    </span>
  )
}

export default SelectButton
