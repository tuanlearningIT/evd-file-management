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
  IMPORT_DOCUMENT_SUCCESS,
  IMPORT_DOCUMENT_REQUEST,
  IMPORT_DOCUMENT_FAILURE,
} from "./types";

import { type Document, type UserRole } from "../types/document";
import type { DocumentListResponse } from "../api/documentApi";

interface DocumentState {
  documents: Document[];

  total: number;

  loading: boolean;

  role: UserRole;

  error: string | null;
}

type DocumentAction =
  | {
      type: typeof GET_DOCUMENT_REQUEST;
    }
  | {
      type: typeof GET_DOCUMENT_SUCCESS;
      payload: DocumentListResponse;
    }
  | {
      type: typeof GET_DOCUMENT_FAILURE;
      payload: string;
    }
  | {
      type: typeof CREATE_DOCUMENT_REQUEST;
    }
  | {
      type: typeof CREATE_DOCUMENT_SUCCESS;
    }
  | {
      type: typeof CREATE_DOCUMENT_FAILURE;
      payload: string;
    }
  | {
      type: typeof UPDATE_DOCUMENT_REQUEST;
    }
  | {
      type: typeof UPDATE_DOCUMENT_SUCCESS;
    }
  | {
      type: typeof UPDATE_DOCUMENT_FAILURE;
      payload: string;
    }
  | {
      type: typeof DELETE_DOCUMENT_REQUEST;
    }
  | {
      type: typeof DELETE_DOCUMENT_SUCCESS;
    }
  | {
      type: typeof SET_ROLE;
      payload: UserRole;
    }
  | {
      type: typeof DELETE_DOCUMENT_FAILURE;
      payload: string;
    }
  | {
      type: typeof IMPORT_DOCUMENT_REQUEST;
    }
  | {
      type: typeof IMPORT_DOCUMENT_SUCCESS;
    }
  | {
      type: typeof IMPORT_DOCUMENT_FAILURE;
      payload: string;
    };

const initialState: DocumentState = {
  documents: [],

  total: 0,

  loading: false,

  role: "ADMIN",

  error: null,
};

export default (
  state = initialState,
  action: DocumentAction,
): DocumentState => {
  switch (action.type) {
    case GET_DOCUMENT_REQUEST:
      return {
        ...state,

        loading: true,

        error: null,
      };

    case GET_DOCUMENT_SUCCESS:
      return {
        ...state,

        loading: false,

        documents: action.payload.data,

        total: action.payload.total,
      };

    case GET_DOCUMENT_FAILURE:
      return {
        ...state,

        loading: false,

        error: action.payload,
      };

    case CREATE_DOCUMENT_REQUEST:
      return {
        ...state,

        loading: true,
      };

    case CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,

        loading: false,
      };

    case CREATE_DOCUMENT_FAILURE:
      return {
        ...state,

        loading: false,

        error: action.payload,
      };

    case UPDATE_DOCUMENT_REQUEST:
      return {
        ...state,

        loading: true,
      };

    case UPDATE_DOCUMENT_SUCCESS:
      return {
        ...state,

        loading: false,
      };

    case UPDATE_DOCUMENT_FAILURE:
      return {
        ...state,

        loading: false,

        error: action.payload,
      };

    case DELETE_DOCUMENT_REQUEST:
      return {
        ...state,

        loading: true,
      };

    case DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,

        loading: false,
      };

    case DELETE_DOCUMENT_FAILURE:
      return {
        ...state,

        loading: false,

        error: action.payload,
      };

    case SET_ROLE:
      return {
        ...state,

        role: action.payload,
      };

    case IMPORT_DOCUMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case IMPORT_DOCUMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case IMPORT_DOCUMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
