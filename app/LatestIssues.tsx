import Link from 'next/link';
import { Avatar, Card, Flex, Heading, Table } from '@radix-ui/themes';

import prisma from '@/prisma/client';
import { IssueStatusBadge } from './components';

const LatestIssues: React.FC = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { assignedToUser: true },
  });

  return (
    <Card>
      <Heading size='4' mb='5'>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => {
            const { id, title, status, assignedToUser } = issue;
            return (
              <Table.Row key={id}>
                <Table.Cell>
                  <Link href={`/issues/${id}`}>
                    <Flex justify='between' align='center'>
                      <Flex direction='column' align='start' gap='2'>
                        {title}
                        <IssueStatusBadge status={status} />
                      </Flex>
                      {assignedToUser ? (
                        <Avatar
                          src={assignedToUser.image!}
                          fallback='?'
                          size='2'
                          radius='full'
                        />
                      ) : null}
                    </Flex>
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
