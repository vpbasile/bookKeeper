import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, VStack, Text, Box } from '@chakra-ui/react';
import CollapsibleShelf from './CollapsibleShelf';
import books from '../data/books.json';
import { readBooks, unreadBooks } from '../data/filters';
import { TBook } from '../types';

interface BookListProps {
    filter: 'all' | 'read' | 'unread';
}

export default function BookList({ filter }: BookListProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const groupBy = searchParams.get('groupBy') || 'none';
    const sortBy = searchParams.get('sortBy') || 'title';

    const updateParam = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value);
        setSearchParams(newParams);
    };

    const changeFilter = (newFilter: string) => {
        // Preserve existing query params when changing route
        navigate(`/${newFilter}?${searchParams.toString()}`);
    };

    // Filter books
    const getFilteredBooks = (): TBook[] => {
        switch(filter) {
            case 'read': return readBooks();
            case 'unread': return unreadBooks();
            default: return Object.values(books);
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

        switch(groupBy) {
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
            default:
                return { 'All Books': sorted };
        }
    };

    const groupedBooks = getGroupedBooks();

    return (
        <VStack spacing={6} align="stretch">
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
                <Text fontWeight="bold" mb={2}>Filter:</Text>
                <ButtonGroup size="sm" mb={4}>
                    <Button colorScheme={filter === 'all' ? 'blue' : 'gray'} onClick={() => changeFilter('all')}>All</Button>
                    <Button colorScheme={filter === 'read' ? 'blue' : 'gray'} onClick={() => changeFilter('read')}>Read</Button>
                    <Button colorScheme={filter === 'unread' ? 'blue' : 'gray'} onClick={() => changeFilter('unread')}>Unread</Button>
                </ButtonGroup>

                <Text fontWeight="bold" mb={2}>Sort by:</Text>
                <ButtonGroup size="sm" mb={4}>
                    <Button colorScheme={sortBy === 'title' ? 'blue' : 'gray'} onClick={() => updateParam('sortBy', 'title')}>Title</Button>
                    <Button colorScheme={sortBy === 'author' ? 'blue' : 'gray'} onClick={() => updateParam('sortBy', 'author')}>Author</Button>
                </ButtonGroup>

                <Text fontWeight="bold" mb={2}>Group by:</Text>
                <ButtonGroup size="sm">
                    <Button colorScheme={groupBy === 'none' ? 'blue' : 'gray'} onClick={() => updateParam('groupBy', 'none')}>None</Button>
                    <Button colorScheme={groupBy === 'author' ? 'blue' : 'gray'} onClick={() => updateParam('groupBy', 'author')}>Author</Button>
                    <Button colorScheme={groupBy === 'status' ? 'blue' : 'gray'} onClick={() => updateParam('groupBy', 'status')}>Status</Button>
                </ButtonGroup>
            </Box>

            {Object.entries(groupedBooks).map(([title, bookList]) => (
                <CollapsibleShelf key={title} title={title} books={bookList} />
            ))}
        </VStack>
    );
}