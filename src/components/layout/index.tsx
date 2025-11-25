import { Box, Button, ButtonGroup, Collapse, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import SandboxFooter from './footer';

export default function Layout() {

    const [isOpen, setIsOpen] = useState(false);

    return (<VStack>
        <HStack spacing={8} marginTop={8} justifyContent={'center'}>
            <Link to="/"><Text size={'3xl'} color='green'>bookKeeper</Text></Link>
            {/* <Link to={"/about"} ><Text size={'3xl'}>About Page</Text></Link> */}
            <Link to={"/all"} ><Text size={'3xl'}>All Books</Text></Link>
            <Link to={"/read"} ><Text size={'3xl'}>Read Books</Text></Link>
            <Link to={"/unread"} ><Text size={'3xl'}>Unread Books</Text></Link>
        </HStack>
        <Box id='viewControls' mb={6} mt={4} p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md">
            <Button onClick={() => setIsOpen(!isOpen)} mb={2}>
                {isOpen ? 'Hide' : 'Show'} Filter/Sort/Group
            </Button>
            <Collapse in={isOpen}>
                {/* Filter:read/unread/all */}
                <Text>Filter:</Text>
                <ButtonGroup isAttached variant="subtle" colorScheme="green" ml={4}>
                    <Button>All</Button>
                    <Button>Read</Button>
                    <Button>Unread</Button>
                </ButtonGroup>
                {/* Sort by: title/author */}
                <Text>Sort by:</Text>
                <ButtonGroup isAttached variant="subtle" ml={4}>
                    <Button colorScheme="green">Title</Button>
                    <Button colorScheme="gray">Author</Button>
                </ButtonGroup>
                {/* Group by: genre/read status/platform */}
                <Text>Group by:</Text>
                <ButtonGroup isAttached variant="subtle" ml={4}>
                    <Button colorScheme="gray">Genre</Button>
                    <Button colorScheme="gray">Read Status</Button>
                    <Button colorScheme="gray">Platform</Button>
                </ButtonGroup>
            </Collapse>
        </Box>
        <Box id='mainBody' p={9}>
            {/* This is where the children will be rendered */}
            <Outlet />
        </Box>
        <SandboxFooter />
    </VStack>)
}