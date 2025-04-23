import { ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

type PaginationProps<T> = {
  table: Table<T>;
};

const TablePagination = <T,>({ table }: PaginationProps<T>) => {
  const rowCount = table.getRowCount();
  const currentPage = table.getState().pagination.pageIndex;
  const currentPageSize = table.getState().pagination.pageSize;

  return (
    <Pagination.Root
      count={rowCount}
      page={currentPage + 1}
      pageSize={currentPageSize}
      onPageChange={(e) => table.setPageIndex(e.page - 1)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default TablePagination;
