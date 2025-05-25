import { usePollDetails } from '@/api/poll/hooks';
import FullScreenSpinner from '@/components/FullScreenSpinner';
import { Stack } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'react-router-dom';
import PollHeader from './components/PollHeader';
import PollQuestions from './components/PollQuestions';
import { useForm } from 'react-hook-form';
import { PollMode, PollSubmissionFormData } from './types';
import { useEffect, useState } from 'react';

const getPollMode = (mode: string | null): PollMode => {
  if (mode === 'preview') {
    return 'preview';
  }
  return 'form';
};

const SinglePoll = () => {
  const [searchParams] = useSearchParams();
  const [pollMode, setPollMode] = useState<PollMode>(
    getPollMode(searchParams.get('mode')),
  );

  const { pollId } = useParams();
  const { data, isLoading } = usePollDetails(pollId);

  const { control, reset, handleSubmit } = useForm<PollSubmissionFormData>();

  const handlePollSubmisstion = (data: PollSubmissionFormData) => {
    console.log('SIEMKA: ', data);
  };

  const isEditable = pollMode === 'form';

  useEffect(() => {
    if (data) {
      const initialData: PollSubmissionFormData = {
        anwers: data.questions.map((question) => ({
          questionId: question.id,
          selected: question.options.map((option) => ({
            optionId: option.id,
            selected: false,
          })),
        })),
      };
      reset(initialData);
    }
  }, [data, reset]);

  if (isLoading && !data) {
    return <FullScreenSpinner />;
  }

  return (
    <Stack minW="60%">
      <Stack gap="32px">
        <PollHeader
          title={data?.title}
          description={data?.description}
          startDate={data?.startDate}
          endDate={data?.endDate}
          onSubmit={
            isEditable ? () => handleSubmit(handlePollSubmisstion)() : undefined
          }
        />
        <PollQuestions
          questions={data?.questions ?? []}
          control={control}
          disabled={!isEditable}
        />
      </Stack>
    </Stack>
  );
};

export default SinglePoll;
