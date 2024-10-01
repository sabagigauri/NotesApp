import React from 'react'

export default function Footer() {
  return (
    <footer className='flex justify-center bg-gray-800 text-white p-4'>{new Date().getFullYear()} My Notes App</footer>
  )
}
