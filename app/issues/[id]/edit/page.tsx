import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import prisma from '@/prisma/client';
import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: true,
  loading: () => <IssueFormSkeleton />,
});

type Props = {
  params: { id: string };
};

const EditIssuePage: React.FC<Props> = async ({ params }) => {
  const issueId = parseInt(params.id);
  if (Number.isNaN(issueId)) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({ where: { id: issueId } });
  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
