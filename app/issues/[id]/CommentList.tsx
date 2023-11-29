import { getServerSession } from 'next-auth';
import { Prisma } from '@prisma/client';
import { Flex, Avatar, Text } from '@radix-ui/themes';

import authOptions from '@/app/_auth/authOptions';
import CommentBadges from './CommentBadges';
import CommentReplies from './CommentReplies';

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

  const isIssueCreator = issue.creatorId === session?.user.id;
  const isAssignedToIssue =
    !!issue.assignedToUserId && session?.user.id === issue.assignedToUserId;

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
                  <Text size='2' weight='bold'>
                    {author.name}
                  </Text>
                  <Text size='1' color='gray'>
                    {createdAt.toDateString()}
                  </Text>
                </Flex>

                <CommentBadges
                  isIssueCreator={isIssueCreator}
                  isAssignedToIssue={isAssignedToIssue}
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
