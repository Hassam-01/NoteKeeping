"use client";
import { setNotes } from "@/app/_store/features/notes/noteSlice";
import { useAppDispatch, useAppSelector } from "@/app/_store/hooks";
import { useEffect } from "react";

import Card from "@/app/_components/NoteCard";

function page() {
//   const userID = useAppSelector((state) => state.userId.userID);
  const id = 3;
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetch(`http://localhost:3009/home/${id}/notes`)
      .then((res) => res.json())
      .then((data) => dispatch(setNotes(data.notes)))
      .catch((err) => console.log(err));
  }, []);
  const notes = useAppSelector((state) => state.note.notes);

  return (
    <div className="dark h-screen">
      <div className="dark:bg-[#0c0c0c] h-full  bg-orange-100 dark:text-white text-black p-10">
          <div className="lg:grid-cols-4 md:grid-cols-3 grid-cols-2 grid gap-y-5" >
        {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.note_id}>
                  <Card title = {note.title} initialBody = {note.text} date = {note.date}  noteId = {note.note_id}/>
              </div>
            ))
        ) : (
            <p>No notes available</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default page;
