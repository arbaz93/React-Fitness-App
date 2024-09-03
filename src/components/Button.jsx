import React from 'react'

export default function Button({ title, fun}) {
  return (
    <button onClick={() => {fun()}} className='px-8 py-4 mx-auto rounded-md border-[2px] border-blue-400 bg-slate-950 border-solid bg-slate blue-shadow duration-200'>
      <p>{title}</p>
    </button>
  )
}
