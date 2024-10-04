import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Flex,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";

const Socket = ({ data }) => {
  const ticker = data.s.endsWith("USDT")
    ? data.s.slice(0, -4)
    : data.s.endsWith("BTC")
    ? data.s.slice(0, -3)
    : data.s;
  return (
    <Container color={"white"} bg="inherit">
      <Card bg="#202020" m={2} p={2} borderRadius="10px">
        <CardBody>
          <Flex justifyContent="space-between" alignItems="center">
            <Box m={1} display={"flex"} flexDirection="row" alignItems="center">
              <Image
                mr={2}
                bg='white'
                border={"2px solid white"}
                borderRadius="100%"
                boxSize={"40px"}
                alt={ticker + "-logo"}
                src={`https://sriram-23.vercel.app/crypto?file=${ticker}`}
              />
              <Text color="white" fontWeight="bold" ml={2}>{ticker}</Text>
            </Box>
            <Text color="white">${Number(data.c) > 0.01 ? Number(data.c).toFixed(2) : Number(data.c)}</Text>
            {/* <Text>${Number(data.v) > 0.01 ? Number(data.v).toFixed(2) : Number(data.v)}</Text> */}
            <Text color={data.P >= 0 ? "green" : "red"}>{Number(data.P).toFixed(2)}%</Text>
          </Flex>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Socket;
