import { type PropsWithChildren } from 'react';
import { Text } from '@radix-ui/themes';

const ErrorMessage: React.FC<PropsWithChildren> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <Text as='p' color='red'>
      {children}
    </Text>
  );
};

export default ErrorMessage;
