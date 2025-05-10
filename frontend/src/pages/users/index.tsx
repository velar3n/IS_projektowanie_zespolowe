import {
  CellContext,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import { UserRow, UserStatus } from './types';
import StatusCell from '@/components/table/components/StatusCell';
import { statusCellConfig } from './utils';
import DataTable from '@/components/table';
import { mockUsers } from './data';
import { Stack } from '@chakra-ui/react';
import ActionCell from '@/components/table/components/ActionCell';
import { useState } from 'react';

const getUserActionDetails = (userStatus: UserStatus) => {
  switch (userStatus) {
    case 'active':
      return {
        label: 'Block',
        newStatus: 'blocked',
      };
    case 'blocked':
      return {
        label: 'Unblock',
        newStatus: 'active',
      };
    case 'deleted':
      return null;
  }
};

const Users = () => {
  const columnHelper = createColumnHelper<UserRow>();
  const [users, setUsers] = useState(mockUsers);

  const columns = [
    columnHelper.accessor('username', { cell: (ctx) => ctx.getValue() }),
    columnHelper.accessor('email', { cell: (ctx) => ctx.getValue() }),
    columnHelper.accessor('createdAt', { cell: (ctx) => ctx.getValue() }),
    columnHelper.accessor('lastLogin', { cell: (ctx) => ctx.getValue() }),
    columnHelper.accessor('status', {
      cell: (ctx) => (
        <StatusCell status={ctx.getValue()} config={statusCellConfig} />
      ),
    }),

    {
      id: 'action',
      cell: (ctx: CellContext<UserRow, undefined>) => {
        const currentRowId = ctx.row.index;
        const currentUserSatus = users[currentRowId].status;
        const action = getUserActionDetails(currentUserSatus);
        return (
          <ActionCell
            config={[
              ...(action
                ? [
                    {
                      label: action.label,
                      value: action.label,
                      destructive: true,
                      onClick: () => {
                        setUsers((prev) => {
                          const cpy = [...prev];
                          cpy[currentRowId].status =
                            action.newStatus as UserStatus;
                          return cpy;
                        });
                      },
                    },
                  ]
                : []),
              {
                label: 'Delete',
                value: 'delete',
                destructive: true,
                onClick: () =>
                  setUsers((prev) =>
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
        columns={columns as ColumnDef<UserRow>[]}
        data={users}
        searchColumnId="username"
      />
    </Stack>
  );
};

export default Users;
