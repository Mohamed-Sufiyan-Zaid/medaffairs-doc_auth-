from app.sql.crud.domain_crud import CRUDDomain
from app.sql.crud.subdomain_crud import CRUDSubDomain


class DomainController:
    def __init__(self):
        self.CRUDDomain = CRUDDomain()
        self.CRUDSubDomain = CRUDSubDomain()

    def get_all_domains_controller(self):
        """[Controller to get all domains]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [list]: [list of all the domains in the system]
        """
        return self.CRUDDomain.read_all()

    def create_domain_controller(self, request):
        """[Controller to register new domain]

        Args:
            request ([dict]): [create new domain request]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [dict]: [authorization details]
        """
        domain_name = request.name.lower()
        domain_obj = self.CRUDDomain.get_by_name(name=domain_name)
        if domain_obj is not None:
            return domain_obj
        domain_request = {"name": domain_name}
        return self.CRUDDomain.create(**domain_request)

    def delete_Domain_controller(self, id: int):
        """[Delete Domain Details]

        Args:
            id (str): [id of the Domain]

        Returns:
            [Domain deleted]
        """
        return self.CRUDDomain.delete(id=id)

    # for sub-domains---------------------------------------------------------------------------

    def get_all_subdomains_controller(self, domain_id:int):
        """[Controller to get all sub-domains]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [list]: [list of all the sub-domains in the system]
        """
        return self.CRUDSubDomain.get_by_domain_id(domain_id)

    def create_subdomain_controller(self, request):
        """[Controller to register new subdomain]

        Args:
            request ([dict]): [create new subdomain request]

        Raises:
            error: [Error raised from controller layer]

        Returns:
            [dict]: [authorization details]
        """
        subdomain_name = request.name.lower()
        subdomain_obj = self.CRUDSubDomain.get_by_name(
            name=subdomain_name, domain_id=request.domain_id
        )
        if subdomain_obj is not None:
            return subdomain_obj
        domain_request = {"name": subdomain_name, "domain_id": request.domain_id}
        return self.CRUDSubDomain.create(**domain_request)

    def delete_subdomain_controller(self, id: int):
        """[Delete subDomain Details]

        Args:
            id (str): [id of the subDomain]

        Returns:
            [subDomain deleted]
        """
        return self.CRUDSubDomain.delete(id=id)
