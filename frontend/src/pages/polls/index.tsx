import DataTable from '@/components/table';
import { Stack } from '@chakra-ui/react';
import exampleData from './data';
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { PollRow } from './types';
import BooleanCell from '@/components/table/components/BooleanCell';
import { camelCaseToTitleCase } from '@/utils/text';
import ActionCell from '@/components/table/components/ActionCell';
import { useState } from 'react';

const Polls = () => {
  const columnHelper = createColumnHelper<PollRow>();
  const [data, setData] = useState(exampleData);

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
    {
      id: 'action',
      cell: (ctx: CellContext<PollRow, undefined>) => {
        const currentRowId = ctx.row.index;
        return (
          <ActionCell
            config={[
              {
                label: 'Delete',
                value: 'delete',
                destructive: true,
                onClick: () =>
                  setData((prev) =>
                    prev.filter((_, index) => index !== currentRowId),
                  ),
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
        searchColumnId="name"
      />
    </Stack>
  );
};

export default Polls;
