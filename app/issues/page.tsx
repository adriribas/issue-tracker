import type { Metadata } from 'next';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';

import prisma from '@/prisma/client';
import IssueActions from './IssueActions';
import { Pagination } from '@/app/components';
import IssueTable, { type IssueQuery, columnNames } from './IssueTable';

type Props = {
  searchParams: IssueQuery;
};

const pageSize = 10;

const IssuesPage: React.FC<Props> = async ({ searchParams }) => {
  const statuses = Object.values(Status);
  const status =
    searchParams.status && statuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;

  const orderBy =
    searchParams.orderBy && columnNames.includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: searchParams.sortOrder || 'asc' }
      : undefined;

  const where = { status };

  const page = parseInt(searchParams.page!) || 1;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue list',
  description: 'View all project issues',
};

export default IssuesPage;
