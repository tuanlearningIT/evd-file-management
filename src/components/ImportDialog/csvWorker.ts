import type {
  CreateDocumentPayload,
  DocumentCategory,
  DocumentStatus,
} from "../../types/document";

interface InvalidRow {
  row: number;
  data: Partial<CreateDocumentPayload>;
  error: string;
}

interface WorkerInput {
  file: File;
}

interface WorkerProgressMessage {
  type: "progress";
  progress: number;
}

interface WorkerCompleteMessage {
  type: "complete";
  data: {
    validRows: CreateDocumentPayload[];
    invalidRows: InvalidRow[];
  };
}

const VALID_CATEGORY: DocumentCategory[] = ["IT", "HR", "Finance"];

const VALID_STATUS: DocumentStatus[] = ["ACTIVE", "INACTIVE"];

self.onmessage = (event: MessageEvent<WorkerInput>) => {
  const { file } = event.data;

  const reader = new FileReader();

  reader.onload = () => {
    const text = reader.result as string;

    const rows = text.split(/\r?\n/).filter((row) => row.trim().length > 0);

    const total = rows.length;

    const validRows: CreateDocumentPayload[] = [];

    const invalidRows: InvalidRow[] = [];

    const chunkSize = 500;

    for (let i = 1; i < total; i++) {
      const columns = rows[i].split(",");

      const document: CreateDocumentPayload = {
        code: columns[0]?.trim() ?? "",

        title: columns[1]?.trim() ?? "",

        category: (columns[2]?.trim() as DocumentCategory) ?? "IT",

        status: (columns[3]?.trim() as DocumentStatus) ?? "ACTIVE",
      };

      let error = "";

      if (!document.code) {
        error = "Code is required";
      } else if (!document.title) {
        error = "Title is required";
      } else if (!VALID_CATEGORY.includes(document.category)) {
        error = "Invalid category";
      } else if (!VALID_STATUS.includes(document.status)) {
        error = "Invalid status";
      }

      if (error) {
        invalidRows.push({
          row: i + 1,
          data: document,
          error,
        });
      } else {
        validRows.push(document);
      }

      if (i % chunkSize === 0 || i === total - 1) {
        const message: WorkerProgressMessage = {
          type: "progress",
          progress: Math.round((i / (total - 1)) * 100),
        };

        self.postMessage(message);
      }
    }

    const completeMessage: WorkerCompleteMessage = {
      type: "complete",
      data: {
        validRows,
        invalidRows,
      },
    };

    self.postMessage(completeMessage);
  };

  reader.onerror = () => {
    self.postMessage({
      type: "complete",
      data: {
        validRows: [],
        invalidRows: [
          {
            row: 0,
            data: {},
            error: "Cannot read file",
          },
        ],
      },
    });
  };

  reader.readAsText(file);
};

export {};
