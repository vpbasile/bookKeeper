import { Route, Routes } from "react-router-dom";
import CollapsibleShelf from "./components/CollapsibleShelf";
import Home from "./components/Homepage";
import Layout from "./components/layout";
import books from "./data/books.json";
import { readBooks, unreadBooks } from "./data/filters";

function App() {

  return (
    // {/* Routes nest inside one another. Nested route paths build upon
    //         parent route paths, and nested route elements render inside
    //         parent route elements. See the note about <Outlet> below. */}

    < Routes >
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="read" element={<CollapsibleShelf title="Books I've Read" books={readBooks()} />} />
        <Route path="unread" element={<CollapsibleShelf title="Books I Want to Read" books={unreadBooks()} />} />
        <Route path="all" element={<CollapsibleShelf title="All Books" books={Object.values(books)} />} />
        {/* <Route path="about" element={<About />} /> */}
      </Route>
    </Routes >
  )
}

export default App
