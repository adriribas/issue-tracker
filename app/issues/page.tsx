import NextLink from 'next/link';
import { Table } from '@radix-ui/themes';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { type Issue, Status } from '@prisma/client';

import prisma from '@/prisma/client';
import { IssueStatusBadge, Link } from '@/app/components';
import IssueActions from './IssueActions';

type Props = {
  searchParams: {
    status?: Status;
    orderBy?: keyof Issue;
    sortOrder?: 'asc' | 'desc';
  };
};

const IssuesPage: React.FC<Props> = async ({ searchParams }) => {
  const columns: Array<{
    value: keyof Issue;
    label: string;
    className?: string;
  }> = [
    { value: 'title', label: 'Issue' },
    { value: 'status', label: 'Status', className: 'hidden md:table-cell' },
    {
      value: 'createdAt',
      label: 'Created',
      className: 'hidden md:table-cell',
    },
  ];

  const status =
    searchParams.status && Object.values(Status).includes(searchParams.status)
      ? searchParams.status
      : undefined;
  const orderBy =
    searchParams.orderBy &&
    columns.map((column) => column.value).includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: searchParams.sortOrder || 'asc' }
      : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => {
              const { value, label, className } = column;
              const isSorted = value === searchParams.orderBy;
              const isAsc = searchParams.sortOrder === 'asc';
              const cancelSorting = isSorted && !isAsc;
              const orderBy = cancelSorting ? undefined : value;
              const sortOrder = cancelSorting
                ? undefined
                : isAsc
                ? 'desc'
                : 'asc';

              return (
                <Table.ColumnHeaderCell key={value} className={className}>
                  <NextLink
                    href={{
                      pathname: '/issues',
                      query: {
                        ...searchParams,
                        orderBy,
                        sortOrder,
                      },
                    }}>
                    {label}
                    {isSorted ? (
                      isAsc ? (
                        <ArrowUpIcon className='inline' />
                      ) : (
                        <ArrowDownIcon className='inline' />
                      )
                    ) : null}
                  </NextLink>
                </Table.ColumnHeaderCell>
              );
            })}
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
