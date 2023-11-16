import { Box } from '@radix-ui/themes';

import { Skeleton } from '@/app/components';

const IssueFormSkeleton: React.FC = () => {
  return (
    <Box className='max-w-4xl'>
      <Skeleton height='2rem' />
      <Skeleton height='20rem' />
    </Box>
  );
};

export default IssueFormSkeleton;
