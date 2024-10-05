import React, {useState} from "react";
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
  Icon
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import Home from "./page/home";

const App = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => {
        setIsOpen(false);
    }
  return (
    <ChakraProvider>
      <Box
        border="1px solid #202020"
        p={6}
        position="sticky"
        top={0}
        zIndex={999}
        bgGradient="radial-gradient(circle at center, #121212, #0d0d0d)"
      >
        <Text fontSize={{base: "md", md:"3xl"}} fontStyle="bold" textAlign="center" as="h1">
          🪙 Crypto Currency Live 🔴
        </Text>
        {/* <IconButton icon={<HamburgerIcon/>} /> */}
        <Button bg="#202020" color="white" position="absolute" right={{base: 5, md:10}} top={5} onClick={() => setIsOpen(true)}><Icon as={AiOutlineMenu}/></Button>
      </Box>
      <Home />

      {/* Drawer */}
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgGradient="radial-gradient(circle at center, #121212, #0d0d0d)">
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            {/* <Input placeholder='Type here...' /> */}
            Hello World!
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ChakraProvider>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
