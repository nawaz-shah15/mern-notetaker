import React from "react";
import { Link } from "react-router-dom";
import { PenSquare, Trash2 } from "lucide-react"; // ✅ correct icon imports
import { formatDate } from "../lib/utils";

// Component accepts the note object and delete handler
const NoteCard = ({ note, handleDelete }) => {


  return (
    <div
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        {/* ✅ Clicking title/content navigates to note details */}
        <Link to={`/note/${note._id}`}>
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        </Link>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-1">
            {/* Edit button (just icon for now) */}
            <PenSquare className="size-4 cursor-pointer" />

            {/* Delete button */}
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;







