import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import genres from '../data/genres.json';
import { TBook, TGenre } from '../types';

interface AddFormProps {
    onAdd: (book: Omit<TBook, 'id'>) => void;
}

export const AddForm = ({ onAdd }: AddFormProps) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [series, setSeries] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [readByMe, setReadByMe] = useState(false);

    const handleGenreToggle = (genreId: string) => {
        setSelectedGenres(prev =>
            prev.includes(genreId)
                ? prev.filter(id => id !== genreId)
                : [...prev, genreId]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && author.trim() && selectedGenres.length > 0) {
            onAdd({
                title,
                author,
                genreIds: selectedGenres,
                series: series.trim() || null,
                readByMe,
            });
            setTitle('');
            setAuthor('');
            setSeries('');
            setSelectedGenres([]);
            setReadByMe(false);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} w="100%">
            <VStack spacing={4}>
                <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter book title"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Author</FormLabel>
                    <Input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter author name"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Series (optional)</FormLabel>
                    <Input
                        value={series}
                        onChange={(e) => setSeries(e.target.value)}
                        placeholder="Enter series name"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Genres (select at least one)</FormLabel>
                    <VStack align="stretch" spacing={2} maxH="200px" overflowY="auto" p={2} borderWidth="1px" borderRadius="md">
                        {(genres as TGenre[]).map((genre) => (
                            <Checkbox
                                key={genre.id}
                                isChecked={selectedGenres.includes(genre.id)}
                                onChange={() => handleGenreToggle(genre.id)}
                            >
                                {genre.name}
                            </Checkbox>
                        ))}
                    </VStack>
                </FormControl>

                <FormControl>
                    <Checkbox
                        isChecked={readByMe}
                        onChange={(e) => setReadByMe(e.target.checked)}
                    >
                        I have read this book
                    </Checkbox>
                </FormControl>

                <Button type="submit" colorScheme="blue" w="100%">
                    Add Book
                </Button>
            </VStack>
        </Box>
    );
};