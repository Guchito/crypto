import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Error from './Error.jsx'
import useSelectCoin from '../hooks/useSelectCoin'
import {coins} from '../data/coins.js'


const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 20px;

  &:hover{
    background-color: #7A7DFE;
    cursor: pointer;
  }
`

const Form = () => {
  
  const [cryptos, setCryptos] = useState([])
  const [error, setError] = useState(false)

  const [SelectCoin, coin] = useSelectCoin('Select your currency', coins)
  const [SelectCryptocurrency, cryptocurrency] = useSelectCoin('Select your cryptocurrency', cryptos)
 
  useEffect(() => {
    const getApi = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
      
      const response = await fetch(url)
      const result = await response.json()

      const arrayCripto = result.Data.map(crypto => {
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName
        }
        return object
      })
      setCryptos(arrayCripto)
    }
    getApi()
  },[])
  
  const handleSubmit = e => {
    e.preventDefault()
    if([coin, cryptocurrency].includes('')){
      setError(true)
      return
    }
    setError(false)
  }
  return (
    <>
      {error && <Error>Both fields are require</Error>}
      <form
        onSubmit={handleSubmit}
      >
          <SelectCoin />
          <SelectCryptocurrency/>
          <InputSubmit 
            type='submit' 
            value='Check price' />

      </form>
    
    
    </>
  )
}

export default Form