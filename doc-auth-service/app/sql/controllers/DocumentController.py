from app.sql.crud.document_crud import CRUDDocument
from app.sql.crud.project_crud import CRUDProject
from app.sql.crud.domain_crud import CRUDDomain
from app.sql.crud.admin_config_crud import CRUDAdminConfig
from app.sql.crud.subdomain_crud import CRUDSubDomain
from app.sql.utils.aws.s3 import upload_to_s3,delete_file_from_s3,download_file,read_a_file
from app.commons.errors import get_err_json_response
from app.sql.utils.logs.logger_config import logger
from app.sql.utils.exceptions import BadRequestResult


class DocumentController:
    def __init__(self):
        self.CRUDDocument = CRUDDocument()
        self.CRUDProject = CRUDProject()
        self.CRUDAdminConfig = CRUDAdminConfig()
        self.CRUDDomain = CRUDDomain()
        self.CRUDSubDomain = CRUDSubDomain()

    def get_domain_config(self, admin_config_id):
        admin_config = self.CRUDAdminConfig.get_by_id(id=admin_config_id)
        domain_config = self.CRUDDomain.get_by_id(id=admin_config["domain_id"])
        subdomain_config = self.CRUDSubDomain.get_by_id(
            id=admin_config["sub_domain_id"], domain_id=admin_config["domain_id"]
        )

        return {
            "domain_name": domain_config["name"],
            "sub_domain_name": subdomain_config["name"],
        }

    def get_all_documents_controller(self):
        """[Controller to get all documents]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [list]: [list of all the documents in the system]
        """
        return self.CRUDDocument.read_all()
    
    def get_documents_by_ntid_controller(self, nt_id: str):
        """[Controller to get all documents by nt_id]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [list]: [list of all the documents by nt_id in the system]
        """
        return self.CRUDDocument.read_all_documents_by_ntid(nt_id)

    def create_document_controller(self, request, file):
        """[Controller to register new document]

        Args:
            request ([dict]): [create new document request]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [dict]: [authorization details]
        """
        try:
            if not request.get("id"):
                raise BadRequestResult("document id cannot be null")
            elif not request.get("doc_name"):
                raise BadRequestResult("document name cannot be null")
            elif not request.get("project_id"):
                raise BadRequestResult("project id cannot be null")
            elif not request.get("template_id"):
                raise BadRequestResult("template id cannot be null")
        except BadRequestResult as e:
            return get_err_json_response(
                f"Invalid request body ",
                e.args,
                404,
            )
        project_obj = self.CRUDProject.get_by_project_id(id=request["project_id"])
        domain_config = self.get_domain_config(project_obj["admin_config_id"])
        s3_bucket_path = upload_to_s3(
            file=file,
            domain_name=domain_config["domain_name"],
            subdomain_name=domain_config["sub_domain_name"],
            ntid=project_obj["ntid"],
            file_name=file.filename,
            isTemplate=False,
        )
        request["admin_config_id"] = project_obj["admin_config_id"]
        request["s3_bucket_path"] = s3_bucket_path["s3Path"]
        return self.CRUDDocument.create(request)

    def delete_Document_controller(self, id: int):
        """[Delete Document Details]

        Args:
            id (int): [id of the Document]

        Returns:
            [Document deleted]
        """
        document_obj = self.CRUDDocument.get_by_id(id=id)
        project_obj = self.CRUDProject.get_by_project_id(id=document_obj.project_id)
        domain_config = self.get_domain_config(document_obj.admin_config_id)
        s3_bucket_path = delete_file_from_s3(
            domain_name=domain_config["domain_name"],
            subdomain_name=domain_config["sub_domain_name"],
            ntid=project_obj.ntid,
            file_name="Sample 2",
        )
        return self.CRUDDocument.delete(id=id)

    def read_by_id(self, id: int):
        """[Controller to get document by id]

        Args:
            id (int): [id of the Document]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            dict : document record
        """
        return self.CRUDDocument.get_by_id(id)

    def read_by_project_id(self, project_id: int):
        """[Controller to get document by project_id]

        Args:
            project_id (int): [project_id of the Document]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            dict : document record
        """
        return self.CRUDDocument.get_by_project_id(project_id)

    def read_by_name(self, name: str):
        """[Controller to get document by name]

        Args:
            name (int): [name of the Document]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            dict : document record
        """
        return self.CRUDDocument.get_by_name(name)

    def update_document_controller(self, request, file):
        """[Controller to update document by request]

        Args:
            request: {multiple values}

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [dict]: [authorization details]
        """
        try:
            if not request.get("id"):
                raise BadRequestResult("document id cannot be null")
            elif not request.get("doc_name"):
                raise BadRequestResult("document name cannot be null")
        except BadRequestResult as e:
            return get_err_json_response(
                f"Invalid request body ",
                e.args,
                404,
            )
        doc_obj = self.CRUDDocument.get_by_id(id=request["id"])
        project_obj = self.CRUDProject.get_by_project_id(id=doc_obj["project_id"])
        domain_config = self.get_domain_config(project_obj["admin_config_id"])
        s3_bucket_path = upload_to_s3(
            file=file,
            domain_name=domain_config["domain_name"],
            subdomain_name=domain_config["sub_domain_name"],
            ntid=project_obj["ntid"],
            file_name=file.filename,
            isTemplate=False,
        )
        request["admin_config_id"] = project_obj["admin_config_id"]
        request["s3_bucket_path"] = s3_bucket_path["s3Path"]
        return self.CRUDDocument.update(**request)

    def get_dashboard_stats(self, project_id: int):
        """[Controller to fetth dashboard stats by project_id]

        Args:
            project_id: project_id of a document

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [dict]: [dashboard stats]
        """
        return self.CRUDDocument.get_dashboard_stats(project_id)

    def file_data(self, request):
        """[Controller to fetch file content from s3]

        Args:
            request: request with s3 bucket path

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [dict]: [response with file content stats]
        """
        try:
            s3_path = request.s3_bucket_path
            html_content = read_a_file(s3_path)
            response_obj = {
                "html_text": html_content,
                "id": request.id,
                "file_name": request.file_name,
                "type": request.type,
                "s3_bucket_path": request.s3_bucket_path,
                "action": request.action,
            }
            return response_obj
        except Exception as err:
            logger.error(err)
            return get_err_json_response(
                "Error while reading file data from s3 in controller",
                err.args,
                501,
            )

    def download_file(self, s3_path):
        return download_file(s3_path)
