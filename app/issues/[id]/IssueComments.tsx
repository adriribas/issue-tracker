import { getServerSession } from 'next-auth';
import { Prisma } from '@prisma/client';
import { Box, Flex, Heading } from '@radix-ui/themes';
import { ChatBubbleIcon } from '@radix-ui/react-icons';

import authOptions from '@/app/_auth/authOptions';
import NewComment from './NewComment';
import CommentList from './CommentList';
import SignInToComment from './SignInToComment';

type Props = {
  issue: Prisma.IssueGetPayload<{
    include: {
      comments: {
        include: { author: true; replies: { include: { author: true } } };
      };
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

      <CommentList issue={issue} />
    </Box>
  );
};

export default IssueComments;
