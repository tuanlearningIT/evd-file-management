import { type RootState } from ".";

export const selectDocumentState = (state: RootState) => state.documents;

export const selectDocuments = (state: RootState) => state.documents.documents;

export const selectTotal = (state: RootState) => state.documents.total;

export const selectLoading = (state: RootState) => state.documents.loading;

export const selectError = (state: RootState) => state.documents.error;

export const selectRole = (state: RootState) => state.documents.role;
