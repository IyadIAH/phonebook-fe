const Entry = ({ entry, handleDelete }) => {
    return (
        <div>
            <p>{entry.name}  {entry.number}</p>
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}
    


const Entries = ({ entries, handleDelete }) => <div>{entries.map(entry => {return <Entry  key={entry.id} entry={entry} handleDelete={() => handleDelete(entry.id)} />})}</div>
    
export default Entries
