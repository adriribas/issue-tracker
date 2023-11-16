import NextLink from 'next/link';
import { Box, Table } from '@radix-ui/themes';
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';
import type { Issue, Status } from '@prisma/client';

import { IssueStatusBadge, Link } from '../components';

export type IssueQuery = {
  status?: Status;
  orderBy?: keyof Issue;
  sortOrder?: 'asc' | 'desc';
  page?: string;
};

type Props = {
  searchParams: IssueQuery;
  issues: Array<Issue>;
};

const IssueTable: React.FC<Props> = ({ searchParams, issues }) => {
  return (
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
                <Box className='block md:hidden'>
                  <IssueStatusBadge status={status} />
                </Box>
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
  );
};

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

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
