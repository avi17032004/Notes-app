import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

import NoteItem from "../components/NoteItem";
// import { useEffect, useState } from "react";

// const Notes = ({notes}) => {
//   const [showSearch, setShowSearch] = useState(false);
//   const [text, setText]= useState('')
//   const [filteredNotes, setFilteredNotes]= useState(notes)

//   const handleSearch=()=>{
//     setFilteredNotes(notes.filter(note =>{
//       if(note.title.toLowerCase().match(text.toLowerCase())){
//         return note;
//       }
//     }))
//   }

//   useEffect(handleSearch,[text]);

import { useCallback, useEffect, useState } from "react";

const Notes = ({ notes }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearch = useCallback(() => {
    setFilteredNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  }, [notes, text]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <section>
      <header className="notes__header">
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && (
          <input
            type="text"
            autoFocus
            placeholder="Keyword..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleSearch();
            }}
          />
        )}
        <button
          className="btn"
          onClick={() => setShowSearch((prevState) => !prevState)}
        >
          {showSearch ? <IoMdClose /> : <CiSearch />}
        </button>
      </header>
      <div className="notes__container">
        {filteredNotes.length === 0 && (
          <p className="empty__notes">No Records Found</p>
        )}
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
      <Link to={"/create-note"} className="btn add__btn">
      <BiEdit />
      </Link>
    </section>
  );
};

export default Notes;
