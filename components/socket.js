import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Container, Flex, Text, Box } from '@chakra-ui/react'

const Socket = ({data}) => {
  const ticker = data.s.endsWith('USDT')?data.s.slice(0, -4): data.s.endsWith('BTC')?data.s.slice(0, -3):data.s
  return (
    <Container color={'white'}>
      <Card bg='#202020' m={2} p={6} borderRadius={5}>
        {/* 
        TODO: NEED TO REVISIT
        <Box>
          <img alt={ticker+"-logo"} src={`https://bin.bnbstatic.com/static/assets/logos/${ticker}.png`} />
        </Box> */}
        <CardBody>
          <Text>{ticker}</Text>
        </CardBody>
        <CardBody>
          <Flex justifyContent={'space-between'}>
            <Text>${data.c}</Text>
            <Text color={data.P>=0?'green':'red'}>{data.P}%</Text>
          </Flex>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Socket;
