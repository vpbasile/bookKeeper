import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
export default function Header() {
    return <Flex
        as="nav"
        p={{ base: 3, md: 4, lg: 5 }}
        shadow="md"
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
    >
        <Link to="/"><Text size={'3xl'} color='green'>bookKeeper</Text></Link>
        {/* <Link to={"/about"} ><Text size={'3xl'}>About Page</Text></Link> */}
        {/* <Link to={"/all"} ><Text size={'3xl'}>All Books</Text></Link>
        <Link to={"/read"} ><Text size={'3xl'}>Read Books</Text></Link>
        <Link to={"/unread"} ><Text size={'3xl'}>Unread Books</Text></Link> */}
    </Flex>
}