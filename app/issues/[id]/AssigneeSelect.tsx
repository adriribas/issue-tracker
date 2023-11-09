'use client';

import { Select } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import type { User } from '@prisma/client';
import axios from 'axios';

const AssigneeSelect: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<Array<User>>('/api/users', { signal: controller.signal })
      .then(({ data }) => setUsers(data));

    return () => controller.abort();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => {
            const { id, name } = user;
            return (
              <Select.Item key={id} value={id}>
                {name}
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
