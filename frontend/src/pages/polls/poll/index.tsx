import { Button, Flex, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { PollFormData } from './types';
import DetailsForm from './components/DetailsForm';
import SurveyQuestions from './components/SurveyQuestions';
import { useTranslation } from 'react-i18next';
import { useCreatePoll } from '@/api/poll/hooks';
import { CreatePollRequest } from '@/api/poll/types';
import { toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';

const Poll = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<PollFormData>({
    defaultValues: {
      title: '',
      description: '',
      isPublic: true,
      startDate: undefined,
      endDate: undefined,
      questions: [],
    },
  });
  const { t } = useTranslation('polls', { keyPrefix: 'form' });
  const { mutateAsync: createPoll } = useCreatePoll();

  const handleForm = async (data: PollFormData) => {
    const requestData: CreatePollRequest = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      questions: data.questions.map((question) => ({
        text: question.questionText,
        type: question.isMulti ? 'MULTIPLE-CHOICE' : 'SINGLE-CHOICE',
        options: question.options.map((option) => option.text),
      })),
    };

    try {
      await createPoll(requestData);
      reset(data);
      toaster.success({ title: 'Successfully created a poll' });
      navigate('/polls');
    } catch {
      toaster.error({ title: 'Failed to create a poll' });
    }
  };

  return (
    <Flex width="100%" justifyContent="center">
      <Stack width="80%" gap="32px" position="relative">
        <Button
          position="absolute"
          right="0"
          px="64px"
          disabled={!isDirty}
          onClick={handleSubmit(handleForm)}
        >
          {t('save')}
        </Button>
        <DetailsForm control={control} />
        <SurveyQuestions control={control} />
      </Stack>
    </Flex>
  );
};

export default Poll;
