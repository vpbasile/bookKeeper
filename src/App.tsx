import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookList from "./components/DisplayBookList";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter basename="/bookKeeper">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<BookList filter="all" />} />
          <Route path="all" element={<BookList filter="all" />} />
          <Route path="read" element={<BookList filter="read" />} />
          <Route path="unread" element={<BookList filter="unread" />} />
          <Route path="unowned" element={<BookList filter="unowned" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
