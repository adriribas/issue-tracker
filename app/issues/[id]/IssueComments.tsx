import { getServerSession } from 'next-auth';
import { Prisma } from '@prisma/client';
import { Box, Flex, Heading } from '@radix-ui/themes';

import authOptions from '@/app/_auth/authOptions';
import NewComment from './NewComment';
import CommentList from './CommentList';
import SignInToComment from './SignInToComment';
import { ChatBubbleIcon } from '@radix-ui/react-icons';

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
      <Heading as='h2' size='4'>
        <Flex align='center' gap='3'>
          {<ChatBubbleIcon className='w-6 h-6' />}
          {issue.comments.length} comments
        </Flex>
      </Heading>

      <Box my='4'>
        {logged ? <NewComment issueId={issue.id} /> : <SignInToComment />}
      </Box>

      <CommentList comments={issue.comments} />
    </Box>
  );
};

export default IssueComments;
