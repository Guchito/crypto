import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Form from './components/Form'
import Result from './components/result'
import ImgCrypto from './img/imagen-criptos.png'


const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }

`
const Img = styled.img`
  max-width: 400px;
  width:80%;
  margin: 100px auto 0 auto;
  display: block;

`
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto auto

  }
`

function App() {

  const [coins, setCoins] = useState({})
  const [price, setPrice] = useState({})

  useEffect(() => {
    if(Object.keys(coins).length > 0){
      const quoteCrypto = async () => {
        const {coin, cryptocurrency} = coins
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${coin}`
        
        const response = await fetch(url)
        const result = await response.json()
        
        setPrice(result.DISPLAY[cryptocurrency][coin])
      }
      quoteCrypto()
    }
  },[coins])

  return (
    <Container>
      <Img 
        src={ImgCrypto}
        alt='Crypto images'
      />
      <div>
        <Heading> Crypto Prices in Real Time</Heading>
        <Form 
          setCoins = {setCoins}
        />

        {price.PRICE && <Result price={price}/>}
      </div>

    </Container>
  )
}

export default App
