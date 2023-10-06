import os
from fastapi import UploadFile
import boto3
from app.commons.errors import get_err_json_response
from dotenv import load_dotenv
from app.sql.utils.logs.logger_config import logger
import io
import docx2txt
import mammoth

load_dotenv()


def create_client():
    aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID")
    aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")

    # Initialize the S3 client with the credentials
    client = boto3.client(
        "s3",
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
    )
    return client


def upload_to_s3(
    file: UploadFile,
    domain_name: str,
    subdomain_name: str,
    ntid: str,
    file_name: str,
    isTemplate: bool,
):
    """Uploads file in the S3 bucket. The bucket name is configured in
    the environment variables.

    Args:
        file: actual local file
        domain_name (str): domain name
        subdomain_name (str): subdomain name
        ntid (str): group ntid or reference id
        file_name (str): file name

    Returns:
        Any: returns S3 Path.
        Otherwise returns BadRequest/InternalServerError response in case of failure
    """
    client = create_client()
    try:
        bucket_name: str = os.environ["awsBucket"]

        if isTemplate:
            file_path: str = (
                f"Templates/{domain_name}/{subdomain_name}/{ntid}/{file_name}"
            )
        else:
            file_path: str = (
                f"Documents/{domain_name}/{subdomain_name}/{ntid}/{file_name}"
            )

        file_content = file.file.read()

        # Save the content to a local file
        with open(file.filename, "wb") as local_file:
            local_file.write(file_content)

        # upload doc
        # client.upload_file(file.filename, bucket_name, file_path)
        body = {"s3Path": f"s3://{bucket_name}/{file_path}"}

        local_path = f"{os.getcwd()}/{file.filename}"

        if os.path.exists(local_path):
            os.remove(local_path)

        return body  # 200 success response

    except client.exceptions.NoSuchBucket as err:
        logger.error(err)
        return get_err_json_response(
            err.args,
            400,
        )  # 400 bad request response

    except Exception as err:
        logger.error(err)
        return get_err_json_response(
            str(err),
            err.args,
            501,
        )


def delete_file_from_s3(
    s3_path: str,
):
    """Deletes a file from S3.

    Args:
        domain_name (str): domain name
        subdomain_name (str): subdomain name
        ntid (str): group ntid or reference id
        file_name (str): template name

    Returns:
        Success message.
        Otherwise returns BadRequest/InternalServerError response in case of failure
    """

    client = create_client()

    try:
        bucket_name: str = os.environ["awsBucket"]
        file_name = "/".join(s3_path.split("/")[3:])
        client.delete_object(Bucket=bucket_name, Key=file_name)
        return {"message": "File successfully deleted!"}  # 200 success response
    except client.exceptions.NoSuchBucket as err:
        logger.error(err)
        return get_err_json_response(
            str(err),
            err.args,
            400,
        )  # 400 bad request response

    except Exception as err:
        logger.error(err)
        return get_err_json_response(
            str(err),
            err.args,
            501,
        )


def download_file(s3_path: str):
    """Downloads the file mentioned in the path from an AWS S3 bucket

    Args:
        s3_path: bucket path

    Returns:
        Dict[str, Any]: JSON like Python Dict object
    """
    client = create_client()
    try:
        bucket_name: str = os.environ["awsBucket"]
        file_name = "/".join(s3_path.split("/")[3:])
        response = client.get_object(Bucket=bucket_name, Key=file_name)
        file_body = response["Body"].read()

        # Create a binary stream for the response
        binary_stream = io.BytesIO(file_body)

        return {
            "headers": {
                "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": f"attachment; filename={file_name}",
            },
            "body": binary_stream.read().decode("latin-1"),
        }
    except Exception as err:
        logger.error(err)
        return get_err_json_response(
            str(err),
            err.args,
            501,
        )


def read_a_file(s3_path: str):
    """Reads a file from S3.

    Args:
        s3_path (str): file path

    Returns:
        Success message.
        Otherwise returns BadRequest/InternalServerError response in case of failure
    """
    # client = create_client()
    try:
        # bucket_name: str = "/".join(s3_path.split("/")[2:3])
        # file_name = "/".join(s3_path.split("/")[3:])
        # response = client.get_object(Bucket=bucket_name, Key=file_name)
        # word_document_bytes = file.read()
        # file = open(s3_path)
        document = mammoth.convert_to_html(f"{os.getcwd()}\\app\\sql\\utils\\aws\\sample_doc.docx")
        # html_string = docx2txt.process(f"{os.getcwd()}\\app\\sql\\utils\\aws\\sample_doc.docx")
        return document
    # except client.exceptions.NoSuchBucket as err:
    #     logger.error(err)
    #     return get_err_json_response(
    #         err.args,
    #         400,
    #     )  # 400 bad request response
    except Exception as err:
        logger.error(err)
        return get_err_json_response(
            str(err),
            err.args,
            501,
        )
