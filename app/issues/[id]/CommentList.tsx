import { Prisma } from '@prisma/client';
import { Flex, Avatar, Text } from '@radix-ui/themes';

type Props = {
  comments: Array<Prisma.CommentGetPayload<{ include: { author: true } }>>;
};

const CommentList: React.FC<Props> = ({ comments }) => {
  if (comments.length === 0) {
    return 'No comments';
  }

  return (
    <Flex direction='column' gap='5'>
      {comments.map((comment) => {
        const { id, author, text } = comment;
        return (
          <Flex key={id} gap={{ initial: '2', xs: '3' }}>
            <Avatar
              src={author.image!}
              fallback='?'
              size={{ initial: '2', md: '3' }}
              radius='full'
            />
            <Flex direction='column' gap='1'>
              <Text size='2' weight='bold'>
                {author.name}
              </Text>
              <Text size='2'>{text}</Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default CommentList;
