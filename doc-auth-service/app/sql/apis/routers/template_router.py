from fastapi import APIRouter, UploadFile, File, Form
from app.commons.load_config import config
from app.sql.controllers.TemplateController import TemplateController
import json

template_router = APIRouter(prefix=config["api_prefix"])


@template_router.post("/template")
async def create_template(request: str = Form(...), fileb: UploadFile = File(...)):
    """[API router to create new template into the system]

    Args:
        request (create): [New template details]

    Raises:
        HTTPException: [Unauthorized exception when invalid token is passed]
        error: [Exception in underlying controller]

    Returns:
        [createResponse]: [create new template response]
    """
    create_template_request = json.loads(request)
    template_obj = TemplateController().create_template_controller(
        create_template_request, fileb
    )
    return template_obj


@template_router.get("/all-templates")
async def get_all_templates(project_id: int, ntid: str):
    """[Get List of all templates]

    Raises:
        error: [Error details]

    Returns:
        [list]: [List of templates]
    """
    list_of_templates = TemplateController().get_all_template_controller(
        project_id, ntid
    )
    return list_of_templates


@template_router.get("/template-details")
async def get_template(template_id: int):
    """[Get template by ID]

    Args:
        id: [Template id to look for]

    Raises:
        HTTPException: [Not found exception]
        error: [Error details]

    Returns:
        [dict]: [Template]
    """

    template_obj = TemplateController().get_template(template_id)

    return template_obj


@template_router.put("/template")
async def update_template(request: str = Form(...), fileb: UploadFile = File(...)):
    """[Updates template by ID]

    Args:
        id: [Template id to look for]
        update_template_request: [New template request]

    Raises:
        HTTPException: [Not found exception]
        error: [Error details]

    Returns:
        [dict]: [Updated template]
    """
    update_template_request = json.loads(request)
    return TemplateController().update_template(update_template_request, fileb)


@template_router.delete("/template")
async def delete_template(template_id: int):
    """[Delete template]

    Raises:
        error: [Error details]

    Returns:
        [str]: [Success response]
    """
    template_obj = TemplateController().delete_template_controller(template_id)
    return template_obj
