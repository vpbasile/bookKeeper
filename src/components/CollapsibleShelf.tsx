import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Collapse, HStack, Heading, IconButton, StackDivider, VStack, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import { TBook } from "../types";
import CountBadge from "./CountBadge";
import DisplayBookInfo from "./DisplayBookInfo";

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
                    id={"title-".concat(title.replace(/\s+/g, '-').toLowerCase())}
                    align="stretch"
                    divider={<StackDivider borderColor="gray.200" />}
                    spacing={3}
                >
                    {books.map((book) => <DisplayBookInfo book={book} />)}
                </VStack>
            </Collapse>
        </Box>
    );
}
