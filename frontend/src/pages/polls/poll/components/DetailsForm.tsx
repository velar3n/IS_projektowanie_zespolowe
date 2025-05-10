import { Control } from 'react-hook-form';
import { PollFormData } from '../types';
import { Flex, HStack, Stack, Text } from '@chakra-ui/react';
import TextInput from '@/components/input';
import ControlledSwitch from '@/components/input/ControlledSwitch';
import { useTranslation } from 'react-i18next';
import { checkIfSecondDateBigger, isValidDate } from '@/utils/validation';

type DetailsFormProps = {
  control: Control<PollFormData>;
};
const DetailsForm = ({ control }: DetailsFormProps) => {
  const { t } = useTranslation('polls', { keyPrefix: 'form.details' });
  const { t: tValidation } = useTranslation('common', {
    keyPrefix: 'validation',
  });
  return (
    <Stack>
      <Text fontSize="2xl" mb="24px">
        {t('section')}
      </Text>
      <HStack gap="24px" alignItems="center">
        <Flex flex={1}>
          <TextInput
            control={control}
            name="title"
            placeholder={t('title.placeholder')}
            type="text"
            label={t('title.label')}
            rules={{ required: tValidation('required', { name: 'Title' }) }}
          />
        </Flex>
        <Flex pt="19px" flex={1}>
          <ControlledSwitch
            control={control}
            name="isPublic"
            label={t('title.isPublic')}
          />
        </Flex>
      </HStack>
      <TextInput
        control={control}
        name="description"
        placeholder={t('description.placeholder')}
        label={t('description.label')}
        rules={{ required: tValidation('required', { name: 'Description' }) }}
        multiline
        rows={10}
      />
      <HStack>
        <TextInput
          control={control}
          name="startDate"
          type="date"
          label={t('startDate.label')}
          rules={{
            valueAsDate: true,
            required: tValidation('required', { name: 'Start date' }),
            validate: {
              notInThePast: (v) => isValidDate(tValidation, v as string),
            },
          }}
        />
        <TextInput
          control={control}
          name="endDate"
          type="date"
          label={t('endDate.label')}
          rules={{
            required: tValidation('required', { name: 'End date' }),
            validate: {
              laterThanStartDate: (v, formValues) =>
                checkIfSecondDateBigger(
                  tValidation,
                  v as string,
                  formValues.startDate,
                  'start date',
                ),
            },
          }}
        />
      </HStack>
    </Stack>
  );
};

export default DetailsForm;
