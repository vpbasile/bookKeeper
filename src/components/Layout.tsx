import { Box, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from './LayoutFooter';
import Header from './LayoutHeader';

export default function Layout() {

    return (<VStack>
        <Header />
        <Box id='mainBody' p={9}>
            {/* This is where the children will be rendered */}
            <Outlet />
        </Box>
        <Footer />
    </VStack>)
}