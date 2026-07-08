import { memo, useMemo } from "react";

interface PaginationProps {
  page: number;

  pageSize: number;

  total: number;

  onChange: (page: number) => void;
}

const Pagination = ({ page, pageSize, total, onChange }: PaginationProps) => {
  const totalPages = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const pages = useMemo(() => {
    return Array.from(
      {
        length: totalPages,
      },

      (_, index) => index + 1,
    );
  }, [totalPages]);

  if(total === 0) {
    return null;
  }

  return (
    <div
      className="
        flex
        justify-center
        mt-6
      "
    >
      <div
        className="
          join
        "
      >
        <button
          className="
            join-item
            btn
          "
          disabled={page === 1}
          onClick={() => {
            onChange(page - 1);
          }}
        >
          «
        </button>

        {pages.map((item) => (
          <button
            key={item}
            className={`
                  join-item
                  btn

                  ${page === item ? "btn-primary" : ""}
                `}
            onClick={() => {
              onChange(item);
            }}
          >
            {item}
          </button>
        ))}

        <button
          className="
            join-item
            btn
          "
          disabled={page === totalPages}
          onClick={() => {
            onChange(page + 1);
          }}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default memo(Pagination);
