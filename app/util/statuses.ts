import { Status } from '@prisma/client';

export { Status };

export type StatusColors = 'red' | 'iris' | 'green';
type Fields = { label: string; color: StatusColors };

export const statusMap: Record<Status, Fields> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'iris' },
  CLOSED: { label: 'Closed', color: 'green' },
};

export const statuses: Array<{ value: Status } & Fields> = Object.entries(
  statusMap
).map(([status, fields]) => ({
  value: status as Status,
  ...fields,
}));

export const STATUS_ALL = 'ALL' as const;
