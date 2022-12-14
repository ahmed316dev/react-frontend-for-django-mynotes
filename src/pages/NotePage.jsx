import React, { useState, useEffect } from 'react'

import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { useNavigate, useParams } from 'react-router-dom'

const NotePage = () => {
  const { id: noteId } = useParams()
  const [note, setNote] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      if (noteId === 'new') return
      const response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}`)
      const data = await response.json()
      setNote(data)
    })()
  }, [noteId])

  const createNote = async () => {
    await fetch(`http://127.0.0.1:8000/api/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
  }

  const updateNote = async () => {
    await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    })
  }

  const deleteNote = async () => {
    fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    navigate('/')
  }

  const handleSubmit = () => {
    if (noteId !== 'new' && !note.body) {
      console.log('NOTE:', note)
      deleteNote()
    } else if (noteId !== 'new') {
      updateNote()
    } else if (noteId === 'new' && note.body) {
      createNote()
    }
    navigate('/')
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={e => setNote({ ...note, body: e.target.value })}
        value={note?.body}
      ></textarea>
    </div>
  )
}

export default NotePage
