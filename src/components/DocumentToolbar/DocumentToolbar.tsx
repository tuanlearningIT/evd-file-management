import { memo } from "react";

interface DocumentToolbarProps {
  role: "ADMIN" | "STAFF";

  onRoleChange: (role: "ADMIN" | "STAFF") => void;

  onCreate: () => void;

  onImport: () => void;
}

const DocumentToolbar = ({
  role,
  onRoleChange,
  onCreate,
  onImport,
}: DocumentToolbarProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">
          File Management
        </h1>

        <p className="text-sm text-gray-500">
          Manage documents in EVD module
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Role Switch */}
        <div className="join">
          <button
            className={`btn btn-sm join-item ${
              role === "ADMIN"
                ? "btn-primary"
                : "btn-outline"
            }`}
            onClick={() => onRoleChange("ADMIN")}
          >
            ADMIN
          </button>

          <button
            className={`btn btn-sm join-item ${
              role === "STAFF"
                ? "btn-primary"
                : "btn-outline"
            }`}
            onClick={() => onRoleChange("STAFF")}
          >
            STAFF
          </button>
        </div>

        <button
          className="btn btn-outline"
          onClick={onImport}
        >
          Import
        </button>

        <button
          className="btn btn-primary"
          onClick={onCreate}
        >
          New Document
        </button>
      </div>
    </div>
  );
};

export default memo(DocumentToolbar);