from fastapi import APIRouter
from app.commons.load_config import config
from app.sql.schemas.requests.DocumentRequest import FileOpenRequest
from app.sql.controllers.MiscellaneousController import MiscellaneousController

miscellaneous_router = APIRouter(prefix=config["api_prefix"])

@miscellaneous_router.post("/read-file")
def get_file_data(request: FileOpenRequest):
    """[Get File data in html format]

    Raises:
        error: [Error details]

    Returns:
        dict: html file contents
    """
    return MiscellaneousController().file_data(request)