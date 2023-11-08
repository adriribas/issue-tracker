import dynamic from 'next/dynamic';
import IssueFormSkeleton from '@/app/issues/_components/IssueFormSkeleton';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage: React.FC = () => {
  return <IssueForm />;
};

export default NewIssuePage;
