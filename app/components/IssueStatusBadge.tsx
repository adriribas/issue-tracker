import type { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

type Props = {
  status: Status;
};

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'iris' | 'green' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'iris' },
  CLOSED: { label: 'Closed', color: 'green' },
};

const IssueStatusBadge: React.FC<Props> = ({ status }) => {
  const { label, color } = statusMap[status];

  return <Badge color={color}>{label}</Badge>;
};

export default IssueStatusBadge;
