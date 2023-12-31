import { getServerSession } from 'next-auth';
import { Prisma } from '@prisma/client';
import { Flex, Avatar, Text } from '@radix-ui/themes';

import authOptions from '@/app/_auth/authOptions';
import CommentBadges from './CommentBadges';
import CommentReplies from './CommentReplies';
import { PersonIcon } from '@radix-ui/react-icons';

type Props = {
  issue: Prisma.IssueGetPayload<{
    include: {
      comments: {
        include: { author: true; replies: { include: { author: true } } };
      };
    };
  }>;
};

const CommentList: React.FC<Props> = async ({ issue }) => {
  const session = await getServerSession(authOptions);

  return (
    <Flex direction='column' gap='5'>
      {issue.comments.map((comment) => {
        const { id, author, text, createdAt } = comment;
        return (
          <Flex key={id} gap={{ initial: '2', xs: '3' }}>
            <Avatar
              src={author.image!}
              fallback='?'
              size={{ initial: '2', md: '3' }}
              radius='full'
            />
            <Flex direction='column' gap='3' width='100%'>
              <Flex direction='column' gap='1'>
                <Flex justify='between' align='center' gap='2'>
                  <Flex align='center' gap='1'>
                    <Text size='2' weight='bold'>
                      {author.name}
                    </Text>
                    {author.id === session?.user.id ? (
                      <PersonIcon className='text-indigo-700' />
                    ) : null}
                  </Flex>
                  <Text size='1' color='gray'>
                    {createdAt.toDateString()}
                  </Text>
                </Flex>

                <CommentBadges
                  isIssueCreator={author.id === issue.creatorId}
                  isAssignedToIssue={author.id === issue.assignedToUserId}
                />

                <Text size='2'>{text}</Text>
              </Flex>

              <CommentReplies issue={issue} comment={comment} />
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default CommentList;
