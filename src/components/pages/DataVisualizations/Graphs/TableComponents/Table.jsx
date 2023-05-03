import React from 'react';
import TableRow from './TableRow';
import { colors } from '../../../../../styles/data_vis_colors';

const { primary_accent_color } = colors;

function Table(props) {
  const { rows, columns, tableWidth, rowHeight } = props;

  return (
    <div
      className="g-table"
      style={{
        display: 'flex',
        width: tableWidth,
        flexDirection: 'column',
        margin: '5% auto',
        overflow: 'hidden',
      }}
    >
      <div
        className="column-id-container"
        style={{
          display: 'flex',
          width: tableWidth,
          height: rowHeight,
        }}
      >
        {columns.map((column, idx) => {
          return (
            <div
              className="column-id"
              style={{
                backgroundColor: primary_accent_color,
                border: '1px solid black',
                color: 'white',
                width: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={idx}
            >
              {column}
            </div>
          );
        })}
      </div>
      <div className="rows-container">
        {rows.map((row, idx) => {
          return (
            <TableRow
              key={idx + 888996}
              row={row}
              rowId={idx + 996467}
              tableWidth={tableWidth}
              rowHeight={rowHeight}
              columns={columns}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Table;
