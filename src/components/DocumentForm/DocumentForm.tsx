import { memo, useState } from "react";

import type {
  Document,
  CreateDocumentPayload,
  DocumentStatus,
  DocumentCategory,
  UserRole,
} from "../../types/document";

interface DocumentFormProps {
  document?: Document | null;

  role?: UserRole;

  onSubmit: (data: CreateDocumentPayload) => void;

  onClose: () => void;
}

interface FormState {
  code: string;

  title: string;

  category: DocumentCategory;

  createdBy: UserRole;

  status: DocumentStatus;
}

const initialState: FormState = {
  code: "",

  title: "",

  category: "ALL",  

  createdBy: "ADMIN",

  status: "ALL",
};

const DocumentForm = ({ document, onSubmit, onClose, role="ADMIN" }: DocumentFormProps) => {
  const [form, setForm] = useState<FormState>(
    document
      ? {
          code: document.code,

          title: document.title,

          category: document.category,

          status: document.status,

          createdBy: role,
        }
      : initialState,
  );

  const [errors, setErrors] = useState<Partial<FormState>>({});

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({
      ...prev,

      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,

      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors: Partial<FormState> = {};
 
    if (!form.code.trim()) {
      newErrors.code = "Code is required";
    }

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (form.title.length > 100) {
      newErrors.title = "Maximum 100 characters";
    }

    if (!form.category || form.category === "ALL") {
      newErrors.category = "Category is required" as DocumentCategory;
    }

    if (!form.status || form.status === "ALL") {
      newErrors.status = "Status is required" as DocumentStatus;
    }

    console.log("Validation Errors:", newErrors); // Debugging line

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      code: form.code,

      title: form.title,

      category: form.category,

      status: form.status,

      createdBy: role || "ADMIN",
    });
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/30
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-lg
          p-6
          w-[500px]
        "
      >
        <h2
          className="
            text-xl
            font-bold
            mb-5
          "
        >
          {document ? "Edit Document" : "Create Document"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Document Code <span className="text-error">*</span>
              </span>
            </label>

            <input
              className={`input input-bordered w-full ${
                errors.code ? "input-error" : ""
              }`}
              placeholder="Enter document code"
              value={form.code}
              disabled={!!document}
              onChange={(e) => handleChange("code", e.target.value)}
            />

            {errors.code && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.code}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Document Title <span className="text-error">*</span>
              </span>
            </label>

            <input
              className={`input input-bordered w-full ${
                errors.title ? "input-error" : ""
              }`}
              placeholder="Enter document title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />

            {errors.title && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.title}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Category <span className="text-error">*</span>
              </span>
            </label>

            <select
              className={`select select-bordered w-full ${
                errors.category ? "select-error" : ""
              }`}
              value={form.category}
              onChange={(e) =>
                handleChange("category", e.target.value as DocumentCategory)
              }
            >
              <option value="">Select category</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
            </select>

            {errors.category && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.category}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">
                Status <span className="text-error">*</span>
              </span>
            </label>

            <select
              className={`select select-bordered w-full ${
                errors.status ? "select-error" : ""
              }`}
              value={form.status}
              onChange={(e) =>
                handleChange("status", e.target.value as DocumentStatus)
              }
            >
              <option value="">Select status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>

            {errors.status && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.status}
                </span>
              </label>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              {document ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(DocumentForm);
