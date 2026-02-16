import { Box, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import ColorModeButton from "./ButtonColorMode";
import LinkButton from "./ButtonLink";


export default function Footer() {
    return (
        <Box
            id="footer"
            borderTop="2px"
            borderColor="gray.200"
            mt={{ base: 8, md: 12 }}
            pt={{ base: 4, md: 6 }}
            pb={{ base: 4, md: 6 }}
        >
            <Stack
                direction={{ base: 'column', md: 'row' }}
                justify={{ base: 'center', md: 'flex-end' }}
                align="center"
                spacing={{ base: 4, md: 2 }}
            >
                <Wrap justify={{ base: 'center', md: 'flex-end' }} spacing={2}>
                    <WrapItem>
                        <ColorModeButton />
                    </WrapItem>
                    <WrapItem>
                        <LinkButton href="https://chakra-ui.com/">
                            ChakraUI
                        </LinkButton>
                    </WrapItem>
                    <WrapItem>
                        <LinkButton
                            href="https://chakra-ui.com/docs/components/icon/usage#all-icons"
                            shortText="Icons"
                        >
                            Icon Reference
                        </LinkButton>
                    </WrapItem>
                    <WrapItem>
                        <LinkButton
                            href="https://chakra-ui-cheatsheet.vercel.app/"
                            shortText="Cheat"
                        >
                            Cheat Sheet
                        </LinkButton>
                    </WrapItem>
                    <WrapItem>
                        <LinkButton href="https://play.chakra-ui.com/playground">
                            Playground
                        </LinkButton>
                    </WrapItem>
                </Wrap>
            </Stack>
            <Text
                textAlign={{ base: 'center', md: 'right' }}
                mt={4}
                fontSize={{ base: 'sm', md: 'md' }}
            >
                bookKeeper
            </Text>
        </Box>
    );
}