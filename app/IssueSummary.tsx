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
  //gap='4'
  return (
    <Flex justify='center' className='gap-2 sm:gap-6 md:gap-8'>
      {containers.map((container) => {
        const { label, value, status } = container;
        return (
          <Card key={label}>
            <Flex direction='column' gap='1'>
              <Link
                href={`/issues?status=${status}`}
                className='text-sm text-center font-medium'>
                {label}
              </Link>
              <Text size='5' weight='bold' align='center'>
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
