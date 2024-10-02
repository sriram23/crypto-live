import React, { useEffect, useState } from 'react';

const Socket = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Connect to the Binance WebSocket API for BTC/USDT ticker
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker');

    socket.onopen = () => {
      console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setData(data);
    };

    socket.onerror = (err) => {
      console.error('WebSocket error', err);
      setError('WebSocket connection error.');
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Cleanup on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2>Real-time BTC/USDT Ticker Data</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <div>
          <p><strong>Symbol:</strong> {data.s}</p>
          <p><strong>Price Change:</strong> ${data.p}</p>
          <p><strong>Price Change Percent:</strong> {data.P}</p>
          <p><strong>Weighted Average Price:</strong> {data.w}</p>
          <p><strong>Last Price:</strong> ${data.c}</p>
          <p><strong>Last Quantity:</strong> ${data.Q}</p>
          <p><strong>Best Bid Price:</strong> ${data.b}</p>
          <p><strong>Best Bid Quantity:</strong> {data.B}</p>
          <p><strong>Best Ask Price:</strong> ${data.a}</p>
          <p><strong>Best Ask Quantity:</strong> {data.A}</p>
          <p><strong>Open Price:</strong> ${data.o}</p>
          <p><strong>High Price:</strong> ${data.h}</p>
          <p><strong>Low Price:</strong> ${data.l}</p>
          <p><strong>Volume:</strong> {data.v}</p>
          <p><strong>Quote Volume:</strong> {data.q}</p>
          <p><strong>Open Time:</strong> {new Date(data.O).toLocaleString()}</p>
          <p><strong>Close Time:</strong> {new Date(data.C).toLocaleString()}</p>
          <p><strong>First Trade ID:</strong> {data.F}</p>
          <p><strong>Last Trade ID:</strong> {data.L}</p>
          <p><strong>Number of Trades:</strong> {data.n}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Socket;
