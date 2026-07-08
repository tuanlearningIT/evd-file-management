export type DocumentStatus = "ACTIVE" | "INACTIVE" | "ALL";

export type DocumentCategory = "IT" | "HR" | "Finance" | "Legal" | "ALL";

export type UserRole = "ADMIN" | "STAFF";

export interface Document {
  id: number;

  code: string;

  title: string;

  category: DocumentCategory;

  status: DocumentStatus;

  createdBy: string;

  createdDate: string;
}

export interface DocumentQuery {
  page: number;

  limit: number;

  keyword?: string;

  status?: string;

  category?: string;
}

export interface DocumentResponse {
  data: Document[];

  total: number;

  page: number;

  limit: number;
}

export interface CreateDocumentPayload {
  code: string;

  title: string;

  category: DocumentCategory;

  status: DocumentStatus;

  createdBy?: UserRole;

  createdDate?: string;
}

export interface UpdateDocumentPayload {
  code?: string;

  title?: string;

  category?: DocumentCategory;

  status?: DocumentStatus;
}
