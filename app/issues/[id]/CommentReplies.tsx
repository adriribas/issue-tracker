'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { type Issue, Prisma, type Comment } from '@prisma/client';
import { Avatar, Box, Button, Flex, Text } from '@radix-ui/themes';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';

import CommentBadges from './CommentBadges';
import NewReply from './NewReply';

type Props = {
  issueId: Issue['id'];
  commentId: Comment['id'];
  replies: Array<Prisma.CommentGetPayload<{ include: { author: true } }>>;
  creatorId: Issue['creatorId'];
  assignedToId?: Issue['assignedToUserId'];
};

const CommentReplies: React.FC<Props> = ({
  issueId,
  commentId,
  replies,
  creatorId,
  assignedToId,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { data: session } = useSession();

  if (replies.length === 0) {
    const handleReplay = () => {
      setIsCollapsed(false);
    };

    return (
      <Box>
        <NewReply
          issueId={issueId}
          commentId={commentId}
          onReply={handleReplay}
        />
      </Box>
    );
  }

  const isIssueCreator = creatorId === session?.user.id;
  const isAssignedToIssue = !!assignedToId && assignedToId === session?.user.id;

  const handleToggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <Flex direction='column' gap='2' align='start'>
      <Button variant='ghost' onClick={handleToggleCollapse}>
        <Text weight='medium'>
          {isCollapsed ? 'Show' : 'Hide'} {replies.length} repl
          {replies.length === 1 ? 'y' : 'ies'}
        </Text>
        <ChevronRightIcon
          className={classNames({
            'ease-in-out duration-300': true,
            'rotate-90': !isCollapsed,
          })}
        />
      </Button>

      <Flex
        direction='column'
        align='start'
        gap='3'
        width='100%'
        className={classNames({
          'ease-in-out duration-300': true,
          'max-h-0 opacity-0 overflow-hidden': isCollapsed,
          'max-h-screen opacity-100': !isCollapsed,
        })}>
        {replies.map((reply) => {
          const { id, text, author } = reply;
          return (
            <Flex key={id} gap={{ initial: '2', xs: '3' }}>
              <Avatar src={author.image!} fallback='?' size='1' radius='full' />
              <Flex direction='column' gap='1' width='100%'>
                <Text size='2' weight='bold'>
                  {author.name}
                </Text>

                <CommentBadges
                  isIssueCreator={isIssueCreator}
                  isAssignedToIssue={isAssignedToIssue}
                />
                <Text size='2'>{text}</Text>
              </Flex>
            </Flex>
          );
        })}

        <NewReply issueId={issueId} commentId={commentId} />
      </Flex>
    </Flex>
  );
};

export default CommentReplies;
