import type { Metadata } from 'next';
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';

import prisma from '@/prisma/client';
import IssueActions from './IssueActions';
import { NoIssues, Pagination } from '@/app/components';
import IssueTable, { type IssueQuery, columnNames } from './IssueTable';
import { ASSIGNEE_UNASSIGNED } from '@/app/util/assignee';

type Props = {
  searchParams: IssueQuery & { pageSize?: string };
};

const DEFAULT_PAGE_SIZE = 10;

const IssuesPage: React.FC<Props> = async ({ searchParams }) => {
  const statuses = Object.values(Status);
  const status =
    searchParams.status && statuses.includes(searchParams.status)
      ? searchParams.status
      : undefined;

  const assignedToUserId =
    searchParams.assignee === ASSIGNEE_UNASSIGNED
      ? null
      : searchParams.assignee;

  const orderBy =
    searchParams.orderBy && columnNames.includes(searchParams.orderBy)
      ? { [searchParams.orderBy]: searchParams.sortOrder || 'asc' }
      : undefined;

  const where = { status, assignedToUserId };

  const page = parseInt(searchParams.page!) || 1;
  const pageSize = parseInt(searchParams.pageSize!) || DEFAULT_PAGE_SIZE;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count();
  const filteredIssueCount = await prisma.issue.count({ where });

  if (!issueCount) {
    return <NoIssues />;
  }

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify={{ initial: 'center', sm: 'start' }}>
        <Pagination
          itemCount={filteredIssueCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker | Issue list',
  description: 'View all project issues',
};

export default IssuesPage;
