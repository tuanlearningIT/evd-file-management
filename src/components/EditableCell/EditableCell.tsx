import { memo, useState } from "react";

interface EditableCellProps {
  value: string;

  onChange: (value: string) => void;

  type?: "text" | "code" | "category" | "status";

  required?: boolean;

  maxLength?: number;
}

const EditableCell = ({
  value,
  onChange,
  type = "text",
  required = true,
  maxLength = 255,
}: EditableCellProps) => {
  const [localValue, setLocalValue] = useState(value);

  const [error, setError] = useState("");

  const validate = (value: string) => {
    if (required && !value.trim()) {
      return "Required";
    }

    if (value.length > maxLength) {
      return `Maximum ${maxLength} characters`;
    }

    if (type === "code") {
      const regex = /^[A-Z0-9_-]+$/;

      if (!regex.test(value)) {
        return "Invalid code format";
      }
    }

    return "";
  };

  const handleValueChange = (newValue: string) => {
    setLocalValue(newValue);

    const message = validate(newValue);

    setError(message);

    if (!message) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {(type === "text" || type === "code") && (
        <input
          className={`
            input
            input-bordered
            input-sm
            w-full
            ${error ? "input-error" : ""}
          `}
          value={localValue}
          onChange={(e) => handleValueChange(e.target.value)}
        />
      )}

      {type === "status" && (
        <select
          className={`
            select
            select-bordered
            select-sm
            w-full
            ${error ? "select-error" : ""}
          `}
          value={localValue}
          onChange={(e) => handleValueChange(e.target.value)}
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      )}

      {type === "category" && (
        <select
          className={`
            select
            select-bordered
            select-sm
            w-full
            ${error ? "select-error" : ""}
          `}
          value={localValue}
          onChange={(e) => handleValueChange(e.target.value)}
        >
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
      )}

      {error && <span className="text-error text-xs">{error}</span>}
    </div>
  );
};

export default memo(EditableCell);
