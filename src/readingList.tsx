import { Box, Button, ButtonGroup, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AddForm } from './components/AddForm';
import CollapsibleShelf from './components/CollapsibleShelf';
import booksData from './data/books.json';
import genres from './data/genres.json';
import { TBook, TBookshelf } from './types';

type TgroupBy = 'genre' | 'readStatus' | 'platform' | 'all';

export default function ReadingListDisplay() {
    const [groupBy, setgroupBy] = useState<TgroupBy>('genre');
    const [books, setBooks] = useState<{ [key: string]: TBook }>({});

    // Load books into state on mount
    useEffect(() => {
        setBooks(booksData as { [key: string]: TBook });
    }, []);
    //Take the list of books and separate them by genre.  Retun a separate bookshelf for each unique genre;
    const bookshelves: TBookshelf[] = [];
    const genreMap: { [genre: string]: TBookshelf } = {};
    const readingList: TBookshelf = Object.values(books).reduce((shelf, book) => {
        if (!book.readByMe) {
            shelf.bookIds.push(book.id);
        }
        return shelf;
    }, { id: 'reading', title: 'Reading', bookIds: [] as string[] });
    const finishedList: TBookshelf = Object.values(books).reduce((shelf, book) => {
        if (book.readByMe) {
            shelf.bookIds.push(book.id);
        }
        return shelf;
    }, { id: 'finished', title: 'Finished', bookIds: [] as string[] });

    // Iterate through books to populate genreMap
    Object.values(books).forEach((book) => {
        book.genreIds.forEach((genre) => {
            if (!genreMap[genre]) {
                const genreInfo = genres.find((g) => g.id === genre);
                if (!genreInfo) {
                    console.error(`Unknown genre "${genre}" found in book "${book.title}" (${book.id})`);
                    return;
                }
                genreMap[genre] = {
                    id: genre,
                    title: genreInfo.name,
                    bookIds: [],
                };
                bookshelves.push(genreMap[genre]);
            }
            if (genreMap[genre]) {
                genreMap[genre].bookIds.push(book.id);
            }
        });
    });


    // Main Render
    return <Box>
        <Heading as={'h1'}>Reading List</Heading>

        <Box id='viewControls' mb={6} mt={4}>
            {/* Filter:read/u nread/all */}
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
        </Box>

        {/* Grouped by Genre */}
        {groupBy === 'genre' && (
            <VStack spacing={6} align="stretch">
                {bookshelves.map((shelf) => (
                    <CollapsibleShelf key={shelf.id} shelf={shelf} />
                ))}
            </VStack>
        )}
        {/* Grouped by Read Status */}
        {groupBy === 'readStatus' && (
            <VStack spacing={6} align="stretch">
                
                <CollapsibleShelf key={finishedList.id} shelf={finishedList} />
            </VStack>
        )}
        {/* Grouped by Platform */}
        {groupBy === 'platform' && (
            <VStack spacing={6} align="stretch">
                {/* Placeholder for platform-based shelves */}
                <Text>Platform grouping is not yet implemented.</Text>
            </VStack>
        )}

        <VStack spacing={3} align={'stretch'} mt={6}>
            <AddForm onAdd={(book) => {
                // Handle adding a new book
                console.log('Adding book:', book);
                const newId = `book_${Object.keys(books).length + 1}`;
                setBooks({
                    ...books,
                    [newId]: { id: newId, ...book },
                });
            }} />
        </VStack>
    </Box>
}