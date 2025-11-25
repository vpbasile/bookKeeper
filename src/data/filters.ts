import { TBook } from '../types'
import bookList from './books.json'

const originalList = Object.values(bookList)

// Define valid grouping options based on TBook fields that are suitable for grouping
export type TGroupByOption = 'author' | 'genreIds' | 'series' | 'readByMe';

export function unreadBooks(groupBy?: TGroupByOption): TBook[] {
    // Filter to only books I have not read
    const unFilteredList: TBook[] = originalList
    const filteredList = unFilteredList.filter(eachBook => !(eachBook.readByMe))
    if (groupBy !== undefined) {
        // filteredList.sort()
    }
    return filteredList

}

export function readBooks(groupBy?: TGroupByOption): TBook[] {
    // Filter to only books I have read
    const unFilteredList: TBook[] = originalList
    const filteredList = unFilteredList.filter(eachBook => (eachBook.readByMe))
    if (groupBy !== undefined) {
        // filteredList.sort()
    }
    return filteredList

}