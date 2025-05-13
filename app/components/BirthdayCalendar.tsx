'use client'

import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format } from 'date-fns'
import { parse } from 'date-fns'
import { startOfWeek } from 'date-fns'
import { getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
interface Birthday {
  id: number
  name: string
  birthDate: string
}

const locales = {
  'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface BirthdayCalendarProps {
  birthdays: Birthday[]
}

const BirthdayCalendar: React.FC<BirthdayCalendarProps> = ({ birthdays }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const events = birthdays.map(birthday => {
    const date = new Date(birthday.birthDate)
    const eventYear = currentDate.getFullYear()
    const eventDate = new Date(eventYear, date.getMonth(), date.getDate())
    
    return {
      title: birthday.name,
      start: eventDate,
      end: eventDate,
      allDay: true,
      resource: birthday,
    }
  })

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate)
  }

  return (
    <div className="h-[600px] w-full">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month']}
        defaultView="month"
        popup
        date={currentDate}
        onNavigate={handleNavigate}
        className="bg-[var(--input-background)] rounded-lg p-4"
        tooltipAccessor={(event) => `${event.title}'s birthday`}
      />
    </div>
  )
}

export default BirthdayCalendar
