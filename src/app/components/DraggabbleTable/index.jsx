import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import PropTypes from 'prop-types';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const DragabbleTable = (props) => {
  const { data, columns, dragHandler, ...rest } = props;

  const [rows, setRows] = useState(data);

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    if (e.source.index === e.destination.index) return;
    const tempData = Array.from(rows);
    const [sourceData] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, sourceData);
    const movedRow = tempData[e.destination.index];
    dragHandler({
      sortedRows: tempData,
      movedRow,
      sourcePosition: e.source.index + 1,
      destinationPosition: e.destination.index + 1,
      movedTo: e.source.index > e.destination.index ? 'up' : 'down',
    });
    setRows(tempData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <TableContainer component={Paper} sx={{ borderRadius: 1 }}>
        <FuseScrollbars className="grow overflow-x-auto">
          <Table sx={{ minWidth: 650, borderRadius: 0 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: '#f5f5f5',
                }}
              >
                <TableCell sx={{ width: 4 }} />
                {columns.map((column) => (
                  <TableCell
                    key={column.accessor}
                    sx={{
                      textAlign: column.align ? column.align : 'left',
                      width: column.width ? column.width : 'auto',
                    }}
                  >
                    {column.Header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <Droppable droppableId="droppable-1">
              {(provider, snapshot) => (
                <TableBody
                  ref={provider.innerRef}
                  {...provider.droppableProps}
                  sx={{
                    backgroundColor: snapshot.isDraggingOver ? '#f5f5f5' : '#fff',
                  }}
                >
                  {rows.map((row, index) => (
                    <Draggable key={`__id${index}`} draggableId={`__id${index}`} index={index}>
                      {(provider2, snapshot2) => (
                        <TableRow
                          key={`__id${index}`}
                          sx={{
                            backgroundColor: snapshot2.isDragging ? '#ededed' : '#fff',
                            boxShadow: snapshot2.isDragging
                              ? '0px 2px 5px rgba(0, 0, 0, 0.1)'
                              : 'none',
                            transition: 'background-color 0.2s ease',
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': { backgroundColor: '#F5F5F5' },
                          }}
                          ref={provider2.innerRef}
                          {...provider2.draggableProps}
                        >
                          <TableCell sx={{ padding: 2 }} {...provider2.dragHandleProps}>
                            <DragHandleIcon />
                          </TableCell>
                          {columns.map((column) => (
                            <TableCell
                              key={column.accessor}
                              sx={{
                                textAlign: column.align ? column.align : 'left',
                                width: column.width ? column.width : 'auto',
                              }}
                            >
                              {column.Cell
                                ? column.Cell({
                                    row,
                                    index,
                                    value: row[column.accessor],
                                    ...rest,
                                  })
                                : row[column.accessor]}
                            </TableCell>
                          ))}
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                </TableBody>
              )}
            </Droppable>
          </Table>
        </FuseScrollbars>
      </TableContainer>
    </DragDropContext>
  );
};

DragabbleTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  dragHandler: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  setModalOpen: PropTypes.func,
  setData: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default DragabbleTable;
