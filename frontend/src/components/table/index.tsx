import { Button, Flex, HStack, Stack, Table } from '@chakra-ui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import TableSearch from './components/TableSearch';
import Pagination from './components/TablePagination';

type DataTableProps<T> = {
  data: Array<T>;
  columns: Array<ColumnDef<T>>;
  searchColumnId?: keyof T;
  buttonConfig?: {
    label: string;
    onClick: () => void;
  };
};

const DataTable = <T,>({
  data,
  columns,
  buttonConfig,
  searchColumnId,
}: DataTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const filterColumn = table
    .getAllColumns()
    .find((column) => column.id === searchColumnId);

  return (
    <Stack gap="20px">
      {buttonConfig && (
        <Flex justifyContent="flex-end">
          <Button onClick={buttonConfig.onClick} px="24px">
            {buttonConfig.label}
          </Button>
        </Flex>
      )}
      <HStack>
        {filterColumn && <TableSearch column={filterColumn} />}
        <Pagination table={table} />
      </HStack>
      <Table.Root variant="outline" showColumnBorder interactive size="md">
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeader
                  key={header.id}
                  p="8px"
                  textTransform="uppercase"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id} p="8px">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

export default DataTable;
