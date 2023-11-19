import type { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

type Props = {
  statusCount: {
    open: number;
    inProgress: number;
    closed: number;
  };
};

const IssueSummary: React.FC<Props> = async ({ statusCount }) => {
  const containers: Array<{ label: string; value: number; status: Status }> = [
    { label: 'Open Issues', value: statusCount.open, status: 'OPEN' },
    {
      label: 'In-progress Issues',
      value: statusCount.inProgress,
      status: 'IN_PROGRESS',
    },
    { label: 'Closed Issues', value: statusCount.closed, status: 'CLOSED' },
  ];

  return (
    <Flex justify='center' gap={{ initial: '2', sm: '6', md: '8' }}>
      {containers.map((container) => {
        const { label, value, status } = container;
        return (
          <Link
            key={label}
            href={`/issues?status=${status}`}
            className='text-sm text-center font-medium transition hover:brightness-95'>
            <Card>
              <Flex direction='column' gap='1'>
                {label}
                <Text size='5' weight='bold' align='center'>
                  {value}
                </Text>
              </Flex>
            </Card>
          </Link>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
