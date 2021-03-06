import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { EnhancedTable } from '../../components';

import { updateColumns, getRows } from './helper';
import { formatDateForSummarize } from '../../helpers/formatDateForSummarize';

const TableVisualizationContainer = ({ config, updateConfig, data }) => {
  const { sort } = config;
  const columns = config.isSummarize ? config.summarizeColumns : config.columns;
  const dataWithFormatDateForSummarize = formatDateForSummarize(data, config);
  const [sortOrder, setSortOrder] = useState(sort.order);
  const [sortOrderBy, setSortOrderBy] = useState(sort.orderBy);

  const handleRequestSort = (_event, property) => {
    const isAsc = sortOrderBy === property && sortOrder === 'asc';
    const updatedSortOrder = isAsc ? 'desc' : 'asc';
    const updateSortOrderBy = property;
    setSortOrder(updatedSortOrder);
    setSortOrderBy(updateSortOrderBy);
    const updatedConfig = { ...config, sort: { order: updatedSortOrder, orderBy: updateSortOrderBy } };
    updateConfig(updatedConfig);
  };

  const updatedColumns = updateColumns(columns);
  const rows = getRows(
    config.isSummarize ? dataWithFormatDateForSummarize : data,
    updatedColumns,
    sortOrder,
    sortOrderBy
  );

  return (
    <EnhancedTable
      columns={updatedColumns}
      rows={rows}
      sortOrder={sortOrder}
      sortOrderBy={sortOrderBy}
      handleRequestSort={handleRequestSort}
    />
  );
};

TableVisualizationContainer.propTypes = {
  config: PropTypes.object,
  updateConfig: PropTypes.func,
  data: PropTypes.array,
};

export default TableVisualizationContainer;
