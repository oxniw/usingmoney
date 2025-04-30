"use client";
"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
export default function NoteInput() {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedNote, setEditedNote] = useState('');
  const router = useRouter();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.post('http://localhost:5000/get-notes', {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
        });
        setNotes(response.data.notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const sendNoteToBackend = async (content) => {
    try {
      await axios.post('http://localhost:5000/submit-note', {
        content,
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
      });
      console.log('Note sent to backend');
    } catch (error) {
      console.error('Error sending note:', error);
    }
  };

  const handleSubmit = async () => {
    if (note.trim() !== '') {
      setNotes((prev) => [
        ...prev,
        { content: note, timestamp: new Date().toISOString() },
      ]);
      await sendNoteToBackend(note);
      setNote('');
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditedNote(notes[index].content);
  };

  const saveEdit = async () => {
    const updatedNotes = [...notes];
    updatedNotes[editIndex].content = editedNote;
    setNotes(updatedNotes);
    await sendNoteToBackend(editedNote);
    setEditIndex(null);
    setEditedNote('');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditedNote('');
  };

  const deleteNote = async (index) => {
    const noteToDelete = notes[index];
    try {
      await axios.post('http://localhost:5000/delete-note', {
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        content: noteToDelete.content,
      });
      console.log('Note deleted from backend');
      setNotes(notes.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  function check() {
    if (localStorage.getItem("username") === null && localStorage.getItem("password") === null) {
      router.push("/");
      return false;
    } else {
      return true;
    }
  }
  const logout = () => {
    router.push("/about");
  };
  useEffect(() => {
        if (check()) {
          console.log("check")
        } else {
            router.push("/");
        }
    },)
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
      <button
        onClick={logout}
        className="mt-2 px-4 py-2 right-0 p-4 bg-red-500 text-white rounded-3xl transition-transform duration-300 hover:scale-110">
        back
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
                <div className="whitespace-pre-wrap">{n.content}</div>
                <div className="text-sm text-gray-600">
                  Posted on: {new Date(n.timestamp).toLocaleString()}
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => startEdit(index)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
