import React from 'react';
import ReactDOM from 'react-dom/client';
import { Box, Text, ChakraProvider } from '@chakra-ui/react';
import Home from './page/home';

const App = () => {
    return(
        <ChakraProvider>
            <Box border="1px solid #202020" p={6} position="sticky" top={0} zIndex={999} bgGradient="radial-gradient(circle at center, #121212, #0d0d0d)">
                <Text fontSize="3xl" textAlign="center" as="h1">🪙 Crypto Currency Live 🔴</Text>
            </Box>
            <Home/>
        </ChakraProvider>
    )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)
