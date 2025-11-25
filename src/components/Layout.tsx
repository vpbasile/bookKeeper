import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import SandboxFooter from './LayoutFooter';

export default function Layout() {

    return (<VStack>
        <HStack spacing={8} marginTop={8} justifyContent={'center'}>
            <Link to="/"><Text size={'3xl'} color='green'>bookKeeper</Text></Link>
            {/* <Link to={"/about"} ><Text size={'3xl'}>About Page</Text></Link> */}
            <Link to={"/all"} ><Text size={'3xl'}>All Books</Text></Link>
            <Link to={"/read"} ><Text size={'3xl'}>Read Books</Text></Link>
            <Link to={"/unread"} ><Text size={'3xl'}>Unread Books</Text></Link>
        </HStack>
        <Box id='mainBody' p={9}>
            {/* This is where the children will be rendered */}
            <Outlet />
        </Box>
        <SandboxFooter />
    </VStack>)
}