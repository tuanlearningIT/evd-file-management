import { memo, useEffect, useRef, useState } from "react";

import type { CreateDocumentPayload } from "../../types/document";

interface ImportDialogProps {
  onClose: () => void;

  onImport: (rows: CreateDocumentPayload[]) => Promise<void> | void;
}

interface WorkerMessage {
  type: "progress" | "complete";

  progress?: number;

  data?: {
    validRows: CreateDocumentPayload[];

    invalidRows: CreateDocumentPayload[];
  };
}

const ImportDialog = ({ onClose, onImport }: ImportDialogProps) => {
  const workerRef = useRef<Worker | null>(null);

  const [file, setFile] = useState<File | null>(null);

  const [progress, setProgress] = useState(0);

  const [loading, setLoading] = useState(false);

  const [validRows, setValidRows] = useState<CreateDocumentPayload[]>([]);

  const [invalidRows, setInvalidRows] = useState<CreateDocumentPayload[]>([]);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleImport = async () => {
    if (!file) return;

    setLoading(true);

    setProgress(0);

    setValidRows([]);

    setInvalidRows([]);

    const worker = new Worker(
      new URL("./csvWorker.ts", import.meta.url),
      {
        type: "module",
      },
    );

    workerRef.current = worker;

    worker.postMessage({
      file,
    });

    worker.onmessage = async (event: MessageEvent<WorkerMessage>) => {
      const { type, progress, data } = event.data;

      if (type === "progress") {
        setProgress(progress ?? 0);
      }

      if (type === "complete" && data) {
        setProgress(100);

        setValidRows(data.validRows);

        setInvalidRows(data.invalidRows);

        await onImport(data.validRows);

        worker.terminate();

        setLoading(false);

        onClose();
      }
    };

    worker.onerror = () => {
      worker.terminate();

      setLoading(false);

      alert("Import failed.");
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[520px] rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-5 text-xl font-bold">Bulk Import Documents</h2>

        <input
          type="file"
          accept=".csv,.xlsx"
          className="file-input file-input-bordered w-full"
          onChange={(e) => {
            const selected = e.target.files?.[0];

            if (selected) {
              setFile(selected);
            }
          }}
        />

        {file && (
          <div className="mt-3 text-sm text-gray-500">
            Selected file:
            <span className="font-semibold"> {file.name}</span>
          </div>
        )}

        {loading && (
          <div className="mt-5 space-y-2">
            <progress
              className="progress progress-primary w-full"
              value={progress}
              max={100}
            />

            <p className="text-sm">Importing... {progress}%</p>
          </div>
        )}

        {validRows.length > 0 && (
          <div className="mt-4 rounded-lg bg-success/10 p-3 text-success">
            Valid documents: <strong>{validRows.length}</strong>
          </div>
        )}

        {invalidRows.length > 0 && (
          <div className="mt-3 rounded-lg bg-error/10 p-3 text-error">
            Invalid documents: <strong>{invalidRows.length}</strong>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button className="btn" disabled={loading} onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary"
            disabled={!file || loading}
            onClick={handleImport}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Importing...
              </>
            ) : (
              "Import"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ImportDialog);
