import {useState, useEffect} from 'react'
import { Card, CardBody, CardHeader, Box, Text, Grid, GridItem, Spinner, Flex } from '@chakra-ui/react';

import Socket from '../components/socket';
const Home = () => {
    const [coins, setCoins] = useState(null)
    const [topGainers, setTopGainers] = useState(null)
    const [topLosers, setTopLosers] = useState(null)
    const [hotCoins, setHotCoins] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr')

        socket.onopen = () => {
            console.log('Coins socket connected');
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            setCoins(data)
        }

        socket.onerror = (err) => {
            console.error("Coins socket error: ", err)
            setError(err)
        }

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.close();
        };
    }, [])

    useEffect(() => {
        if (coins?.length) {
            // Sort by percentage change
            const sortedByChange = [...coins].sort((a, b) => parseFloat(b.P) - parseFloat(a.P)).filter(item => item.s.endsWith('USDT'));

            // Top gainers (positive percentage change)
            setTopGainers(sortedByChange.filter(t => parseFloat(t.P) > 0).slice(0, 10));

            // Top losers (negative percentage change)
            setTopLosers(sortedByChange.filter(t => parseFloat(t.P) < 0).slice(-10).reverse());

            // Filtering out the hot coins and sorting them by percentage change
            const hot = ["BNBUSDT", "BTCUSDT", "ETHUSDT", "NEIROUSDT", "PEPEUSDT", "SOLUSDT", "SUIUSDT", "SHIBUSDT", "HMSTRUSDT", "XRPUSDT"]
            const filterHotCoins = [...coins].filter(item => hot.includes(item.s)).sort((a, b) => parseFloat(b.P) - parseFloat(a.P))
            setHotCoins(filterHotCoins);
          }
    }, [coins])
    return (
        <div color='white'>
            {
                error? (<p>Error: {error}</p>):coins?.length?(
                    <Grid templateColumns={{ base: "1fr", xl: "repeat(3, 1fr)"}} gap={2}>
                        <GridItem>
                        <Card m={2} bg="inherit" color="inherit" margin="inherit">
                            <CardHeader>
                                <Text fontSize={"2xl"} textAlign="center">Hot Coins 🔥</Text>
                            </CardHeader>
                            <CardBody>
                                {hotCoins?.map(coin => <Socket data={coin} />)}
                            </CardBody>
                        </Card>
                        </GridItem>
                        <GridItem>
                        <Card m={2} bg="inherit" color="inherit" margin="inherit">
                            <CardHeader>
                                <Text fontSize={"2xl"} textAlign="center">Top Gainers 🚀</Text>
                            </CardHeader>
                            <CardBody>
                                {topGainers?.map(coin => <Socket key={coin.s} data={coin} />)}
                            </CardBody>
                        </Card>
                        </GridItem>
                        <GridItem>
                        <Card flex={1} m={2} bg="inherit" color="inherit" margin="inherit">
                            <CardHeader>
                                <Text fontSize={"2xl"} textAlign="center">Top Losers 👎</Text>
                            </CardHeader>
                            <CardBody>{topLosers?.map(coin => <Socket key={coin.s} data={coin} />)}</CardBody>
                        </Card>
                        </GridItem>
                        </Grid>
                ) : (<Flex alignItems="center" justifyContent="center"><Spinner m={2}/><Text textAlign="center" fontSize="2xl">Loading data...</Text></Flex>)
            }
        </div>
    )
}

export default Home