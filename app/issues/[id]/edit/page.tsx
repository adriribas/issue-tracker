import { notFound } from 'next/navigation';

import prisma from '@/prisma/client';
import IssueForm from '../../_components/IssueForm';

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
