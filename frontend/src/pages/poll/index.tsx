import { usePollDetails, useSubmitPoll } from '@/api/poll/hooks';
import FullScreenSpinner from '@/components/FullScreenSpinner';
import { Stack } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'react-router-dom';
import PollHeader from './components/PollHeader';
import PollQuestions from './components/PollQuestions';
import { useForm } from 'react-hook-form';
import { PollMode, PollSubmissionFormData } from './types';
import { useEffect, useState } from 'react';
import { FilledPollRequest } from '@/api/poll/types';
import { toaster } from '@/components/ui/toaster';

const getPollMode = (mode: string | null): PollMode => {
  if (mode === 'preview') {
    return 'preview';
  }
  return 'form';
};

const SinglePoll = () => {
  const [searchParams] = useSearchParams();
  const [pollMode] = useState<PollMode>(getPollMode(searchParams.get('mode')));

  const { pollId } = useParams();
  const { data, isLoading } = usePollDetails(pollId);
  const { mutateAsync: submitPoll } = useSubmitPoll();

  const { control, reset, handleSubmit } = useForm<PollSubmissionFormData>();

  const handlePollSubmisstion = async (data: PollSubmissionFormData) => {
    if (!pollId) return;
    const requestData: FilledPollRequest = data.anwers.map((answer) => ({
      questionId: answer.questionId.toString(),
      selectedIds: answer.selected.map((selectedItem) =>
        selectedItem.optionId.toString(),
      ),
    }));
    try {
      await submitPoll({ data: requestData, pollId });
      toaster.success({ title: 'Successfully submitted the form' });
    } catch {
      toaster.error({ title: 'Failed to submit the poll' });
    }
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
