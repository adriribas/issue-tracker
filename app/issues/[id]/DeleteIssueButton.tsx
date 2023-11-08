'use client';

import type { Issue } from '@prisma/client';
import { Button } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

type Props = {
  issueId: Issue['id'];
};

const DeleteIssueButton: React.FC<Props> = ({ issueId }) => {
  return (
    <Button color='red'>
      <TrashIcon />
      Delete Issue
    </Button>
  );
};

export default DeleteIssueButton;
