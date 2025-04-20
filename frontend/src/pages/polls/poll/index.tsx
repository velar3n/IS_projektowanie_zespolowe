import { Button, Flex, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { PollFormData } from './types';
import DetailsForm from './components/DetailsForm';
import SurveyQuestions from './components/SurveyQuestions';
import { useTranslation } from 'react-i18next';

const Poll = () => {
  const {
    control,
    handleSubmit,
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

  const handleForm = (data: PollFormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
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
