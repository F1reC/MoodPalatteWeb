import React, { useState } from 'react';
import { Edit, Trash2, Plus, RefreshCw } from 'lucide-react';

interface DataTableProps {
  data: any[];
  columns: {
    key: string;
    label: string;
    render?: (value: any) => React.ReactNode;
  }[];
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  onRetry?: () => void;
  loading?: boolean;
  error?: string | null;
}

export default function DataTable({
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  onRetry,
  loading,
  error,
}: DataTableProps) {
  const [confirmDelete, setConfirmDelete] = useState<{ id: number | null, x: number, y: number }>({
    id: null,
    x: 0,
    y: 0
  });

  const handleDeleteClick = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setConfirmDelete({
      id: item.productId,
      x: rect.x,
      y: rect.y + window.scrollY
    });
  };

  const handleConfirmDelete = (item: any) => {
    onDelete(item);
    setConfirmDelete({ id: null, x: 0, y: 0 });
  };

  const renderActions = (item: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-right relative">
      <button
        onClick={() => onEdit(item)}
        className="text-blue-600 hover:text-blue-800 mr-3"
        title="Edit"
      >
        <Edit className="h-4 w-4" />
      </button>
      <button
        onClick={(e) => handleDeleteClick(e, item)}
        className="text-red-600 hover:text-red-800"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      
      {confirmDelete.id === item.productId && (
        <div 
          className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 right-0 mt-2"
          style={{ top: '100%' }}
        >
          <p className="text-sm text-gray-600 mb-3">Are you sure you want to delete this item?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setConfirmDelete({ id: null, x: 0, y: 0 })}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => handleConfirmDelete(item)}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </td>
  );

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add New</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.productId || index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {column.render
                      ? column.render(item[column.key])
                      : item[column.key]}
                  </td>
                ))}
                {renderActions(item)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}