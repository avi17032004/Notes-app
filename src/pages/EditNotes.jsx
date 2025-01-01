import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import useCreateDate from "../components/useCreateDate";

const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = notes.find((item) => item.id === id);
  const [title, setTitle] = useState(note?.title || "");
  const [details, setDetails] = useState(note?.details || "");
  const date = useCreateDate();

  // Handle cases where `note` is undefined
  if (!note) {
    navigate("/"); // Redirect to home page
    return null;
  }

  const handleForm = (e) => {
    e.preventDefault();

    if (title && details) {
      const newNote = { ...note, title, details, date };
      const newNotes = notes.map((item) => (item.id === id ? newNote : item));
      setNotes(newNotes);
      navigate("/");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const newNotes = notes.filter((item) => item.id !== id);
      setNotes(newNotes);
      navigate("/");
    }
  };

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handleForm}>
          Save
        </button>
        <button className="btn danger" onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
      </header>
      <form className="create-note__form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="28"
          placeholder="Note details..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
};

export default EditNote;
