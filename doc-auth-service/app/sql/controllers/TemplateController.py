from app.sql.crud.project_crud import CRUDProject
from app.sql.crud.template_crud import CRUDTemplate
from app.sql.crud.admin_config_crud import CRUDAdminConfig
from .ProjectController import ProjectController
from .AdminConfigController import CRUDDomain, CRUDSubDomain
from app.sql.utils.aws.s3 import upload_to_s3
import datetime
from app.commons.errors import get_err_json_response
from app.sql.utils.exceptions import ResourceNotFound, BadRequestResult
from app.sql.utils.logs.logger_config import logger


class TemplateController:
    def __init__(self):
        self.CRUDAdminConfig = CRUDAdminConfig()
        self.CRUDProject = CRUDProject()
        self.CRUDDomain = CRUDDomain()
        self.CRUDSubDomain = CRUDSubDomain()
        self.CRUDTemplate = CRUDTemplate()
        self.ProjectController = ProjectController()

    def get_domain_config(self, project):
        admin_config = self.CRUDAdminConfig.get_by_id(id=project["admin_config_id"])
        domain_config = self.CRUDDomain.get_by_id(id=admin_config["domain_id"])
        subdomain_config = self.CRUDSubDomain.get_by_id(
            id=admin_config["sub_domain_id"], domain_id=admin_config["domain_id"]
        )

        return {
            "domain_name": domain_config["name"],
            "sub_domain_name": subdomain_config["name"],
        }

    def check_enum(self, template_creation_type, template_file_type):
        if template_creation_type != "UPLOADED" and template_creation_type != "CREATED":
            message = "Creation type must be UPLOADED or CREATED only.Please send correct template_creation_type"
            raise BadRequestResult(message)

        if template_file_type != "PDF" and template_file_type != "WORD":
            message = "File type must be PDF or WORD only.Please send correct template_file_type!"
            raise BadRequestResult(message)

    def upload_s3(self, request, project_id, file):
        try:
            project_obj = self.CRUDProject.get_by_project_id(id=project_id)

            if project_obj is None:
                raise ResourceNotFound(
                    f"Project id : {project_id}, NT-ID : {request['ntid']}"
                )

            domain_config = self.get_domain_config(project_obj)
            s3_bucket_path = upload_to_s3(
                file=file,
                domain_name=domain_config["domain_name"],
                subdomain_name=domain_config["sub_domain_name"],
                ntid=request["ntid"],
                file_name=file.filename,
                isTemplate=True,
            )
            return s3_bucket_path["s3Path"]
        except ResourceNotFound as e:
            logger.error(e)
            message = "Project does not exist!"
            status_code = 404
            return get_err_json_response(
                message,
                e.args,
                status_code,
            )

    def create_template_controller(self, request, fileb):
        """[Controller to register new config]

        Args:
            request ([dict]): [create new config request]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [dict]: [admin config obj with id]
        """

        try:
            self.check_enum(
                request["template_creation_type"], request["template_file_type"]
            )

            if len(request["template_name"]) == 0:
                message = "Template name can not be empty!"
                raise BadRequestResult(message)

            project_obj = self.CRUDProject.get_by_project_id(id=request["project_id"])
            if project_obj is None:
                raise ResourceNotFound(f"Project id: {request['project_id']}")

            template_obj = self.CRUDTemplate.get_by_name(name=request["template_name"])
            if template_obj is not None:
                raise BadRequestResult(
                    f"Template name : {request['template_name']}, Tempalate with the same name does already exist!"
                )

            s3_bucket_path = self.upload_s3(
                request=request, project_id=request["project_id"], file=fileb
            )

            config_req = {}
            config_req = {
                "template_name": request["template_name"].lower(),
                "template_creation_type": request["template_creation_type"],
                "template_file_type": request["template_file_type"],
                "created_date": datetime.datetime.now(),
                "updated_date": datetime.datetime.now(),
                "project_id": request["project_id"],
                "s3_bucket_path": s3_bucket_path,
            }

            response = self.CRUDTemplate.create(**config_req)
            return response
        except BadRequestResult as e:
            logger.error(e)
            status_code = 400
            return get_err_json_response(
                e.args,
                e.args,
                status_code,
            )
        except ResourceNotFound as e:
            logger.error(e)
            message = "Project does not exist!"
            status_code = 404
            return get_err_json_response(
                message,
                e.args,
                status_code,
            )
        except Exception as e:
            return get_err_json_response(
                "Error while creating template in controller.", e.args, 501
            )

    def get_all_template_controller(self, project_id, ntid):
        """[Controller to get all templates]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [list]: [list of all the  templates in the system]
        """
        try:
            project_obj = self.CRUDProject.get_by_project_id(id=project_id)
            if project_obj is None:
                raise ResourceNotFound(f"Project id: {project_id}")

            template_list = self.CRUDTemplate.get_all_by_id(project_id)
            if not len(template_list):
                return []

            domain_config = self.get_domain_config(
                {"admin_config_id": project_obj["admin_config_id"]}
            )

            response_list = []
            for item in template_list:
                response_obj = {
                    "id": item["id"],
                    "template_name": item["template_name"],
                    "project_id": item["project_id"],
                    "project_name": project_obj["project_name"],
                    "domain_name": domain_config["domain_name"],
                    "sub_domain_name": domain_config["sub_domain_name"],
                    "template_creation_type": item["template_creation_type"],
                    "template_file_type": item["template_file_type"],
                    "created_date": item["created_date"],
                    "updated_date": item["updated_date"],
                    "ntid": ntid,
                }
                response_list.append(response_obj)

            return response_list
        except ResourceNotFound as e:
            logger.error(e)
            return get_err_json_response("Projects does not exist!", e.args, 404)
        except Exception as e:
            return get_err_json_response(
                "Error while getting all templates in controller.", e.args, 501
            )

    def get_template(self, template_id):
        """[Controller to retrieve a template using its ID]

        Args:
            id: [ID of the template to be retrieved]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [dict]: [Template object corresponding to input ID]
        """
        try:
            return self.CRUDTemplate.get_by_id(template_id)
        except Exception as e:
            return get_err_json_response(
                "Error while getting a template in controller.", e.args, 501
            )

    def delete_template_controller(self, template_id):
        """[Delete template ]

        Args:
            template_id (int): [template_id of the template]

        Returns:
            Successfully deleted message
        """
        try:
            template_obj = self.CRUDTemplate.get_by_id(template_id=template_id)

            if template_obj is None:
                raise ResourceNotFound(f"Template-Id : {template_id}")

            template_deleted = self.CRUDTemplate.delete(template_id=template_id)

            return template_deleted
        except ResourceNotFound as e:
            logger.error(e)
            message = "Templates does not exist!"
            status_code = 404
            return get_err_json_response(
                message,
                e.args,
                status_code,
            )
        except Exception as e:
            logger.error(e)
            return get_err_json_response(
                "Error while deleting a template in controller.", e.args, 501
            )

    def update_template(self, request, file):
        """[Controller to update existing template]

        Args:
            template_id: [ID of the template to be updated]
            request: [Instance of CreateTemplateRequest class]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [dict]: [Newly updated template obj]
        """

        try:
            template_id = request["template_id"]
            self.check_enum(
                request["template_creation_type"], request["template_file_type"]
            )

            if len(request["template_name"]) == 0:
                message = "Template name can not be empty!"
                raise BadRequestResult(message)

            template_obj = self.CRUDTemplate.get_by_id(template_id=template_id)
            if template_obj is None:
                raise ResourceNotFound(f"Template-Id : {template_id}")

            project_id = template_obj["project_id"]
            s3_bucket_path = self.upload_s3(
                request=request, project_id=project_id, file=file
            )

            req = {
                "template_name": request["template_name"].lower(),
                "template_creation_type": request["template_creation_type"],
                "template_file_type": request["template_file_type"],
                "created_date": datetime.datetime(1, 1, 1),
                "updated_date": datetime.datetime.now(),
                "project_id": project_id,
                "s3_bucket_path": s3_bucket_path,
            }

            response = self.CRUDTemplate.update(template_id, req)
            return response
        except BadRequestResult as e:
            logger.error(e)
            status_code = 400
            return get_err_json_response(
                e.args,
                e.args,
                status_code,
            )
        except ResourceNotFound as e:
            logger.error(e)
            message = "Tempalate with the id does not exist!"
            status_code = 404
            return get_err_json_response(
                message,
                e.args,
                status_code,
            )
        except Exception as e:
            logger.error(e)
            return get_err_json_response(
                "Error while updating the template in controller.", e.args, 501
            )
