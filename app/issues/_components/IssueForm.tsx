'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, TextField, Callout } from '@radix-ui/themes';
import SimpleMdeReact from 'react-simplemde-editor';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import type { Issue } from '@prisma/client';
import 'easymde/dist/easymde.min.css';

import { createIssueSchema } from '@/app/validationSchemas';
import { ErrorMessage, Spinner } from '@/app/components';

type IssueFormData = z.infer<typeof createIssueSchema>;

type Props = {
  issue?: Issue;
};

const IssueForm: React.FC<Props> = ({ issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (e) {
      setError('An unexpected error occurred.');
      setIsSubmitting(false);
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
          <TextField.Input
            {...register('title')}
            defaultValue={issue?.title}
            placeholder='Title'
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMdeReact {...field} placeholder='Description' />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting} type='submit'>
          Submit New Issue {isSubmitting ? <Spinner /> : null}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
