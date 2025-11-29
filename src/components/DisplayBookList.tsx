import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Button, ButtonGroup, Collapse, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import books from '../data/books.json';
import { readBooks, unreadBooks } from '../data/filters';
import genres from '../data/genres.json';
import platforms from '../data/platforms.json';
import { TBook } from '../types';
import CollapsibleShelf from './CollapsibleShelf';

interface BookListProps {
    filter: 'all' | 'read' | 'unread' | 'unowned' | 'owned';
}

const FILTER_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'read', label: 'Read' },
    { value: 'unread', label: 'Unread' },
    { value: 'unowned', label: 'Unowned' },
    { value: 'owned', label: 'Owned' },
] as const;

const GROUP_OPTIONS = [
    { value: 'none', label: 'None' },
    { value: 'genre', label: 'Genre' },
    { value: 'status', label: 'Status' },
    { value: 'author', label: 'Author' },
    { value: 'platform', label: 'Platform' },
] as const;

const SORT_OPTIONS = [
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
] as const;

export default function BookList({ filter }: BookListProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [expandControls, setExpandControls] = useState(true);
    const [expandAll, setExpandAll] = useState(false);

    const groupBy = searchParams.get('groupBy') || 'none';
    const sortBy = searchParams.get('sortBy') || 'title';

    const updateParam = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value);
        setSearchParams(newParams);
    };

    const changeFilter = (newFilter: string) => {
        navigate(`/${newFilter}?${searchParams.toString()}`);
    };

    // Filter books
    const getFilteredBooks = (): TBook[] => {
        const allBooks = Object.values(books) as TBook[];
        switch (filter) {
            case 'read':
                return readBooks();
            case 'unread':
                return unreadBooks();
            case 'unowned':
                return allBooks.filter(book => !book.platformIds || book.platformIds.length === 0);
            case 'owned':
                return allBooks.filter(book => book.platformIds && book.platformIds.length > 0);
            default:
                return allBooks;
        }
    };

    // Sort books
    const sortBooks = (bookList: TBook[]): TBook[] => {
        return [...bookList].sort((a, b) => {
            if (sortBy === 'author') {
                return a.author.localeCompare(b.author);
            }
            return a.title.localeCompare(b.title);
        });
    };

    // Group books
    const getGroupedBooks = (): Record<string, TBook[]> => {
        const filtered = getFilteredBooks();
        const sorted = sortBooks(filtered);

        switch (groupBy) {
            case 'author':
                return sorted.reduce((acc, book) => {
                    if (!acc[book.author]) acc[book.author] = [];
                    acc[book.author].push(book);
                    return acc;
                }, {} as Record<string, TBook[]>);
            case 'status':
                return {
                    'Read': sorted.filter(b => b.readByMe),
                    'Unread': sorted.filter(b => !b.readByMe)
                };
            case 'genre':
                return sorted.reduce((acc, book) => {
                    book.genreIds.forEach(genreId => {
                        const genre = genres.find(g => g.id === genreId);
                        const genreName = genre?.name || genreId;
                        if (!acc[genreName]) acc[genreName] = [];
                        if (!acc[genreName].includes(book)) {
                            acc[genreName].push(book);
                        }
                    });
                    return acc;
                }, {} as Record<string, TBook[]>);
            case 'platform':
                return sorted.reduce((acc, book) => {
                    if (book.platformIds && book.platformIds.length > 0) {
                        book.platformIds.forEach(platformId => {
                            const platform = platforms.find(p => p.id === platformId);
                            const platformName = platform?.name || platformId;
                            if (!acc[platformName]) acc[platformName] = [];
                            if (!acc[platformName].includes(book)) {
                                acc[platformName].push(book);
                            }
                        });
                    } else {
                        if (!acc['Not Owned']) acc['Not Owned'] = [];
                        acc['Not Owned'].push(book);
                    }
                    return acc;
                }, {} as Record<string, TBook[]>);
            default:
                return { 'All Books': sorted };
        }
    };

    const groupedBooks = getGroupedBooks();

    return (
        <VStack spacing={6} align="stretch" overflowY="scroll">
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <HStack justify="space-between" mb={expandControls ? 3 : 0}>
                    <Text fontWeight="bold">Controls</Text>
                    <IconButton
                        aria-label={expandControls ? "Hide controls" : "Show controls"}
                        icon={expandControls ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        onClick={() => setExpandControls(!expandControls)}
                        variant="ghost"
                        size="sm"
                    />
                </HStack>

                <Collapse in={expandControls} animateOpacity>
                    <VStack align="stretch" spacing={4}>
                        <Box>
                            <Text fontWeight="bold" mb={2}>Filter:</Text>
                            <ButtonGroup size="sm">
                                {FILTER_OPTIONS.map(option => (
                                    <Button
                                        key={option.value}
                                        colorScheme={filter === option.value ? 'blue' : 'gray'}
                                        onClick={() => changeFilter(option.value)}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Box>

                        <Box>
                            <Text fontWeight="bold" mb={2}>Group by:</Text>
                            <ButtonGroup size="sm">
                                {GROUP_OPTIONS.map(option => (
                                    <Button
                                        key={option.value}
                                        colorScheme={groupBy === option.value ? 'blue' : 'gray'}
                                        onClick={() => updateParam('groupBy', option.value)}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Box>

                        <Box>
                            <Text fontWeight="bold" mb={2}>Sort by:</Text>
                            <ButtonGroup size="sm">
                                {SORT_OPTIONS.map(option => (
                                    <Button
                                        key={option.value}
                                        colorScheme={sortBy === option.value ? 'blue' : 'gray'}
                                        onClick={() => updateParam('sortBy', option.value)}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Box>

                    </VStack>
                </Collapse>
            </Box>
            <Box  p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <HStack>
                    <Button size="sm" onClick={() => setExpandAll(true)}>Expand All</Button>
                    <Button size="sm" onClick={() => setExpandAll(false)}>Collapse All</Button>
                </HStack>
            </Box>

            {Object.entries(groupedBooks).map(([title, bookList]) => (
                <CollapsibleShelf key={title} title={title} books={bookList} isOpen={expandAll} />
            ))}
        </VStack>
    );
}