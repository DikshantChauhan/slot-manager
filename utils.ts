import { DateTime } from 'luxon'

export const getSQLDateTime = (timestamp: number) => DateTime.fromMillis(timestamp).toSQL()!
