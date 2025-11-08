import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import NoteCard from "../components/NoteCard.jsx"; // ✅ You forgot this import
import axios from "axios";
import toast from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound.jsx";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // ✅ Make sure your backend runs on port 5001
        const res = await axios.get("http://localhost:5001/api/notes");
        console.log("Fetched notes:", res.data);

        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);

        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // 🗑️ handle delete
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if(window.confirm("are you sure you want to delete this note?")){
     try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete note");
    }
    return
    }

  };

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Rate Limit message */}
      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 my-6">
        {/* Loader */}
        {loading && (
          <div className="text-center text-primary py-10">
            Loading notes...
          </div>
        )}

        {/* No notes */}
        {!loading && notes.length === 0 && !isRateLimited && (
          <NotesNotFound/>
        )}

        {/* Notes grid */}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} handleDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;










