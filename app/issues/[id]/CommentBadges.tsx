import { Flex, Badge } from '@radix-ui/themes';

type Props = {
  isIssueCreator?: boolean;
  isAssignedToIssue?: boolean;
};

const CommentBadges: React.FC<Props> = ({
  isIssueCreator = false,
  isAssignedToIssue = false,
}) => {
  return (
    <Flex gap='2'>
      {isIssueCreator ? <Badge color='mint'>Creator</Badge> : null}
      {isAssignedToIssue ? <Badge color='gold'>Assigned</Badge> : null}
    </Flex>
  );
};

export default CommentBadges;
