import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Badge, Box, Collapse, Grid, GridItem, HStack, Heading, IconButton, StackDivider, Text, VStack, Wrap, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import genres from "../data/genres.json";
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
            case 'audiobooks-com': return 'yellow';
            case 'libby': return 'cyan';
            case 'paperback': return 'green';
            case 'hardback': return 'teal';
            default: return 'gray';
        }
    };

    const getGenreName = (genreId: string) => {
        const genre = genres.find(g => g.id === genreId);
        return genre?.name || genreId;
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
                        <Grid
                            key={book.id}
                            templateColumns={{ base: "1fr", md: "2fr 1fr 2fr" }}
                            gap={3}
                            alignItems="start"
                        >
                            <GridItem>
                                <Text fontWeight="bold" fontSize={{ base: "md", md: "sm" }}>
                                    {book.title}
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    {book.author}
                                </Text>
                                {book.series && (
                                    <Text fontSize="xs" color="gray.500" fontStyle="italic">
                                        {book.series}
                                    </Text>
                                )}
                            </GridItem>

                            <GridItem>
                                <Text fontSize="xs" color="gray.500" mb={1} display={{ base: "block", md: "none" }}>
                                    Platforms
                                </Text>
                                <Wrap spacing={1}>
                                    {book.platforms && book.platforms.length > 0 ? (
                                        book.platforms.map(platform => (
                                            <Badge 
                                                key={platform} 
                                                colorScheme={getPlatformColor(platform)}
                                                fontSize="xs"
                                            >
                                                {platform}
                                            </Badge>
                                        ))
                                    ) : (
                                        <Text fontSize="xs" color="gray.400">—</Text>
                                    )}
                                </Wrap>
                            </GridItem>

                            <GridItem>
                                <Text fontSize="xs" color="gray.500" mb={1} display={{ base: "block", md: "none" }}>
                                    Genres
                                </Text>
                                <Wrap spacing={1}>
                                    {book.genreIds && book.genreIds.length > 0 ? (
                                        book.genreIds.map(genreId => (
                                            <Badge 
                                                key={genreId} 
                                                colorScheme="blue"
                                                variant="outline"
                                                fontSize="xs"
                                            >
                                                {getGenreName(genreId)}
                                            </Badge>
                                        ))
                                    ) : (
                                        <Text fontSize="xs" color="gray.400">—</Text>
                                    )}
                                </Wrap>
                            </GridItem>
                        </Grid>
                    ))}
                </VStack>
            </Collapse>
        </Box>
    );
}