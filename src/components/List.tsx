import React from 'react'

type ListProps = {
  initialItems: string[]
}

function List({ initialItems }: ListProps) {
  const [newItem, setNewItem] = React.useState('')
  const [list, setList] = React.useState(initialItems)

  function addToList() {
    setTimeout(() => {
      setList(state => [...state, newItem])
    }, 1000);
  }

  function removeFromList(it: string) {
    setTimeout(() => {
      setList(prev => prev.filter(item => item !== it))
    }, 1000);
  }

  return (
    <>
      <input placeholder='new item' value={newItem} onChange={e => setNewItem(e.target.value)} />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map(item => (
          <li key={item}>
            {item}
            <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default List
