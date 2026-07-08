import { memo, useState } from "react";

import EditableCell from "../EditableCell";

import type {
  Document,
  UpdateDocumentPayload,
  UserRole,
} from "../../types/document";

interface DocumentTableProps {
  documents: Document[];

  loading?: boolean;

  role?: UserRole;

  onUpdate: (id: number, data: UpdateDocumentPayload) => void;

  onDelete: (id: number) => void;
}

const DocumentTable = ({
  documents,
  loading = false,
  role = "ADMIN",
  onUpdate,
  onDelete,
}: DocumentTableProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);

  const [editData, setEditData] = useState<Partial<Document>>({});

  const handleEdit = (document: Document) => {
    setEditingId(document.id);

    setEditData({
      code: document.code,
      title: document.title,
      category: document.category,
      createdBy: role,
      status: document.status,
    });
  };

  const handleChange = (field: keyof Document, value: string) => {
    setEditData((prev) => ({
      ...prev,

      [field]: value,
    }));
  };

  const handleSave = (id: number) => {
    onUpdate(id, editData);

    setEditingId(null);

    setEditData({});
  };

  const handleCancel = () => {
    setEditingId(null);

    setEditData({});
  };

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!documents.length) {
    return <div className="text-center p-10">No documents found</div>;
  }

  return (
    <div
      className="
        overflow-x-auto
      "
    >
      <table
        className="
          table
          table-zebra
        "
      >
        <thead>
          <tr>
            <th>Code</th>

            <th>Title</th>

            <th>Category</th>

            <th>Status</th>

            <th>Created By</th>

            <th>Created Date</th>

            {role === "ADMIN" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>
                {editingId === document.id ? (
                  <EditableCell
                    value={editData.code ?? ""}
                    onChange={(value) => handleChange("code", value)}
                  />
                ) : (
                  document.code
                )}
              </td>

              <td>
                {editingId === document.id ? (
                  <EditableCell
                    value={editData.title ?? ""}
                    onChange={(value) => handleChange("title", value)}
                  />
                ) : (
                  document.title
                )}
              </td>

              <td>
                {editingId === document.id ? (
                  <EditableCell
                    type="category"
                    value={editData.category ?? ""}
                    onChange={(value) => handleChange("category", value)}
                  />
                ) : (
                  document.category
                )}
              </td>

              <td>
                {editingId === document.id ? (
                  <EditableCell
                    type="status"
                    value={editData.status ?? ""}
                    onChange={(value) => handleChange("status", value)}
                  />
                ) : (
                  <span
                    className={
                      document.status === "ACTIVE"
                        ? "badge badge-success"
                        : "badge badge-error"
                    }
                  >
                    {document.status}
                  </span>
                )}
              </td>

              <td>{document.createdBy}</td>

              <td>{document.createdDate}</td>

              {role === "ADMIN" && (
                <td>
                  {editingId === document.id ? (
                    <div className="flex gap-2">
                      <button
                        className="
                      btn
                      btn-sm
                      btn-success
                    "
                        onClick={() => handleSave(document.id)}
                      >
                        Save
                      </button>

                      <button
                        className="
                      btn
                      btn-sm
                    "
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        className="
                    btn
                    btn-sm
                  "
                        onClick={() => handleEdit(document)}
                      >
                        Edit
                      </button>

                      {role === "ADMIN" && (
                        <button
                          className="
                      btn
                      btn-sm
                      btn-error
                    "
                          onClick={() => onDelete(document.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(DocumentTable);
