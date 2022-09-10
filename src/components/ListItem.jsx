import React from 'react'
import { Link } from 'react-router-dom'

const getTitle = note => {
  const title = note.body.split('\n')[0]
  if (title.length > 45) return title.slice(0, 45).concat('...')
  return title
}

const getContent = note => {
  const title = getTitle(note)
  const content = note.body.replace('\n', ' ').replaceAll(title, '')
  if (content.length > 45) return content.slice(0, 45).concat('...')
  else return content
}
const getDate = date => new Date(date).toLocaleDateString()

const ListItem = ({ note }) => {
  return (
    <Link to={`note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getDate(note.updated)}</span>
          {getContent(note)}
        </p>
      </div>
    </Link>
  )
}

export default ListItem
