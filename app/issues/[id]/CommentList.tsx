import { getServerSession } from 'next-auth';
import { type Issue, Prisma } from '@prisma/client';
import { Flex, Avatar, Text } from '@radix-ui/themes';

import authOptions from '@/app/_auth/authOptions';
import CommentBadges from './CommentBadges';

type Props = {
  comments: Array<Prisma.CommentGetPayload<{ include: { author: true } }>>;
  assignedToId?: Issue['assignedToUserId'];
};

const CommentList: React.FC<Props> = async ({ comments, assignedToId }) => {
  const session = await getServerSession(authOptions);

  const isAssignedToIssue = !!assignedToId && session?.user.id === assignedToId;

  return (
    <Flex direction='column' gap='5'>
      {comments.map((comment) => {
        const { id, author, text, createdAt } = comment;
        return (
          <Flex key={id} gap={{ initial: '2', xs: '3' }}>
            <Avatar
              src={author.image!}
              fallback='?'
              size={{ initial: '2', md: '3' }}
              radius='full'
            />
            <Flex direction='column' gap='1' width='100%'>
              <Flex justify='between' align='center' gap='2'>
                <Text size='2' weight='bold'>
                  {author.name}
                </Text>

                <Text size='1' color='gray'>
                  {createdAt.toDateString()}
                </Text>
              </Flex>

              <CommentBadges isAssignedToIssue={isAssignedToIssue} />

              <Text size='2'>{text}</Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default CommentList;
