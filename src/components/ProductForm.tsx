import React, { useState } from 'react';

interface ProductFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ onSubmit, onCancel, initialData, mode = 'add' }: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    if (mode === 'edit' && initialData) {
      formData.append('productId', initialData.productId.toString());
    }
    
    const file = formData.get('file') as File;
    if (file && file.size > 1024 * 1024) {
      setError('Image size cannot exceed 1MB');
      return;
    }
    
    try {
      await onSubmit(formData);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${mode} product`);
    }
  };

  const inputClassName = "mt-1 block w-full h-10 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {initialData && (
        <input type="hidden" name="productId" value={initialData.productId} />
      )}
      <div>
        <label className={labelClassName}>Product Name</label>
        <input
          type="text"
          name="productName"
          required
          defaultValue={initialData?.productName}
          placeholder="Enter product name"
          className={inputClassName}
        />
      </div>

      <div>
        <label className={labelClassName}>Description</label>
        <textarea
          name="productDescription"
          required
          defaultValue={initialData?.productDescription}
          placeholder="Enter product description"
          rows={3}
          className={`${inputClassName} h-auto`}
        />
      </div>
      
      <div>
        <label className={labelClassName}>Points Required</label>
        <input
          type="number"
          name="pointsCost"
          required
          min="0"
          defaultValue={initialData?.pointsCost}
          placeholder="Enter points required"
          className={inputClassName}
        />
      </div>
      
      <div>
        <label className={labelClassName}>Stock Quantity</label>
        <input
          type="number"
          name="stock"
          required
          min="0"
          defaultValue={initialData?.stock}
          placeholder="Enter stock quantity"
          className={inputClassName}
        />
      </div>
      
      <div>
        <label className={labelClassName}>Product Image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file"
                  type="file"
                  accept="image/*"
                  required={!initialData}
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 1024 * 1024) {
                      setError('Image size cannot exceed 1MB');
                    } else {
                      setError(null);
                    }
                  }}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 1MB</p>
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
} 