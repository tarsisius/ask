import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'

export function formatTime(time: string | Date): string {
  dayjs.extend(utc)
  dayjs.extend(relativeTime)

  return dayjs.utc(time).utcOffset(7, true).fromNow()
}
