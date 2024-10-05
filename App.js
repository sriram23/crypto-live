import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  Box,
  Text,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Icon,
  Container,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { RouterProvider, createBrowserRouter, Outlet, Link } from "react-router-dom";
import Home from "./page/home";
import Search from "./page/search";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coins, setCoins] = useState(null)
  const [error, setError] = useState(null)
  const onClose = () => {
    setIsOpen(false);
  };

  // Calling the websocket connection
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

  const buttonObj = [{
    id: 1,
    text: "Home",
    navigate: "/"
  },
  {
    id: 2,
    text: "Search",
    navigate: "/search"
  }
]
  return (
    <Box w="100%">
      <Box
        border="1px solid #202020"
        p={6}
        position="sticky"
        top={0}
        zIndex={999}
        bgGradient="radial-gradient(circle at center, #121212, #0d0d0d)"
      >
        <Text
          fontSize={{ base: "md", md: "3xl" }}
          fontStyle="bold"
          textAlign="center"
          as="h1"
        >
          🪙 Crypto Currency Live 🔴
        </Text>
        <Button
          bg="#202020"
          color="white"
          position="absolute"
          right={{ base: 5, md: 10 }}
          top={5}
          onClick={() => setIsOpen(true)}
        >
          <Icon as={AiOutlineMenu} />
        </Button>
      </Box>
      {/* <Home /> */}
      <Outlet context={{coins, error}}/>

      {/* Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bgGradient="radial-gradient(circle at center, #121212, #0d0d0d)">
          <DrawerCloseButton />
          <DrawerHeader>Crypto Currency Live</DrawerHeader>

          <DrawerBody>
            <Box display="flex" flexDirection="column">
                {buttonObj.map(obj => <Link className="link" key={obj.id} to={obj.navigate}>{obj.text}</Link>)}
                {/* <Button>Home</Button>
                <Button>Search</Button> */}
            </Box>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <RouterProvider router={appRouter}></RouterProvider>
  </ChakraProvider>
);
