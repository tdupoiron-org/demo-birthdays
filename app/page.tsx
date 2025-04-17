'use client'

import { useState, useEffect } from 'react'

interface Birthday {
  id: number
  name: string
  birthDate: string
}

export default function Home() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([])
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')

  useEffect(() => {
    fetchBirthdays()
  }, [])

  const fetchBirthdays = async () => {
    const response = await fetch('/api/birthdays')
    const data = await response.json()
    setBirthdays(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/birthdays', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, birthDate }),
    })
    setName('')
    setBirthDate('')
    fetchBirthdays()
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Birthday Tracker</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Birthday</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border p-2 rounded w-full max-w-md"
            />
          </div>
          <div>
            <label htmlFor="birthDate" className="block mb-2">Birth Date:</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="border p-2 rounded w-full max-w-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Birthday
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Birthday List</h2>
        <div className="space-y-4">
          {birthdays.map((birthday) => (
            <div
              key={birthday.id}
              className="border p-4 rounded shadow-sm"
            >
              <p className="font-semibold">{birthday.name}</p>
              <p className="text-gray-600">
                {new Date(birthday.birthDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
