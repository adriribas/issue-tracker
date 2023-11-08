'use client';

import { useState, type MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import type { Issue } from '@prisma/client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import axios from 'axios';

type Props = {
  issueId: Issue['id'];
};

const DeleteIssueButton: React.FC<Props> = ({ issueId }) => {
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push('/issues');
      router.refresh();
    } catch (e) {
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red'>
            <TrashIcon />
            Delete Issue
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>

          <Flex className='gap-3 mt-4'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color='red' onClick={handleClick}>
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Button
            variant='soft'
            color='gray'
            mt='2'
            onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
