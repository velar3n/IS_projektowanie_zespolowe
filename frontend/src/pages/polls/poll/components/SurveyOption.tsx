import { HStack, IconButton } from '@chakra-ui/react';
import { PollFormData } from '../types';
import TextInput from '@/components/input';
import { Control, Path } from 'react-hook-form';
import ConfirmationModal from '@/components/modal/ConfirmationModal';
import { MdDelete } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

type SurveyOptionProps = {
  control: Control<PollFormData>;
  name: Path<PollFormData>;
  onDelete: () => void;
};

const SurveyOption = ({ control, name, onDelete }: SurveyOptionProps) => {
  const { t } = useTranslation('polls', {
    keyPrefix: 'form.questions.question',
  });

  const { t: tValidation } = useTranslation('common', {
    keyPrefix: 'validation',
  });

  return (
    <HStack pl="32px" gap="8px">
      <div
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '2.5px',
          backgroundColor: 'black',
          marginRight: '12px',
        }}
      ></div>
      <TextInput
        name={name}
        control={control}
        placeholder={t('options.placeholder')}
        rules={{ required: tValidation('required', { name: 'Option text' }) }}
      />
      <ConfirmationModal
        destructive
        action={onDelete}
        trigger={
          <IconButton variant="ghost">
            <MdDelete />
          </IconButton>
        }
      />
    </HStack>
  );
};

export default SurveyOption;
