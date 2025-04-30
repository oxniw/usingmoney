"use client";
import { useState } from 'react';
import axios from 'axios';

export default function NoteInput() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedNote, setEditedNote] = useState('');

  const sendNoteToBackend = async (content) => {
    try {
      await axios.post('http://localhost:5000/submit-note', {
        content,
        username:localStorage.getItem("username")
      });
      console.log('Note sent to backend');
    } catch (error) {
      console.error('Error sending note:', error);
    }
  };

  const handleSubmit = async () => {
    if (note.trim() !== '') {
      setNotes((prev) => [...prev, note]);
      await sendNoteToBackend(note);
      setNote('');
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditedNote(notes[index]);
  };

  const saveEdit = async () => {
    const updatedNotes = [...notes];
    updatedNotes[editIndex] = editedNote;
    setNotes(updatedNotes);
    await sendNoteToBackend(editedNote);
    setEditIndex(null);
    setEditedNote('');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedNote('');
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
          <div key={index} className="mb-4 p-2 bg-gray-100 rounded">
            {editIndex === index ? (
              <>
                <textarea
                  value={editedNote}
                  onChange={(e) => setEditedNote(e.target.value)}
                  rows={4}
                  className="w-full p-2 border rounded resize-y mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="whitespace-pre-wrap">{n}</div>
                <button
                  onClick={() => startEdit(index)}
                  className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

