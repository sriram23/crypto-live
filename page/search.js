import {useEffect, useState} from 'react'
import { Box, Input } from "@chakra-ui/react"
import { useOutletContext } from "react-router-dom"
import Socket from '../components/socket'
import { useSelector } from 'react-redux'

const Search = () => {
    const {error} = useOutletContext()
    const coins = useSelector(state => state.crypto.value)
    const [finalCoins, setFinalCoins] = useState(null)
    const [query, setQuery] = useState("")

    useEffect(() =>{
        searchCoin(query)
    }, [coins, query, setQuery])
    const searchCoin = (q) => {
        if(!error) {
            setFinalCoins(null)
            const searchCoins =  coins?.filter(coin => coin.s.endsWith('USDT')).filter(coin => coin.s.startsWith(q.toUpperCase()))
            if(q.length) {
                setFinalCoins(searchCoins)
            } else {
                setFinalCoins(null)
            }
        }
    }
    return (
        <Box m={2}>
            <Input type="search" placeholder="BTC" onChange={(e) => setQuery(e?.target?.value)} onClear={() => setFinalCoins(null)}/>
            <Box display="flex" flexWrap="wrap">
                {finalCoins?.map(coin => <Socket data={coin} />)}
            </Box>
        </Box>
    )
}

export default Search