import styled from "@emotion/styled"

const Result = ({price}) => {
  const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = price
  return (
    <div>
        <p>Price: <span>{PRICE}</span></p>
        <p>Highest price today: <span>{HIGHDAY}</span></p>
        <p>Lowest price today: <span>{LOWDAY}</span></p>
        <p>variation last 24 hours: <span>{CHANGEPCT24HOUR}</span></p>
        <p>Last update: <span>{LASTUPDATE}</span></p>
        
    </div>
  )
}

export default Result