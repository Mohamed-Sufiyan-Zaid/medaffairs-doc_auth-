from fastapi import APIRouter
from app.commons.load_config import config
from app.sql.controllers.MetricController import MetricController

dashboard_router = APIRouter(prefix=config["api_prefix"])


@dashboard_router.get("/dashboard/count")
async def fetch_metric():
    """[Get List of all project]

    Raises:
        error: [Error details]

    Returns:
        [str]: [Success response]
    """
    metric_obj = MetricController().fetch_metric()
    return metric_obj
