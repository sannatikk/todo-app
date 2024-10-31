import React from 'react';

export default function Row({item, deleteTask}) {
    return (
        <li key={item.id}>{item.description}
        <button className = 'deleteButton' onClick={() => deleteTask(item.id)}>x</button>
        </li>
    )
}
