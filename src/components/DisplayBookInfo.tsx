import { Badge, Grid, GridItem, Text, Wrap } from '@chakra-ui/react';
import { getGenreName, getPlatformColor, getPlatformName } from '../data/platforms';
import { TBook } from '../types';
export default function DisplayBookInfo({ book }: { book: TBook }) {
    return <Grid
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
                {book.platformIds && book.platformIds.length > 0 ? (
                    book.platformIds.map(platformId => (
                        <Badge
                            key={platformId}
                            id={`${platformId}-badge`}
                            colorScheme={getPlatformColor(platformId)}
                            fontSize="xs"
                        >
                            {getPlatformName(platformId)}
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
    </Grid>;
}