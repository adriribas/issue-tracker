'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, TextField, Callout, Text } from '@radix-ui/themes';
import SimpleMdeReact from 'react-simplemde-editor';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';

import { createIssueSchema } from '@/app/validationSchemas';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (e) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className='max-w-xl'>
      {error ? (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)} className=' space-y-3'>
        <TextField.Root>
          <TextField.Input {...register('title')} placeholder='Title' />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMdeReact {...field} placeholder='Description' />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button type='submit'>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
