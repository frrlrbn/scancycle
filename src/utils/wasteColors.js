// Utility functions for consistent waste type colors
export const getWasteTypeColor = (wasteType) => {
  switch (wasteType) {
    case 'organic':
    case 'green':
      return '#10B981'; // Green for Organic
    case 'inorganic':
    case 'yellow':
      return '#F59E0B'; // Yellow for Inorganic
    case 'hazardous':
    case 'red':
      return '#EF4444'; // Red for Hazardous/B3
    default:
      return '#6B7280'; // Gray for unknown
  }
};

export const getWasteTypeBorderColor = (wasteType) => {
  switch (wasteType) {
    case 'organic':
    case 'green':
      return '#065F46'; // Dark green border
    case 'inorganic':
    case 'yellow':
      return '#92400E'; // Dark yellow border
    case 'hazardous':
    case 'red':
      return '#991B1B'; // Dark red border
    default:
      return '#374151'; // Dark gray border
  }
};

export const getWasteTypeLabel = (wasteType) => {
  switch (wasteType) {
    case 'organic':
    case 'green':
      return 'Organik';
    case 'inorganic':
    case 'yellow':
      return 'Anorganik';
    case 'hazardous':
    case 'red':
      return 'B3';
    default:
      return wasteType;
  }
};

export const getWasteTypeBadgeColors = (wasteType) => {
  switch (wasteType) {
    case 'organic':
    case 'green':
      return {
        backgroundColor: '#ECFDF5', // Light green background
        color: '#065F46', // Dark green text
        borderColor: '#A7F3D0' // Light green border
      };
    case 'inorganic':
    case 'yellow':
      return {
        backgroundColor: '#FFFBEB', // Light yellow background
        color: '#92400E', // Dark yellow text
        borderColor: '#FDE68A' // Light yellow border
      };
    case 'hazardous':
    case 'red':
      return {
        backgroundColor: '#FEF2F2', // Light red background
        color: '#991B1B', // Dark red text
        borderColor: '#FECACA' // Light red border
      };
    default:
      return {
        backgroundColor: '#F9FAFB', // Light gray background
        color: '#374151', // Dark gray text
        borderColor: '#D1D5DB' // Light gray border
      };
  }
};