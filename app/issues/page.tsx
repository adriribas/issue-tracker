import { Table } from '@radix-ui/themes';
import { Status } from '@prisma/client';

import prisma from '@/prisma/client';
import { IssueStatusBadge, Link } from '@/app/components';
import IssueActions from './IssueActions';

type Props = {
  searchParams: { status?: Status };
};

const IssuesPage: React.FC<Props> = async ({ searchParams }) => {
  const status =
    searchParams.status && Object.values(Status).includes(searchParams.status)
      ? searchParams.status
      : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            const { id, title, status, createdAt } = issue;
            return (
              <Table.Row key={id}>
                <Table.Cell>
                  <Link href={`/issues/${id}`}>{title}</Link>
                  <div className='block md:hidden'>
                    <IssueStatusBadge status={status} />
                  </div>
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  <IssueStatusBadge status={status} />
                </Table.Cell>
                <Table.Cell className='hidden md:table-cell'>
                  {createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
