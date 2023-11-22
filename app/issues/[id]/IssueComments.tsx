import { getServerSession } from 'next-auth';
import { Prisma } from '@prisma/client';
import { Box, Heading } from '@radix-ui/themes';

import authOptions from '@/app/_auth/authOptions';
import NewComment from './NewComment';
import CommentList from './CommentList';

type Props = {
  issue: Prisma.IssueGetPayload<{
    include: {
      comments: { include: { author: true } };
      assignedToUser: true;
    };
  }>;
};

const IssueComments: React.FC<Props> = async ({ issue }) => {
  const session = await getServerSession(authOptions);

  return (
    <Box>
      <Heading as='h2' size='4'>
        {issue.comments.length} comments
      </Heading>

      <Box my='4'>
        {session?.user ? (
          <NewComment issueId={issue.id} />
        ) : (
          <Box>Sign up to comment</Box>
        )}
      </Box>

      <CommentList comments={issue.comments} />
    </Box>
  );
};

export default IssueComments;
