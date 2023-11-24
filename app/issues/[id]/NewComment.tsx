'use client';

import type { Issue } from '@prisma/client';
import { Avatar, Flex, TextArea, Box, Button } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import {
  type ChangeEventHandler,
  useState,
  useLayoutEffect,
  useRef,
} from 'react';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { Skeleton, Spinner } from '@/app/components';

type Props = {
  issueId: Issue['id'];
};

const NewComment: React.FC<Props> = ({ issueId }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [writeMode, setWriteMode] = useState(false);
  const [text, setText] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useLayoutEffect(() => resizeTextArea(), []);

  const resetStates = () => {
    setWriteMode(false);
    setText('');
  };

  const handleActivateWritting = () => {
    setWriteMode(true);
  };

  const handleCancelWritting = () => {
    resetStates();
  };

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
    resizeTextArea();
  };

  const handlePublishComment = async () => {
    try {
      setIsPublishing(true);
      await axios.post(`/api/issues/${issueId}/comments`, { text });
      resetStates();
      router.refresh();
    } catch (e) {
      toast.error('Failed to publish this comment. Try it later.');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Box>
      <Flex gap={{ initial: '2', xs: '3' }}>
        <Avatar
          src={session?.user?.image!}
          fallback={<Skeleton circle />}
          size={{ initial: '2', md: '3' }}
          radius='full'
        />
        <Box width='100%'>
          <TextArea
            ref={textAreaRef}
            placeholder='Write a comment...'
            value={text}
            onChange={handleTextChange}
            onFocus={handleActivateWritting}
            className='overflow-hidden'
          />
        </Box>
      </Flex>
      {writeMode ? (
        <Flex justify='end' gap='4' mt='2'>
          <Button
            disabled={isPublishing}
            size={{ initial: '1', xs: '2' }}
            variant='soft'
            color='gray'
            onClick={handleCancelWritting}>
            Cancel
          </Button>
          <Button
            disabled={text.length === 0 || isPublishing}
            size={{ initial: '1', xs: '2' }}
            onClick={handlePublishComment}>
            {<ChatBubbleIcon />}
            Publish
            {isPublishing ? <Spinner /> : null}
          </Button>
        </Flex>
      ) : null}
    </Box>
  );
};

export default NewComment;
