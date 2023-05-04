import React from 'react'

export const Ingredients: React.FC<{ ing: string }> = ({ ing }) => {
  const title = ing.split(':')[0]
  const data = ing.split(':')[1]
  return (
    <>
      <li>
        <strong>{title}:</strong> {data}
      </li>
    </>
  )
}
