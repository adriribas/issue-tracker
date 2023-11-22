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

import { Skeleton } from '@/app/components';

type Props = {
  issueId: Issue['id'];
};

const NewComment: React.FC<Props> = ({ issueId }) => {
  const { data: session, status: ddd } = useSession();
  const [writeMode, setWriteMode] = useState(false);
  const [text, setText] = useState('');

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '0';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useLayoutEffect(() => resizeTextArea(), []);

  const handleActivateWritting = () => {
    setWriteMode(true);
  };

  const handleCancelWritting = () => {
    setWriteMode(false);
  };

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setText(event.target.value);
    resizeTextArea();
  };

  const handlePublishComment = () => {};

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
            size={{ initial: '1', xs: '2' }}
            variant='soft'
            color='gray'
            onClick={handleCancelWritting}>
            Cancel
          </Button>
          <Button
            disabled={text.length === 0}
            size={{ initial: '1', xs: '2' }}
            onClick={handlePublishComment}>
            Publish
          </Button>
        </Flex>
      ) : null}
    </Box>
  );
};

export default NewComment;
