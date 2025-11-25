import { Heading, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
    return (<>
        <Heading as={'h2'}>An application to keep track of stories. Not to be confused with bbookkeeppeerr.</Heading>
        <HStack spacing={8} marginTop={8} justifyContent={'center'}>
            {/* <Link to={"/about"} ><Text size={'3xl'}>About Page</Text></Link> */}
            <Link to={"/all"} ><Text size={'3xl'}>All Books</Text></Link>
            <Link to={"/read"} ><Text size={'3xl'}>Read Books</Text></Link>
            <Link to={"/unread"} ><Text size={'3xl'}>Unread Books</Text></Link>
        </HStack>
    </>)
}