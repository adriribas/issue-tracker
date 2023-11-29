'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { type Issue, Prisma } from '@prisma/client';
import { Avatar, Box, Button, Flex, Text } from '@radix-ui/themes';
import { ChevronRightIcon, PersonIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';

import CommentBadges from './CommentBadges';
import NewReply from './NewReply';

type Props = {
  issue: Issue;
  comment: Prisma.CommentGetPayload<{
    include: { replies: { include: { author: true } } };
  }>;
};

const CommentReplies: React.FC<Props> = ({ issue, comment }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { data: session } = useSession();

  if (comment.replies.length === 0) {
    const handleReplay = () => {
      setIsCollapsed(false);
    };

    return (
      <Box>
        <NewReply
          issueId={issue.id}
          commentId={comment.id}
          onReply={handleReplay}
        />
      </Box>
    );
  }

  const handleToggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  return (
    <Flex direction='column' gap='2' align='start'>
      <Button variant='ghost' onClick={handleToggleCollapse}>
        <Text weight='medium'>
          {isCollapsed ? 'Show' : 'Hide'} {comment.replies.length} repl
          {comment.replies.length === 1 ? 'y' : 'ies'}
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
        {comment.replies.map((reply) => {
          const { id, text, author } = reply;
          return (
            <Flex key={id} gap={{ initial: '2', xs: '3' }}>
              <Avatar src={author.image!} fallback='?' size='1' radius='full' />
              <Flex direction='column' gap='1' width='100%'>
                <Flex align='center' gap='1'>
                  <Text size='2' weight='bold'>
                    {author.name}
                  </Text>
                  {author.id === session?.user.id ? (
                    <PersonIcon className='text-indigo-700' />
                  ) : null}
                </Flex>

                <CommentBadges
                  isIssueCreator={author.id === issue.creatorId}
                  isAssignedToIssue={author.id === issue.assignedToUserId}
                />
                <Text size='2'>{text}</Text>
              </Flex>
            </Flex>
          );
        })}

        <NewReply issueId={issue.id} commentId={comment.id} />
      </Flex>
    </Flex>
  );
};

export default CommentReplies;
