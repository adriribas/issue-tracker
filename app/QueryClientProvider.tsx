'use client';

import type { PropsWithChildren } from 'react';
import {
  QueryClient,
  QueryClientProvider as Provider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const QueryClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider client={queryClient}>{children}</Provider>;
};

export default QueryClientProvider;
