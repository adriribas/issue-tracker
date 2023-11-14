import type { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

type Props = {
  open: number;
  inProgress: number;
  closed: number;
};

const IssueSummary: React.FC<Props> = async ({ open, inProgress, closed }) => {
  const containers: Array<{ label: string; value: number; status: Status }> = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap='4'>
      {containers.map((container) => {
        const { label, value, status } = container;
        return (
          <Card key={label}>
            <Flex direction='column' gap='1'>
              <Link
                href={`/issues?status=${status}`}
                className='text-sm font-medium'>
                {label}
              </Link>
              <Text size='5' weight='bold'>
                {value}
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
