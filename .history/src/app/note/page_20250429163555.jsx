"use client";
import { useState } from 'react';

export default function NoteInput() {
  const [note, setNote] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevent new line
      console.log('Note submitted:', note);
      // Optionally clear the note
      // setNote('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Write a Note:</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your note here... (Press Enter to submit)"
        className="w-full p-2 border rounded resize-y"
        rows={5}
      />
      <p className="mt-2 text-sm text-gray-600">Your note: {note}</p>
    </div>
  );
}
