import api from "./axios";

import type {
  Document,
  DocumentQuery,
  CreateDocumentPayload,
  UpdateDocumentPayload,
} from "../types/document";

export interface DocumentListResponse {
  data: Document[];

  total: number;

  page: number;

  limit: number;
}

export const getDocuments = async (
  params: DocumentQuery,
): Promise<DocumentListResponse> => {
  const response = await api.get<Document[]>("/documents", {
    params: {
      _page: params.page,

      _limit: params.limit,

      q: params.keyword || undefined,

      status: params.status || undefined,

      category: params.category || undefined,
    },
  });

  const total = Number(
    response.headers["x-total-count"] ?? response.data.length,
  );

  return {
    data: response.data,

    total,

    page: params.page,

    limit: params.limit,
  };
};

export const createDocument = async (
  payload: CreateDocumentPayload,
): Promise<Document> => {
  const response = await api.post<Document>("/documents", payload);

  return response.data;
};

export const updateDocument = async (
  id: number,

  payload: UpdateDocumentPayload,
): Promise<Document> => {
  const response = await api.put<Document>(`/documents/${id}`, payload);

  return response.data;
};

export const deleteDocument = async (id: number): Promise<void> => {
  await api.delete(`/documents/${id}`);
};
