export const createNewVisualization = (currentVisualization, name, description, tableId) => {
  const { type, config, datasetSettings } = currentVisualization;

  const createdVisualization = {
    name,
    description,
    tableId,
    type,
    datasetSettings: datasetSettings.map((s) => JSON.stringify(s)),
    config: JSON.stringify(config),
  };
  return createdVisualization;
};

export const createUpdatedVisualization = (currentVisualization, newConfig) => {
  const { type, name, description, config, datasetSettings, tableId } = currentVisualization;
  const updatedVisualization = {
    type,
    name,
    description,
    tableId,
    datasetSettings: datasetSettings.map((s) => JSON.stringify(s)),
    config: JSON.stringify(newConfig || config),
  };
  return updatedVisualization;
};
