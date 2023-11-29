'use client';

import { ChangeEventHandler, useRef, useState } from 'react';
import { Button, Box, Text, TextArea, Flex, Avatar } from '@radix-ui/themes';
import { ChatBubbleIcon, Pencil1Icon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import type { Comment, Issue } from '@prisma/client';
import axios from 'axios';
import toast from 'react-hot-toast';

import { Skeleton, Spinner } from '@/app/components';

type Props = {
  issueId: Issue['id'];
  commentId: Comment['id'];
  onReply?: () => void;
};

const NewReply: React.FC<Props> = ({ issueId, commentId, onReply }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isReplaying, setIsReplaying] = useState(false);
  const [text, setText] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resetStates = () => {
    setIsReplaying(false);
    setText('');
  };

  const handleStartReplaying = () => {
    setIsReplaying(true);
  };

  const handleCancelReplaying = () => {
    resetStates();
  };

  if (!isReplaying) {
    return (
      <Button variant='ghost' color='gray' onClick={handleStartReplaying}>
        <Pencil1Icon />
        <Text weight='medium'>Reply</Text>
      </Button>
    );
  }

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
    resizeTextArea();
  };

  const handlePublishReply = async () => {
    try {
      setIsPublishing(true);
      await axios.post(`/api/issues/${issueId}/comments`, {
        text,
        repliedCommentId: commentId,
      });
      resetStates();
      onReply?.();
      router.refresh();
    } catch (e) {
      toast.error('Failed to publish this reply. Try it later.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Flex gap={{ initial: '2', xs: '3' }} width='100%'>
      <Avatar
        src={session?.user?.image!}
        fallback={<Skeleton circle />}
        size='1'
        radius='full'
      />

      <Box width='100%'>
        <TextArea
          ref={textAreaRef}
          placeholder='Write a reply...'
          value={text}
          onChange={handleTextChange}
          className='overflow-hidden'
        />
        <Flex justify='end' gap='4' mt='2'>
          <Button
            disabled={isPublishing}
            size={{ initial: '1', xs: '2' }}
            variant='soft'
            color='gray'
            onClick={handleCancelReplaying}>
            Cancel
          </Button>
          <Button
            disabled={text.length === 0 || isPublishing}
            size={{ initial: '1', xs: '2' }}
            onClick={handlePublishReply}>
            {<ChatBubbleIcon />}
            Publish
            {isPublishing ? <Spinner /> : null}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default NewReply;
