import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import type { Issue } from '@prisma/client';

type Props = {
  issueId: Issue['id'];
};

const EditIssueButton: React.FC<Props> = ({ issueId }) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button className='w-full'>
        <Pencil2Icon />
        Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssueButton;
