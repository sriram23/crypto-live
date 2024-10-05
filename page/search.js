import {useState} from 'react'
import { Box, Input } from "@chakra-ui/react"
import { useOutletContext } from "react-router-dom"
import Socket from '../components/socket'

const Search = () => {
    const {coins, error} = useOutletContext()
    const [finalCoins, setFinalCoins] = useState(null)
    const searchCoin = (e) => {
        console.log("Coins: ", coins)
        console.log("Error: " + error)
        if(!error) {
            setFinalCoins(null)
            const searchCoins =  coins.filter(coin => coin.s.endsWith('USDT')).filter(coin => coin.s.startsWith(e.target.value.toUpperCase()))
            console.log("Search Coins: ", searchCoins)
            if(e.target.value.length) {
                setFinalCoins(searchCoins)
            } else {
                setFinalCoins(null)
            }
        }
    }
    return (
        <Box m={2}>
            <Input type="search" placeholder="BTC" onChange={searchCoin} onClear={() => setFinalCoins(null)}/>
            <Box display="flex" flexWrap="wrap">
                {finalCoins?.map(coin => <Socket data={coin} />)}
            </Box>
        </Box>
    )
}

export default Search