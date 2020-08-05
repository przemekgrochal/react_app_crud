import React from 'react';
import {
  shape,
  string,
  number,
  arrayOf,
  oneOfType,
  node
} from 'prop-types';
import 'devextreme/data/odata/store';
import {
  DataGrid,
  FilterRow,
  GroupPanel,
  SearchPanel,
  Scrolling,
  Sorting
} from 'devextreme-react/data-grid';

const XDataGrid = ({
  dataSource,
  keyExpr,
  heightDlaGrid,
  options,
  children
}) => {
  // const customizeColumns = columns => {

  //   columns[3].visibleIndex = -1;
  // }

  return (
    <DataGrid
      dataSource={dataSource}
      keyExpr={keyExpr}
      height={heightDlaGrid && heightDlaGrid !== 0 ? heightDlaGrid : '100%'}
      {...options}
      allowColumnReordering
      showBorders
      focusedRowEnabled
      allowColumnResizing
      columnAutoWidth
      showColumnLines
      showRowLines
      // customizeColumns={customizeColumns}
    >
      <Sorting mode="multiple" />
      <SearchPanel visible />
      <Scrolling mode="virtual" />

      <FilterRow visible />
      <GroupPanel visible />
      {children}
    </DataGrid>
  );
};

XDataGrid.propTypes = {
  dataSource: shape({
    store: shape({
      key: string.isRequired,
      type: string.isRequired,
      url: string.isRequired,
      version: number
    }).isRequired,
    select: arrayOf(string)
  }).isRequired,
  keyExpr: string,
  heightDlaGrid: number,
  options: shape({}),
  children: oneOfType([
    arrayOf(node),
    node
  ]).isRequired
};

export default XDataGrid;
