import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Socket from './components/socket';
import { Card, CardBody, CardHeader, Box, Text, Grid, GridItem, ChakraProvider } from '@chakra-ui/react';

const App = () => {
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
            
            // TODO: NEED TO REVISIT this logic
            // Hot coins based on volume (v is the volume field)
            const sortedByVolume = [...coins].sort((a, b) => parseFloat(b.v) - parseFloat(a.v));
            setHotCoins(sortedByVolume.slice(0, 10));
          }
    }, [coins])
    return(
        <ChakraProvider>
        <div color='white'>
            <Text fontSize="3xl" textAlign="center">Crypto Currency Live</Text>
            {
                error? (<p>Error: {error}</p>):coins?.length?(
                    // <Box display={'flex'} flexDirection={{ base: "column", md:"row" }} >
                    <Grid templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)"}} gap={4}>
                        <GridItem>
                        <Card flex={1} m={2} bg="inherit" color="inherit" margin="inherit">
                            <CardHeader>
                                <Text fontSize={"2xl"} textAlign="center">Top 10 Gainers</Text>
                            </CardHeader>
                            <CardBody>
                                {topGainers?.map(coin => <Socket key={coin.s} data={coin} />)}
                            </CardBody>
                        </Card>
                        </GridItem>
                        <GridItem>
                        <Card flex={1} m={2} bg="inherit" color="inherit" margin="inherit">
                            <CardHeader>
                                <Text fontSize={"2xl"} textAlign="center">Top 10 Losers</Text>
                            </CardHeader>
                            <CardBody>{topLosers?.map(coin => <Socket key={coin.s} data={coin} />)}</CardBody>
                        </Card>
                        </GridItem>
                        <GridItem>
                        <Card flex={1} m={2} bg="inherit" color="inherit" margin="inherit">
                            <CardHeader>
                                <Text fontSize={"2xl"} textAlign="center">Top 10 Coins by volume</Text>
                            </CardHeader>
                            <CardBody>
                                {hotCoins?.map(coin => <Socket data={coin} />)}
                            </CardBody>
                        </Card>
                        </GridItem>
                        </Grid>
                    // </Box>
                ) : (<Text textAlign="center">Loading ticker data...</Text>)
            }
        </div>
        </ChakraProvider>
    )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
