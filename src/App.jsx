import { useState, useEffect } from 'react'
import entriesServices from './services/entries'
import Entries from './components/Entries'
import Form from './components/Form'
import Search from './components/Search'
import Notification from './components/Notification'

const App = () => {
// States
  const [entries, setEntries] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({isError: false, message: ''})
//Fetching Intial Data
  useEffect(() => {
    entriesServices
                  .getAll()
                  .then(initialEntries => {
                    setEntries(initialEntries)
                  })
  }, [])

// Functions
// Form Functions
const addEntry = (event) => {
  event.preventDefault()
  const existingNames = entries.map(entry => entry.name)
  const newEntry = {
    name: newName,
    number: newNumber
  }
  if (existingNames.includes(newName)) {
    if (window.confirm(`${newName} already exists in the phonebook. Do you want to replace the old number with the new one?`)) {
      const entryToChange = entries.find(entry => entry.name === newName)
      const changedEntry = {...entryToChange, number: newNumber}
      entriesServices
                    .update(entryToChange.id, changedEntry)
                    .then(returnedEntry => {
                      setEntries(entries.map(entry => entry.id !== returnedEntry.id ? entry : returnedEntry))
                      setNewName('')
                      setNewNumber('')
                      setNotification({...notification, message:`${returnedEntry.name} has been updated successfully!`})
                      setTimeout(() => {
                        setNotification({...notification, message: ''})
                      }, 5000)
                    })
                    .catch(error => {
                      setNotification({isError: true, message:`${entryToChange.name} has already been removed from the server`})
                      setTimeout(() => {
                        setNotification({isError: false, message: ''})
                      }, 5000)
                    })
   }
  } else {
    entriesServices
    .create(newEntry)
    .then(returnedEntry => {
      setEntries(entries.concat(returnedEntry))
      setNewName('')
      setNewNumber('')
      setNotification({...notification, message: `${returnedEntry.name} has been added successfully!`})
      setTimeout(() => {
        setNotification({...notification, message: ''})
      }, 5000)
    })
  }
}

const handleNewName = (event) => {
  setNewName(event.target.value)
}

const handleNewNumber = (event) => {
  setNewNumber(event.target.value)
}

//Filter Function
const handleFilter = (event) => {
  setFilter(event.target.value)
}

const entriesToShow = filter ? entries.filter(entry => {return entry.name.toLowerCase().includes(filter.toLowerCase())}) : entries

//Delete Function
const handleDelete = id => {
 if(window.confirm(`Are you sure you want to delete ${entries.find(entry => entry.id === id).name}? `)) {
  entriesServices
                .deleteEntry(id)
                .then(response => {
                  setEntries(entries.filter(entry => entry.id !== response.id))
                  setNotification({...notification, message: `delete was successful`})
                  setTimeout(() => {
                    setNotification({...notification, message: ``})
                  }, 5000)
                }) 
}
}
  
//App Component Returns
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} isError={notification.isError} />
      <h2>Search Entries</h2>
      <Search handleFilter={handleFilter} filter={filter} />
      <h2>Add Entry</h2>
      <Form addEntry={addEntry} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />
      <h2>Entries</h2>
      <Entries entries={entriesToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App