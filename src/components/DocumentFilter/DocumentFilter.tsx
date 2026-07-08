import { memo } from "react";
import type { DocumentCategory, DocumentStatus } from "../../types/document";

interface DocumentFilterProps {
  status: DocumentStatus;
  category: DocumentCategory;
  onStatusChange: (value: DocumentStatus) => void;
  onCategoryChange: (value: DocumentCategory) => void;
}

const DocumentFilter = ({
  status,
  category,
  onStatusChange,
  onCategoryChange,
}: DocumentFilterProps) => {
  return (
    <div className="flex gap-3">
      <select
        className="
          select
          select-bordered
        "
        value={status}
        onChange={(e) => onStatusChange(e.target.value as DocumentStatus)}
      >
        <option value="">All Status</option>

        <option value="ACTIVE">Active</option>

        <option value="INACTIVE">Inactive</option>
      </select>

      <select
        className="
          select
          select-bordered
        "
        value={category}
        onChange={(e) => onCategoryChange(e.target.value as DocumentCategory)}
      >
        <option value="">All Category</option>

        <option value="IT">IT</option>

        <option value="HR">HR</option>

        <option value="Finance">Finance</option>

        <option value="Legal">Legal</option>
      </select>
    </div>
  );
};

export default memo(DocumentFilter);
