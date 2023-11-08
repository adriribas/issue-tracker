'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Button, TextField, Callout } from '@radix-ui/themes';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import type { Issue } from '@prisma/client';
import 'easymde/dist/easymde.min.css';

import { issueSchema } from '@/app/validationSchemas';
import { ErrorMessage, Spinner } from '@/app/components';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>;

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
    resolver: zodResolver(issueSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
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
            <SimpleMDE {...field} placeholder='Description' />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting} type='submit'>
          {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
          {isSubmitting ? <Spinner /> : null}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
