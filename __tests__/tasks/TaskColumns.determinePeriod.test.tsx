import { determinePeriod } from '@/components/tasks/TaskColumns'
import { addDays } from 'date-fns'

describe('determine period', () => {
  it('should return true for today', () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const taskDate = new Date()
    taskDate.setHours(0, 0, 0, 0)

    expect(determinePeriod(taskDate, 'today')).toBe(true)
  })

  it('should return false for today when the period is past', () => {
    const today = new Date()
    const newDate = addDays(today, -1)
    expect(determinePeriod(newDate, 'today')).toBe(false)
  })

  it('should return true for past', () => {
    const today = new Date()
    const newDate = addDays(today, -1)
    expect(determinePeriod(newDate, 'past')).toBe(true)
  })

  it('should return false for past when the period is today', () => {
    const today = new Date()
    expect(determinePeriod(today, 'past')).toBe(false)
  })

  it('should return true for upcoming', () => {
    const today = new Date()
    const newDate = addDays(today, 1)
    expect(determinePeriod(newDate, 'upcoming')).toBe(true)
  })

  it('should return false for upcoming when the period is today', () => {
    const today = new Date()
    expect(determinePeriod(today, 'upcoming')).toBe(false)
  })

  it('should return false when period is incorrect', () => {
    const today = new Date()
    expect(determinePeriod(today, 'incorrect' as 'upcoming')).toBe(false)
  })
})
