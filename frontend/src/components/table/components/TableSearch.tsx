import { Input } from '@chakra-ui/react';
import { Column } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

const TableSearch = <T,>({ column }: { column: Column<T> }) => {
  const { t } = useTranslation('common', { keyPrefix: 'table.search' });
  const columnFilterValue = column.getFilterValue();

  const [search, setSearch] = useState(columnFilterValue as string);
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    column.setFilterValue(debouncedSearch);
  }, [column, debouncedSearch]);

  return (
    <Input
      px="8px"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder={t('placeholder')}
    />
  );
};

export default TableSearch;
