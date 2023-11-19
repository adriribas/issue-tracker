import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Flex } from '@radix-ui/themes';

import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage: React.FC = () => {
  return (
    <Flex justify='center'>
      <IssueForm />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: 'Issue Tracker | New Issue',
  description: 'Create a new project issue',
};

export default NewIssuePage;
