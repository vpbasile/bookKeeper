import { TBook } from '../types'
import bookList from './books.json'

const originalList = Object.values(bookList)

// TODO: Constrain the groupBy to my desired list
export function unreadBooks(groupBy?: "genre" | "",): TBook[] {
    // Filter to only books I have not read
    const unFilteredList: TBook[] = originalList
    const filteredList = unFilteredList.filter(eachBook => !(eachBook.readByMe))
    if (groupBy !== null) {
        // filteredList.sort()
    }
    return filteredList

}

export function readBooks(groupBy?: "genre" | "",): TBook[] {
    // Filter to only books I have read
    const unFilteredList: TBook[] = originalList
    const filteredList = unFilteredList.filter(eachBook => (eachBook.readByMe))
    if (groupBy !== null) {
        // filteredList.sort()
    }
    return filteredList

}