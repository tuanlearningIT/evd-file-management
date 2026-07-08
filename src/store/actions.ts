import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../api/documentApi";

import type {
  DocumentQuery,
  CreateDocumentPayload,
  UpdateDocumentPayload,
  UserRole,
} from "../types/document";

import {
  GET_DOCUMENT_REQUEST,
  GET_DOCUMENT_SUCCESS,
  GET_DOCUMENT_FAILURE,
  CREATE_DOCUMENT_REQUEST,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_FAILURE,
  UPDATE_DOCUMENT_REQUEST,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FAILURE,
  DELETE_DOCUMENT_REQUEST,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FAILURE,
  SET_ROLE,
  IMPORT_DOCUMENT_REQUEST,
  IMPORT_DOCUMENT_SUCCESS,
  IMPORT_DOCUMENT_FAILURE,
} from "./types";
import type { AppDispatch } from ".";
import { getErrorMessage } from "../helpers";
import api from "../api/axios";

export const fetchDocuments =
  (params: DocumentQuery) => async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_DOCUMENT_REQUEST,
    });

    try {
      const response = await getDocuments(params);

      dispatch({
        type: GET_DOCUMENT_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: GET_DOCUMENT_FAILURE,
        payload: getErrorMessage(error, "Failed to fetch documents"),
      });
    }
  };

export const createNewDocument =
  (payload: CreateDocumentPayload, params: DocumentQuery) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: CREATE_DOCUMENT_REQUEST,
    });

    try {
      await createDocument({
        ...payload, 
        createdDate: new Date().toISOString(),
      });

      dispatch({
        type: CREATE_DOCUMENT_SUCCESS,
      });

      dispatch(fetchDocuments(params));
    } catch (error) {
      dispatch({
        type: CREATE_DOCUMENT_FAILURE,
        payload: getErrorMessage(error, "Create failed"),
      });
    }
  };

export const editDocument =
  (id: number, payload: UpdateDocumentPayload, params: DocumentQuery) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: UPDATE_DOCUMENT_REQUEST,
    });

    try {
      await updateDocument(id, payload);

      dispatch({
        type: UPDATE_DOCUMENT_SUCCESS,
      });

      dispatch(fetchDocuments(params));
    } catch (error) {
      dispatch({
        type: UPDATE_DOCUMENT_FAILURE,
        payload: getErrorMessage(error, "Update failed"),
      });
    }
  };

export const removeDocument =
  (id: number, params: DocumentQuery) => async (dispatch: AppDispatch) => {
    dispatch({
      type: DELETE_DOCUMENT_REQUEST,
    });

    try {
      await deleteDocument(id);

      dispatch({
        type: DELETE_DOCUMENT_SUCCESS,
      });

      dispatch(fetchDocuments(params));
    } catch (error) {
      dispatch({
        type: DELETE_DOCUMENT_FAILURE,
        payload: getErrorMessage(error, "Delete failed"),
      });
    }
  };

export const setRole =
  (role: UserRole) => async (dispatch: AppDispatch) => {
    dispatch({
      type: SET_ROLE,
      payload: role,
    });
  };

 
export const importDocuments = async (
  documents: CreateDocumentPayload[],
): Promise<void> => {
  await Promise.all(
    documents.map((document) =>
      api.post("/documents", {
        ...document, 
        createdDate: new Date().toISOString(),
      }),
    ),
  );
};


export const importNewDocuments =
  (
    rows: CreateDocumentPayload[],
    params: DocumentQuery,
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: IMPORT_DOCUMENT_REQUEST,
    });

    try {
      await importDocuments(rows);

      dispatch({
        type: IMPORT_DOCUMENT_SUCCESS,
      });

      dispatch(fetchDocuments(params));
    } catch (error) {
      dispatch({
        type: IMPORT_DOCUMENT_FAILURE,
        payload:
          error instanceof Error
            ? error.message
            : "Import failed",
      });
    }
  };