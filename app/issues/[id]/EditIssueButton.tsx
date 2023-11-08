import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import type { Issue } from '@prisma/client';

type Props = {
  issueId: Issue['id'];
};

const EditIssueButton: React.FC<Props> = ({ issueId }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
