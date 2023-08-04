import React from 'react';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';


export default function Timer({setTime,setTimer}) {
    const timings = [
        {id:0,time:'1 hour',value:'60m'},
        {id:1,time:'45 minutes',value:'45m'},
        {id:2,time:'30 minutes',value:'30m'},
        {id:3,time:'20 minutes',value:'20m'},
        {id:4,time:'10 minutes',value:'10m'},
        {id:5,time:'5 minutes',value:'5m'},
    ]
    function event(time){
        setTime(time)
        setTimer(false)
    }
  return (
    <Flex justify='center' align='center' pos='fixed' top='0' left='0' bg='rgba(0,0,0,0.6)' width='100%' h='100vh'>
        <Flex justify='center' bg='white' flexDir='column' border='3px solid #252588' h='100%' maxH='300px'>
            <Text as='h2' fontSize='semi-bold' color='white' bg='#252588' p='5px' textAlign='center'>Self Timer</Text>
            <Box p='10px' >
            {timings.map(time=>(
                <Box key={time.id} p='10px' _hover={{bg:'lightgray'}}width='100%' onClick={()=>event(time.value)}>{time.time}</Box>
            ))}
            </Box>
        </Flex>
    </Flex>
  )
}