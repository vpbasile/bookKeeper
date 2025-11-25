import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Badge, Box, Collapse, Flex, HStack, Heading, IconButton, StackDivider, Text, VStack, Wrap, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { TBook } from "../types";
import CountBadge from "./CountBadge";

interface CollapsibleShelfProps {
    title: string;
    books: TBook[];
    isOpen?: boolean;
}

export default function CollapsibleShelf({ title, books, isOpen: externalIsOpen }: CollapsibleShelfProps) {
    const { isOpen, onToggle, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

    useEffect(() => {
        if (externalIsOpen !== undefined) {
            externalIsOpen ? onOpen() : onClose();
        }
    }, [externalIsOpen, onOpen, onClose]);

    const getPlatformColor = (platform: string) => {
        switch(platform) {
            case 'audible': return 'orange';
            case 'kindle': return 'orange';
            case 'chirp': return 'purple';
            case 'audiobooks-com': return 'amber';
            case 'libby': return 'cyan';
            default: return 'gray';
        }
    };

    return (
        <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
        >
            <HStack justify="space-between" mb={isOpen ? 3 : 0}>
                <Heading size="md">
                    {title}{" "}
                    <CountBadge amount={books.length} />
                </Heading>
                <IconButton
                    aria-label={isOpen ? "Collapse shelf" : "Expand shelf"}
                    icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={onToggle}
                    variant="ghost"
                    size="sm"
                />
            </HStack>

            <Collapse in={isOpen} animateOpacity>
                <VStack
                    align="stretch"
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={3}
                >
                    {books.map((book) => (
                        <Flex key={book.id} justify="space-between">
                            <Box flex="1">
                                <Text fontWeight="bold">{book.title}</Text>
                                <Text fontSize="sm">
                                    {book.author}
                                </Text>
                                {book.platforms && book.platforms.length > 0 && (
                                    <Wrap mt={1} spacing={1}>
                                        {book.platforms.map(platform => (
                                            <Badge 
                                                key={platform} 
                                                colorScheme={getPlatformColor(platform)}
                                                fontSize="xs"
                                            >
                                                {platform}
                                            </Badge>
                                        ))}
                                    </Wrap>
                                )}
                            </Box>
                        </Flex>
                    ))}
                </VStack>
            </Collapse>
        </Box>
    );
}