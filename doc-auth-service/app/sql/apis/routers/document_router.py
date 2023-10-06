import json
from fastapi import APIRouter
from app.commons.load_config import config
from app.sql.controllers.DocumentController import DocumentController
from fastapi import File, UploadFile, Form
from app.sql.schemas.requests.DocumentRequest import FileOpenRequest

document_router = APIRouter(prefix=config["api_prefix"])


@document_router.get("/all-documents/")
async def get_all_documents():
    """[Get List of all documents]

    Raises:
        error: [Error details]

    Returns:
        [list]: [List of documents]
    """
    list_of_documents = DocumentController().get_all_documents_controller()
    return list_of_documents

@document_router.get("/documents/nt_id")
async def get_documents_by_ntid(nt_id: str):
    """[Get List of all documents by nt_id]

    Raises:
        error: [Error details]

    Returns:
        [list]: [List of documents]
    """
    list_of_documents = DocumentController().get_documents_by_ntid_controller(nt_id)
    return list_of_documents


@document_router.post("/create-document")
async def create_document(
    create_document_request: str = Form(...), file: UploadFile = File(...)
):
    """[API router to create new document into the system]

    Args:
        create_document_request (create): [New document details]

    Raises:
        HTTPException: [Unauthorized exception when invalid token is passed]
        error: [Exception in underlying controller]

    Returns:
        [createResponse]: [create new document response]
    """
    create_document_request = json.loads(create_document_request)
    document_obj = DocumentController().create_document_controller(
        create_document_request, file
    )
    return document_obj


@document_router.get("/get-document-by/id")
async def get_by_id(id: int):
    """[Get document by id]

    Raises:
        error: [Error details]

    Returns:
        dict: document record
    """
    return DocumentController().read_by_id(id)


@document_router.put("/update-document")
async def update_document(
    update_document_request: str = Form(...), file: UploadFile = File(...)
):
    """[Update document by document name]

    Raises:
        error: [Error details]

    Returns:
        [str]: [Success response]
    """
    update_document_request = json.loads(update_document_request)
    document_obj = DocumentController().update_document_controller(
        update_document_request, file
    )
    return document_obj


@document_router.delete("/delete-document")
async def delete_document(document_id: int):
    """[Get List of all document]

    Raises:
        error: [Error details]

    Returns:
        [str]: [Success response]
    """
    document_obj = DocumentController().delete_Document_controller(document_id)
    return document_obj


@document_router.get("/get-document-by/name")
async def get_document_by_id(name: str):
    """[Get document by name]

    Raises:
        error: [Error details]

    Returns:
        dict: document record
    """
    document = DocumentController().read_by_name(name)
    return document


@document_router.get("/get-document-by/project_id")
async def get_document_by_id(project_id: int):
    """[Get document by project id]

    Raises:
        error: [Error details]

    Returns:
        dict: document record
    """
    document = DocumentController().read_by_project_id(project_id)
    return document


@document_router.get("/dashboard-stats/project_id")
async def get_dashboard_stats(project_id: int):
    """[Get dashboard stats by project id]

    Raises:
        error: [Error details]

    Returns:
        dict: dashboard stats
    """
    return DocumentController().get_dashboard_stats(project_id)

