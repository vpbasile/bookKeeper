export type TBook = {
    id: string;
    title: string;
    author: string;
    genreIds: string[];   // references TGenre.id, e.g. ["sf", "weird"]
    series?: string | null;
    readByMe?: boolean; // true if already read
    platformIds?: string[]; // references TPlatform.id
};

export type TPlatform = {
    id: string;             // machine-readable (e.g., "audible", "kindle")
    name: string;           // human-readable
    type: "audiobook" | "ebook" | "physical";
    description?: string;   // optional text explaining the platform
};

export type TBookshelf = {
    id: string;
    title: string;
    bookIds: string[];     // IDs reference a separate collection of books
};

export type TGenre = {
    id: string;             // machine-readable (e.g., "sf", "weird", "lgbtq")
    name: string;           // human-readable
    category: "fiction" | "theme" | "form" | "cultural";
    description?: string;   // optional text explaining the genre
};
