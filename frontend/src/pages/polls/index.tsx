import DataTable from '@/components/table';
import { Stack } from '@chakra-ui/react';
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { PollRow } from './types';
import BooleanCell from '@/components/table/components/BooleanCell';
import { camelCaseToTitleCase } from '@/utils/text';
import ActionCell from '@/components/table/components/ActionCell';
import NavigationCell from '@/components/table/components/NavigationCell';
import { useNavigate } from 'react-router-dom';
import { useDeletePoll, usePolls } from '@/api/poll/hooks';

const Polls = () => {
  const columnHelper = createColumnHelper<PollRow>();
  const { data: pollsData, isLoading } = usePolls('all');
  const { mutate: deletePoll } = useDeletePoll();
  const navigate = useNavigate();

  const data = isLoading ? [] : pollsData;

  const columns = [
    columnHelper.accessor('id', { cell: (ctx) => ctx.getValue() }),
    columnHelper.accessor('title', {
      cell: (ctx) => (
        <NavigationCell
          label={ctx.getValue()}
          destination={`/poll/${ctx.row.original.id}?mode=preview`}
        />
      ),
    }),
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
    columnHelper.accessor('public', {
      cell: (ctx) => <BooleanCell value={ctx.getValue()} />,
      header: (ctx) => camelCaseToTitleCase(ctx.column.id),
    }),
    {
      id: 'action',
      cell: (ctx: CellContext<PollRow, undefined>) => {
        const currentRowId = ctx.row.original.id;
        return (
          <ActionCell
            config={[
              {
                label: 'View results',
                value: 'viewResults',
                onClick: () => navigate(`/poll/${currentRowId}/results`),
              },
              {
                label: 'Delete',
                value: 'delete',
                destructive: true,
                onClick: () => {
                  deletePoll(currentRowId.toString());
                },
              },
            ]}
          />
        );
      },
      header: 'Actions',
    },
  ];

  return (
    <Stack w="100%" h="100%" px="32px">
      <DataTable
        data={data}
        columns={columns as ColumnDef<PollRow>[]}
        searchColumnId="title"
        buttonConfig={{
          label: 'Add form',
          onClick: () => {
            navigate('/polls/poll');
          },
        }}
      />
    </Stack>
  );
};

export default Polls;
