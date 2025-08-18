import { type ClassValue, clsx } from 'clsx'
import { format, formatInTimeZone } from 'date-fns-tz'
import { ja } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export const TIMEZONE = process.env.DEFAULT_TIMEZONE || 'Asia/Tokyo'

export function formatJST(date: string | Date, formatStr: string = 'yyyy/MM/dd HH:mm') {
  return formatInTimeZone(new Date(date), TIMEZONE, formatStr, { locale: ja })
}

export function isToday(date: string | Date) {
  const today = new Date()
  const targetDate = new Date(date)
  return (
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate()
  )
}

export function isTomorrow(date: string | Date) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const targetDate = new Date(date)
  return (
    tomorrow.getFullYear() === targetDate.getFullYear() &&
    tomorrow.getMonth() === targetDate.getMonth() &&
    tomorrow.getDate() === targetDate.getDate()
  )
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
