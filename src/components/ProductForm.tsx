import React, { useState } from 'react';

interface ProductFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const file = formData.get('file') as File;
    if (file && file.size > 1024 * 1024) {
      setError('图片大小不能超过1MB');
      return;
    }
    
    try {
      await onSubmit(formData);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : '添加商品失败');
    }
  };

  const inputClassName = "mt-1 block w-full h-10 px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";
  const labelClassName = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClassName}>商品名称</label>
        <input
          type="text"
          name="productName"
          required
          placeholder="请输入商品名称"
          className={inputClassName}
        />
      </div>

      <div>
        <label className={labelClassName}>商品描述</label>
        <textarea
          name="productDescription"
          required
          placeholder="请输入商品描述"
          rows={3}
          className={`${inputClassName} h-auto`}
        />
      </div>
      
      <div>
        <label className={labelClassName}>所需积分</label>
        <input
          type="number"
          name="pointsCost"
          required
          min="0"
          placeholder="请输入所需积分"
          className={inputClassName}
        />
      </div>
      
      <div>
        <label className={labelClassName}>库存数量</label>
        <input
          type="number"
          name="stock"
          required
          min="0"
          placeholder="请输入库存数量"
          className={inputClassName}
        />
      </div>
      
      <div>
        <label className={labelClassName}>商品图片</label>
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          className="mt-1 block w-full"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file && file.size > 1024 * 1024) {
              setError('图片大小不能超过1MB');
            } else {
              setError(null);
            }
          }}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          保存
        </button>
      </div>
    </form>
  );
} 