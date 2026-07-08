import { memo, useEffect, useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";

interface DocumentSearchProps {
  value: string;

  onChange: (value: string) => void;
}

const DocumentSearch = ({ value, onChange }: DocumentSearchProps) => {
  const [keyword, setKeyword] = useState(value);

  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    onChange(debouncedKeyword);
  }, [debouncedKeyword, onChange]);

  return (
    <div className="w-full max-w-sm">
      <input
        type="text"
        className="
          input
          input-bordered
          w-full
        "
        placeholder="
          Search by code or title...
        "
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
    </div>
  );
};

export default memo(DocumentSearch);
