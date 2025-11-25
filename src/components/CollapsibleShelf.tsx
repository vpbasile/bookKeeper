import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Collapse, HStack, Heading, IconButton, StackDivider, Text, VStack, useDisclosure } from "@chakra-ui/react";
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
                        <HStack key={book.id} justify="space-between">
                            <Box>
                                <Text fontWeight="bold">{book.title}</Text>
                                <Text fontSize="sm" color="gray.600">
                                    {book.author}
                                </Text>
                            </Box>
                        </HStack>
                    ))}
                </VStack>
            </Collapse>
        </Box>
    );
}