import { memo } from "react";
import { useTranslation } from "react-i18next";

interface ConfirmDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog = ({ onConfirm, onCancel }: ConfirmDialogProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-xl
          shadow-lg
          w-[400px]
          p-6
        "
      >
        <h2
          className="
            text-xl
            font-bold
            mb-3
          "
        >
          {t("document.delete")}
        </h2>

        <p
          className="
            text-gray-600
            mb-6
          "
        >
          {t("document.deleteContent")}
        </p>

        <div
          className="
            flex
            justify-end
            gap-3
          "
        >
          <button
            className="
              btn
            "
            onClick={onCancel}
          >
            {t("document.cancel")}
          </button>

          <button
            className="
              btn
              btn-error
            "
            onClick={onConfirm}
          >
            {t("document.delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ConfirmDialog);
