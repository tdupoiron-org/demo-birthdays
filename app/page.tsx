'use client'

import { useState, useEffect } from 'react'
import { FiEdit2, FiTrash2, FiList, FiCalendar } from 'react-icons/fi'
import BirthdayCalendar from './components/BirthdayCalendar'

interface Birthday {
  id: number
  name: string
  birthDate: string
}

export default function Home() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([])
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [editingBirthday, setEditingBirthday] = useState<Birthday | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')

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

    if (editingBirthday) {
      // Update existing birthday
      await fetch('/api/birthdays', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: editingBirthday.id,
          name, 
          birthDate 
        }),
      })
      setEditingBirthday(null)
    } else {
      // Create new birthday
      await fetch('/api/birthdays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, birthDate }),
      })
    }

    setName('')
    setBirthDate('')
    fetchBirthdays()
  }

  const handleEdit = (birthday: Birthday) => {
    setEditingBirthday(birthday)
    setName(birthday.name)
    setBirthDate(birthday.birthDate.split('T')[0])
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this birthday?')) {
      await fetch(`/api/birthdays?id=${id}`, {
        method: 'DELETE',
      })
      fetchBirthdays()
    }
  }

  return (
    <main className="min-h-screen p-3 sm:p-6 md:p-8 max-w-4xl mx-auto w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8 md:mb-12 text-center tracking-tight">Birthday Tracker</h1>

      <div className="mb-6 sm:mb-8 md:mb-12 glass-effect bg-[var(--card-background)] rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
          {editingBirthday ? 'Edit Birthday' : 'Add New Birthday'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-0 bg-[var(--input-background)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition-apple"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label htmlFor="birthDate" className="block mb-2 text-sm">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-0 bg-[var(--input-background)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition-apple"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              className="bg-[var(--accent)] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[var(--accent-hover)] transition-apple w-full sm:w-auto"
            >
              {editingBirthday ? 'Update Birthday' : 'Add Birthday'}
            </button>
            {editingBirthday && (
              <button
                type="button"
                onClick={() => {
                  setEditingBirthday(null)
                  setName('')
                  setBirthDate('')
                }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-apple w-full sm:w-auto"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="glass-effect bg-[var(--card-background)] rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Birthday List</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[var(--accent)] text-white' : 'hover:bg-[var(--accent)] hover:text-white'}`}
              title="List View"
            >
              <FiList size={20} />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'calendar' ? 'bg-[var(--accent)] text-white' : 'hover:bg-[var(--accent)] hover:text-white'}`}
              title="Calendar View"
            >
              <FiCalendar size={20} />
            </button>
          </div>
        </div>
        
        {viewMode === 'list' ? (
          <div className="space-y-3 sm:space-y-4">
            {birthdays.map((birthday) => (
              <div
                key={birthday.id}
                className="bg-[var(--input-background)] p-4 sm:p-6 rounded-lg sm:rounded-xl transition-apple hover:transform hover:scale-[1.02] cursor-default relative group"
              >
                <div className="sm:absolute sm:right-4 sm:top-1/2 sm:-translate-y-1/2 flex gap-2 mt-3 sm:mt-0 justify-end sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(birthday)}
                    className="p-2.5 sm:p-2 hover:bg-[var(--accent)] hover:text-white rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FiEdit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                  <button
                    onClick={() => handleDelete(birthday.id)}
                    className="p-2.5 sm:p-2 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FiTrash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
                <p className="font-semibold text-lg">{birthday.name}</p>
                <p className="text-sm opacity-75 mt-1">
                  {new Date(birthday.birthDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            ))}
            {birthdays.length === 0 && (
              <p className="text-center opacity-75 py-8">No birthdays added yet</p>
            )}
          </div>
        ) : (
          <BirthdayCalendar birthdays={birthdays} />
        )}
      </div>
    </main>
  )
}
