import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Socket from './components/socket';

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
            console.log("Coins: ", data)
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
        <div>
            {
                error? (<p>Error: {error}</p>):coins?.length?(
                    <div>
                        {/* {coins.slice(0,10).map(coin => <Socket data={coin}/>)} */}
                        {/* <h2>Top Hot Coins</h2>
                        {hotCoins?.map(coin => <Socket data={coin} />)} */}
                        <h2>Top Gainers</h2>
                        {topGainers?.map(coin => <Socket data={coin} />)}
                        <h2>Top Losers</h2>
                        {topLosers?.map(coin => <Socket data={coin} />)}
                    </div>
                ) : (<p>Loading ticker data...</p>)
            }
            
        </div>
    )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
