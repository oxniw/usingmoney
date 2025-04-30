import { useState } from 'react';

export default function NoteInput() {
  const [note, setNote] = useState('');

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
      <p className="mt-2 text-sm text-gray-600">Your note: {note}</p>
    </div>
  );
}
