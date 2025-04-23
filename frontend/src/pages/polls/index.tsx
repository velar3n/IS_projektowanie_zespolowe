import DataTable from '@/components/table';
import { Stack } from '@chakra-ui/react';
import exampleData from './data';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PollRow } from './types';
import BooleanCell from '@/components/table/components/BooleanCell';
import { camelCaseToTitleCase } from '@/utils/text';

const Polls = () => {
  const columnHelper = createColumnHelper<PollRow>();

  const columns = [
    columnHelper.accessor('id', { cell: (ctx) => ctx.getValue() }),
    columnHelper.accessor('name', { cell: (ctx) => ctx.getValue() }),
    columnHelper.accessor('startDate', {
      cell: (ctx) => ctx.getValue(),
      header: (ctx) => camelCaseToTitleCase(ctx.column.id),
    }),
    columnHelper.accessor('endDate', {
      cell: (ctx) => ctx.getValue(),
      header: (ctx) => camelCaseToTitleCase(ctx.column.id),
    }),
    columnHelper.accessor('createdBy', {
      cell: (ctx) => ctx.getValue(),
      header: (ctx) => camelCaseToTitleCase(ctx.column.id),
    }),
    columnHelper.accessor('isPublic', {
      cell: (ctx) => <BooleanCell value={ctx.getValue()} />,
      header: (ctx) => camelCaseToTitleCase(ctx.column.id),
    }),
  ];

  return (
    <Stack w="100%" h="100%" px="32px">
      <DataTable
        data={exampleData}
        columns={columns as ColumnDef<PollRow>[]}
        searchColumnId="name"
      />
    </Stack>
  );
};

export default Polls;
