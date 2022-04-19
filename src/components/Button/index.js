import React from 'react';
import './index.css'

export const Button = () => {
  return (
    <button  className='createButton' onClick={()=>console.log('Есть контакт!')}>Create post</button>
  )
}
