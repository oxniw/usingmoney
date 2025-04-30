"use client";
import { useState } from 'react';

export default function NoteInput() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  const handleSubmit = () => {
    if (note.trim() !== '') {
      setNotes((prevNotes) => [...prevNotes, note.trim()]);
      setNote('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Write a Note:</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type your note here..."
        className="w-full p-2 border rounded resize-y"
        rows={5}
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Submitted Notes:</h3>
        {notes.map((n, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

