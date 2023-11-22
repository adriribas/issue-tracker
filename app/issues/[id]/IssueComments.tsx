import { Prisma } from '@prisma/client';
import { Avatar, Box, Card, Flex, Heading, Text } from '@radix-ui/themes';

type Props = {
  issue: Prisma.IssueGetPayload<{
    include: { comments: { include: { author: true } }; assignedToUser: true };
  }>;
};

const IssueComments: React.FC<Props> = ({ issue }) => {
  if (issue.comments.length === 0) {
    return 'No comments';
  }

  return (
    <Box>
      <Heading as='h2' size='4' mb='4'>
        {issue.comments.length} comments
      </Heading>

      <Flex direction='column' gap='5'>
        {issue.comments.map((comment) => {
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
                <Text size={{ initial: '1', xs: '2' }}>{text}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default IssueComments;
