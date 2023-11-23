import { getServerSession } from 'next-auth';
import { Prisma } from '@prisma/client';
import { Box, Button, Callout, Flex, Heading } from '@radix-ui/themes';

import authOptions from '@/app/_auth/authOptions';
import NewComment from './NewComment';
import CommentList from './CommentList';
import SignInToComment from './SignInToComment';

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

  const logged = !!session?.user;

  return (
    <Box>
      <Flex justify='between'>
        <Heading as='h2' size='4'>
          {issue.comments.length} comments
        </Heading>
      </Flex>

      <Box my='4'>
        {logged ? <NewComment issueId={issue.id} /> : <SignInToComment />}
      </Box>

      <CommentList comments={issue.comments} />
    </Box>
  );
};

export default IssueComments;
