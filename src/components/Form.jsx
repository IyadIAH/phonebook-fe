// Form Component to add new names and numbers

const Form = ({ addEntry, handleNewName, handleNewNumber, newName, newNumber }) => {
    return (
        <form onSubmit={addEntry}>
            <div>
                Name: <input value={newName} onChange={handleNewName} />
                Number: <input value={newNumber} onChange={handleNewNumber} />
            </div>
            <button type="submit">Add Entry</button>
        </form>
    )
}

export default Form