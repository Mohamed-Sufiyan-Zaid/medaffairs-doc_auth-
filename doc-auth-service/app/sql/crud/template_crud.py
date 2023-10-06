from app.sql import session
from sqlalchemy import and_
from app.sql.orm_models.template_model import Template
from app.commons.errors import get_err_json_response
from app.sql.utils.logs.logger_config import logger


class CRUDTemplate:
    def create(self, **kwargs):
        """[CRUD function to create a new Template record]

        Raises:
            error: [Error returned from the DB layer]
        """
        try:
            Templates = Template(**kwargs)
            with session() as transaction_session:
                transaction_session.add(Templates)
                transaction_session.commit()
                transaction_session.refresh(Templates)
            logger.info("Created a new template record")
            delattr(Templates, "s3_bucket_path")
            return Templates.__dict__
        except Exception as e:
            return get_err_json_response(
                "Error while adding to Template table",
                e.args,
                501,
            )

    def read_all(self):
        """[CRUD function to read_all Templates record]

        Raises:
            error: [Error returned from the DB layer]

        Returns:
            [list]: [all Template records]
        """
        try:
            with session() as transaction_session:
                obj: Template = transaction_session.query(Template).all()
            if obj is not None:
                logger.info("fetching all the template records")
                return [row.__dict__ for row in obj]
            else:
                logger.info("No template record found")
                return []
        except Exception as e:
            logger.error(e)
            return get_err_json_response(
                "Error while reading from Template table",
                e.args,
                501,
            )

    def get_all_by_id(self, project_id: int):
        """[CRUD function to read_all Templates record]

        Raises:
            error: [Error returned from the DB layer]

        Returns:
            [list]: [all Template records]
        """
        try:
            with session() as transaction_session:
                obj: Template = (
                    transaction_session.query(Template)
                    .filter(Template.project_id == project_id)
                    .all()
                )
            if obj is not None:
                logger.info("fetching template record using id")
                return [row.__dict__ for row in obj]
            else:
                logger.info(f"no template record found for id {project_id}")
                return []
        except Exception as e:
            logger.error(e)
            return get_err_json_response(
                "Error while reading from Template table by project id : {project_id}.",
                e.args,
                501,
            )

    def get_by_id(self, template_id: int):
        """[CRUD function to read existing template]

        Args:
            [id]: [ID of the template to be retrieved]

        Raises:
            error: [Error returned from the DB layer]

        Returns:
            [dict]: [Template object corresponding to requested ID]
        """
        try:
            with session() as transaction_session:
                obj: Template = (
                    transaction_session.query(Template)
                    .filter(Template.id == template_id)
                    .first()
                )
            if obj is not None:
                logger.info("fetching template record using id")
                return obj.__dict__
            else:
                logger.info(f"no template record found for  template id {template_id}.")
                return None
        except Exception as e:
            logger.error(e)
            return get_err_json_response(
                "Error while reading from Template table by template id {template_id}. ",
                e.args,
                404,
            )

    def get_by_name(self, name: str):
        """[CRUD function to read a Template record]

        Args:
            Template_name (str): [Template name to filter the record]

        Raises:
            error: [Error returned from the DB layer]

        Returns:
            [dict]: [Template record matching the criteria]
        """
        try:
            with session() as transaction_session:
                obj: Template = (
                    transaction_session.query(Template)
                    .filter(Template.template_name == name)
                    .first()
                )
            if obj is not None:
                logger.info("fetching template record using name")
                return obj.__dict__
            else:
                logger.info(f"no template record found for name {name}")
                return None
        except Exception as e:
            logger.error(e)
            return get_err_json_response(
                "Error while getting by name from Template table",
                e.args,
                501,
            )

    def update(self, template_id, req):
        """[CRUD function to update existing template record]

        Args:
            template_id: [ID of the template to be updated]
            request: [Instance of CreateTemplateRequest class]

        Raises:
            error: [Error returned from the DB layer]

        Returns:
            [dict]: [Newly updated template obj]
        """
        try:
            with session() as transaction_session:
                obj: Template = (
                    transaction_session.query(Template)
                    .filter(Template.id == template_id)
                    .first()
                )

                for var in req.keys():
                    if var != "created_date":
                        obj.__setattr__(var, req[var])

                transaction_session.add(obj)
                transaction_session.commit()
                transaction_session.refresh(obj)
            logger.info("Updated template record")
            delattr(obj, "s3_bucket_path")
            return obj.__dict__
        except Exception as e:
            logger.error(e)
            return get_err_json_response(
                "Error while updating to templates table",
                e.args,
                501,
            )

    def delete(self, template_id: int):
        """[CRUD function to delete a Template record]

        Raises:
            error: [Error returned from the DB layer]
        """
        try:
            with session() as transaction_session:
                obj: Template = (
                    transaction_session.query(Template)
                    .filter(Template.id == template_id)
                    .first()
                )
                transaction_session.delete(obj)
                transaction_session.commit()
            logger.info(f"deleted a template record for template id {template_id}.")
            return {"Message": "Template deleted successfully!"}
        except Exception as e:
            logger.error(e)
            return get_err_json_response(
                "Error while deleting from Template table",
                e.args,
                501,
            )
