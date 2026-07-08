import { memo, useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import DocumentToolbar from "../DocumentToolbar";
import DocumentSearch from "../DocumentSearch";
import DocumentFilter from "../DocumentFilter";
import DocumentTable from "../DocumentTable";
import Pagination from "../Pagination";
import DocumentForm from "../DocumentForm";
import ConfirmDialog from "../ConfirmDialog";

import type {
  Document,
  CreateDocumentPayload,
  UpdateDocumentPayload,
  DocumentStatus,
  DocumentCategory,
  UserRole,
} from "../../types/document";

import {
  type AppDispatch,
  selectDocuments,
  selectLoading,
  selectTotal,
  selectError,
  fetchDocuments,
  createNewDocument,
  editDocument,
  removeDocument,
  selectRole,
  setRole,
  importNewDocuments,
} from "../../store";
import ImportDialog from "../ImportDialog";

const LIMIT = 10 as const;

const DocumentPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const documents = useSelector(selectDocuments);

  const loading = useSelector(selectLoading);

  const total = useSelector(selectTotal);

  const error = useSelector(selectError);

  const role = useSelector(selectRole);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<DocumentStatus>("ALL");

  const [category, setCategory] = useState<DocumentCategory>("ALL");

  const [openForm, setOpenForm] = useState(false);

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  );

  const [openDelete, setOpenDelete] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [openImport, setOpenImport] = useState(false);

  useEffect(() => {
    dispatch(
      fetchDocuments({
        page,

        limit: LIMIT,

        keyword: search,

        status: status === "ALL" ? undefined : status,

        category: category === "ALL" ? undefined : category,
      }),
    );
  }, [dispatch, page, search, status, category]);

  const handleCreate = () => {
    setSelectedDocument(null);

    setOpenForm(true);
  };

  const handleSubmit = (data: CreateDocumentPayload) => {
    if (selectedDocument) {
      dispatch(
        editDocument(selectedDocument.id, data, {
          page,
          limit: LIMIT,
          keyword: search,
          status,
          category,
        }),
      );
    } else {
      dispatch(
        createNewDocument(data, {
          page,
          limit: LIMIT,
          keyword: search,
          status,
          category,
        }),
      );
    }

    setOpenForm(false);
  };

  const handleSearch = useCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, []);

  const handleSetRole = useCallback((value: UserRole) => {
    dispatch(setRole(value));
  }, [dispatch]);

  const handleUpdate = (id: number, data: UpdateDocumentPayload) => {
    dispatch(
      editDocument(id, data, {
        page,
        limit: LIMIT,
        keyword: search,
        status,
        category,
      }),
    );
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);

    setOpenDelete(true);
  };

  const confirmDelete = () => {
    if (deleteId === null) return;

    dispatch(
      removeDocument(deleteId, {
        page,
        limit: LIMIT,
        keyword: search,
        status,
        category,
      }),
    );

    setDeleteId(null);

    setOpenDelete(false);
  };

  return (
    <div
      className="
        space-y-6
      "
    >
      <DocumentToolbar
        onCreate={handleCreate}
        onImport={() => setOpenImport(true)}
        onRoleChange={handleSetRole}
        role={role}
      />

      <div
        className="
          flex
          justify-between
          gap-4
        "
      >
        <DocumentSearch value={search} onChange={handleSearch} />

        <DocumentFilter
          status={status}
          category={category}
          onStatusChange={(value) => {
            setPage(1);

            setStatus(value);
          }}
          onCategoryChange={(value) => {
            setPage(1);

            setCategory(value);
          }}
        />
      </div>

      {error && (
        <div
          className="
            alert
            alert-error
          "
        >
          {error}
        </div>
      )}

      <DocumentTable
        role={role}
        documents={documents}
        loading={loading}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <Pagination
        page={page}
        pageSize={LIMIT}
        total={total}
        onChange={setPage}
      />

      {openForm && (
        <DocumentForm
          document={selectedDocument}
          onSubmit={handleSubmit}
          onClose={() => {
            setOpenForm(false);
          }}
          role={role}
        />
      )}

      {openDelete && (
        <ConfirmDialog
          onConfirm={confirmDelete}
          onCancel={() => {
            setOpenDelete(false);
          }}
        />
      )}

      {openImport && (
        <ImportDialog
          onClose={() => setOpenImport(false)}
            onImport={(rows) =>
                dispatch(
                    importNewDocuments(rows,{
                        page,
                        limit: LIMIT,
                        keyword: search,
                        status,
                        category,
                    })
                )
            }
        />
      )}
    </div>
  );
};

export default memo(DocumentPage);
