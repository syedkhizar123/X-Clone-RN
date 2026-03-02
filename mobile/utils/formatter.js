import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export const formatNumber = (num) => {
    if (num >= 1000) return Math.floor(num / 1000) + "k"
    return num.toString()
}

export const formatDate = (dateString) => {
    const date = dayjs(dateString)
    const now = dayjs()

    const minutes = now.diff(date, "minute")
    const hours = now.diff(date, "hour")
    const days = now.diff(date, "day")

    if (minutes < 1) return "now"
    if (minutes < 60) return `${minutes}m`
    if (hours < 24) return `${hours}h`
    if (days < 7) return `${days}d`
    return `${Math.floor(days / 7)}w`
}
