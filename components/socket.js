import React from "react";
import {
  Card,
  CardBody,
  Container,
  Flex,
  Text,
  Box,
  Image,
  Stat,
  StatNumber,
  StatArrow,
  StatGroup,
  StatHelpText
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
            <Box flex={1} m={1} display={"flex"} flexDirection="row" alignItems="center">
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
            <Stat color="white" textAlign="right" flex={1}>
              <StatNumber>${Number(data.c) > 0.01 ? Number(data.c).toFixed(2) : Number(data.c)}</StatNumber>
              <StatHelpText>
                <StatArrow type={data.p >= 0 ? "increase" : "decrease"}></StatArrow>
                {Number(data.P).toFixed(2)}%
              </StatHelpText>
            </Stat>
          </Flex>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Socket;
