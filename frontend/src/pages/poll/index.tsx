import {
  usePollDetails,
  useSubmitPoll,
  useUserSubmission,
} from '@/api/poll/hooks';
import FullScreenSpinner from '@/components/FullScreenSpinner';
import { Stack } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'react-router-dom';
import PollHeader from './components/PollHeader';
import PollQuestions from './components/PollQuestions';
import { useForm } from 'react-hook-form';
import { PollMode, PollSubmissionFormData } from './types';
import { useEffect } from 'react';
import { FilledPollRequest, PollResponse } from '@/api/poll/types';
import { toaster } from '@/components/ui/toaster';

const getPollMode = (mode: string | null): PollMode => {
  if (mode === 'preview') {
    return 'preview';
  }
  return 'form';
};

const getDefaultValues = (data: PollResponse): PollSubmissionFormData => {
  const initialData: PollSubmissionFormData = {
    anwers: data.questions.map((question) => ({
      questionId: question.id,
      selected: question.options.map((option) => ({
        optionId: option.id,
        selected: false,
      })),
    })),
  };
  return initialData;
};

const SinglePoll = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const submissionId = searchParams.get('submissionId');

  const { pollId } = useParams();
  const { data, isLoading } = usePollDetails(pollId);
  const { data: submissionDetails } = useUserSubmission(submissionId ?? '');
  const { mutateAsync: submitPoll } = useSubmitPoll();

  const {
    control,
    reset,
    handleSubmit,
    formState: { defaultValues },
  } = useForm<PollSubmissionFormData>();

  const handlePollSubmisstion = async (data: PollSubmissionFormData) => {
    if (!pollId) return;
    const requestData: FilledPollRequest = data.anwers.map((answer) => ({
      questionId: answer.questionId.toString(),
      selectedIds: answer.selected
        .filter((answer) => answer.selected)
        .map((answer) => answer.optionId.toString()),
    }));
    try {
      const submissionData = await submitPoll({ data: requestData, pollId });
      setSearchParams({ submissionId: submissionData.submissionId.toString() });
      toaster.success({ title: 'Successfully submitted the form' });
    } catch {
      toaster.error({ title: 'Failed to submit the poll' });
    }
  };

  const isEditable =
    getPollMode(searchParams.get('mode')) === 'form' && !submissionId;

  useEffect(() => {
    if (data) {
      const initialData = getDefaultValues(data);
      reset(initialData);
    }
  }, [data, reset]);

  useEffect(() => {
    if (data && submissionDetails) {
      const newValues: PollSubmissionFormData = {
        anwers: data.questions.map((question) => {
          const matchingAnswer = submissionDetails.answers.find(
            (a) => a.question.id === question.id,
          );

          return {
            questionId: question.id,
            selected: question.options.map((option) => {
              const isSelected = matchingAnswer?.selectedOptions.some(
                (o) => o.id === option.id,
              );
              return {
                optionId: option.id,
                selected: Boolean(isSelected),
              };
            }),
          };
        }),
      };

      reset(newValues);
    }
  }, [data, defaultValues?.anwers, reset, submissionDetails]);

  if (isLoading && !data) {
    return <FullScreenSpinner />;
  }

  return (
    <Stack minW="60%">
      <Stack gap="32px">
        <PollHeader
          pollId={data?.id}
          title={data?.title}
          shouldShowResultsButton={!!submissionId}
          description={data?.description}
          startDate={data?.startDate}
          endDate={data?.endDate}
          onSubmit={
            isEditable
              ? () => {
                  handleSubmit(handlePollSubmisstion)();
                }
              : undefined
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
