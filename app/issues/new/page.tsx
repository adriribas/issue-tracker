'use client';

import { Button, TextField } from '@radix-ui/themes';
import SimpleMdeReact from 'react-simplemde-editor';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';

type IssueForm = {
  title: string;
  description: string;
};

const NewIssuePage: React.FC = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>({});

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    await axios.post('/api/issues', data);
    router.push('/issues');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input {...register('title')} placeholder='Title' />
      </TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMdeReact {...field} placeholder='Description' />
        )}
      />

      <Button type='submit'>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
