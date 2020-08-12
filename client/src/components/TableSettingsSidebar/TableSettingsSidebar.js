import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';

import PropertyItem from './PropertyItem';
import './styles.css';

const testConfig = {
  columns: [
    { id: 'id', title: 'Id', type: 'id', order: 0 },
    { id: 'userId', title: 'UserId', type: 'id', order: 1 },
    { id: 'productId', title: 'ProductId', type: 'id', order: 2 },
    { id: 'total', title: 'Total', type: 'number', order: 3 },
    { id: 'discount', title: 'Discount', type: 'number', order: 4 },
    { id: 'createdAt', title: 'CreatedAt', type: 'date', order: 5 },
    { id: 'quantity', title: 'Quantity', type: 'number', order: 6 },
  ],
  sort: {
    order: 'asc',
    orderBy: 'id',
  },
};

const TableSettingsSidebar = ({ config, updateConfig }) => {
  config = config || testConfig;

  const [tableConfig, setTableConfig] = useState(config);

  const updateOrder = (list) => {
    return list.map((item, i) => {
      item.order = i;
      return item;
    });
  };

  const updateColumnConfig = (columns) => {
    const newTableConfig = { ...tableConfig };
    newTableConfig.columns = updateOrder(columns);
    setTableConfig(newTableConfig);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(tableConfig.columns, result.source.index, result.destination.index);

    updateColumnConfig(items);
  };

  const deleteColumn = (id) => () => {
    const result = [...tableConfig.columns];
    const index = result.findIndex((item) => item.id === id);
    result.splice(index, 1);
    updateColumnConfig(result);
  };

  const saveConfig = () => {
    updateConfig(tableConfig);
  };

  const getListStyle = (isDraggingOver) => ({
    paddingBottom: isDraggingOver ? '50px' : '0px',
  });

  return (
    <div className="table-settings-sidebar-container">
      <h3>Visible columns</h3>
      <p>Click and drag to change their order</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="property-item-container"
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {tableConfig.columns.map((property, index) => (
                <PropertyItem
                  name={property.title}
                  id={property.id}
                  key={property.id}
                  index={index}
                  deleteColumn={deleteColumn}
                />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="table-settings-sidebar-footer">
        <Button onClick={saveConfig} className="view-visualization__setting-button" variant="contained">
          Done
        </Button>
      </div>
    </div>
  );
};

TableSettingsSidebar.propTypes = {
  config: PropTypes.object,
  updateConfig: PropTypes.func,
};

export default TableSettingsSidebar;