import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTable, useSortBy } from 'react-table';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import {
  Box,
  Tooltip,
  Table,
  Checkbox,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Skeleton,
} from '@mui/material';

function DataTable(props) {
  const {
    data,
    columns,
    loading,
    resetData,
    total,
    setModalOpen,
    setData,
    handleDelete,
    handleCall,
    updateAccessEnd,
    hasCheckbox,
    selected,
    setSelected,
    tableSize,
    rowClickFunction,
    ...rest
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const selectedCount = selected && selected.length;

  const handleSelectAll = (event) => {
    const selectAll = event.target.checked;
    setSelected(selectAll ? data.map((n) => n.id) : []);
  };

  const handleSingleSelect = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const ChangePage = async (event, newPage) => {
    setPage(newPage);
    await resetData(newPage, rowsPerPage);
  };

  const ChangeRowsPerPage = async (event) => {
    setPage(0);
    setRowsPerPage(+event.target.value);
    await resetData(0, +event.target.value);
  };

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  let headerProps = {};

  return (
    <>
      <div className="w-full flex flex-col">
        {data.length == 0 ? (
          <div className="flex justify-center items-center h-[100px] w-full">There is no data</div>
        ) : (
          <FuseScrollbars className="grow overflow-x-auto">
            <div className="w-full">
              <Table {...getTableProps()}>
                <TableHead
                  sx={{
                    backgroundColor: '#F6F7F9',
                  }}
                >
                  {headerGroups.map((headerGroup, i) => (
                    <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
                      {hasCheckbox && (
                        <TableCell padding="none" className="w-40 md:w-64 text-center z-99">
                          <Checkbox
                            indeterminate={selectedCount > 0 && selectedCount < rows.length}
                            checked={selectedCount === rows.length}
                            onChange={handleSelectAll}
                            style={{ color: '#1890FF' }}
                          />
                        </TableCell>
                      )}
                      {headerGroup.headers.map((column, idx) => {
                        headerProps = column.isSortable
                          ? column.getHeaderProps(column.getSortByToggleProps())
                          : column.getHeaderProps();
                        return (
                          <TableCell
                            key={idx}
                            sortDirection={column.isSortedDesc ? 'desc' : 'asc'}
                            sx={{
                              textAlign:
                                column.Header === 'Action' || column.Header === 'Status'
                                  ? 'center'
                                  : 'left',
                            }}
                            {...headerProps}
                          >
                            {column.isSortable ? (
                              <Tooltip enterDelay={300} title="Sort">
                                <TableSortLabel
                                  active={column.isSorted}
                                  direction={column.isSortedDesc ? 'desc' : 'asc'}
                                  className="font-semibold"
                                  sx={{
                                    textAlign: column.align ? column.align : 'left',
                                  }}
                                >
                                  {column.render('Header')}
                                </TableSortLabel>
                              </Tooltip>
                            ) : (
                              <Box
                                className="font-semibold"
                                sx={{
                                  textAlign: column.align ? column.align : 'left',
                                }}
                              >
                                {column.Header}
                              </Box>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <TableRow
                        hover
                        key={i}
                        {...row.getRowProps()}
                        onClick={() => {
                          if (rowClickFunction) {
                            rowClickFunction(row.original);
                          }
                        }}
                        sx={{
                          cursor: rowClickFunction ? 'pointer' : 'default',
                        }}
                      >
                        {hasCheckbox && (
                          <TableCell className="text-center">
                            <Checkbox
                              checked={selected.includes(row.original.id)}
                              onClick={(event) => event.stopPropagation()}
                              onChange={(e) => handleSingleSelect(e, row.original.id)}
                              style={{ color: '#1890FF' }}
                            />
                          </TableCell>
                        )}
                        {row.cells.map((cell, j) => {
                          return (
                            <TableCell
                              key={j}
                              sx={{
                                textAlign: cell.column.align ? cell.column.align : 'left',
                                width: cell.column.width ? cell.column.width : 'auto',
                              }}
                              {...cell.getCellProps()}
                            >
                              {loading ? (
                                <Skeleton animation="wave" />
                              ) : (
                                cell.render('Cell', {
                                  setModalOpen,
                                  row,
                                  setData,
                                  handleDelete,
                                  handleCall,
                                  updateAccessEnd,
                                  ...rest,
                                })
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </FuseScrollbars>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 25, 50, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={ChangePage}
          onRowsPerPageChange={ChangeRowsPerPage}
        />
      </div>
    </>
  );
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  hasCheckbox: PropTypes.bool,
  setModalOpen: PropTypes.func,
  setData: PropTypes.func,
  handleDelete: PropTypes.func,
  handleCall: PropTypes.func,
  updateAccessEnd: PropTypes.func,
  total: PropTypes.number,
  selected: PropTypes.array,
  setSelected: PropTypes.func,
  rowClickFunction: PropTypes.func,
};

export default DataTable;
