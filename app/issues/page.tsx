import Link from 'next/link';
import { Table } from '@radix-ui/themes';
import delay from 'delay';

import prisma from '@/prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
import IssueActions from './IssueActions';

const IssuesPage: React.FC = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000);

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

export default IssuesPage;
