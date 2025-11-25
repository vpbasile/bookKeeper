import genres from './genres.json';
import platforms from './platforms.json';

export function getPlatformColor(platform: string) {
    switch (platform) {
        case 'audible': return 'orange';
        case 'kindle': return 'orange';
        case 'chirp': return 'purple';
        case 'audiobooks-com': return 'yellow';
        case 'libby': return 'cyan';
        case 'paperback': return 'green';
        case 'hardback': return 'teal';
        default: return 'gray';
    }
}

export function getPlatformName(platformId: string) {
    const platform = platforms.find(p => p.id === platformId);
    return platform?.name || platformId;
}

export function getGenreName(genreId: string) {
    const genre = genres.find(g => g.id === genreId);
    return genre?.name || genreId;
}