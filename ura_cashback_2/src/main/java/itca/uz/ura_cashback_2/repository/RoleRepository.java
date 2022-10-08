package itca.uz.ura_cashback_2.repository;

import itca.uz.ura_cashback_2.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
//@RepositoryRestResource(path = "role", collectionResourceRel = "list", excerptProjection = CustomRole.class)
public interface RoleRepository extends JpaRepository<Role, Integer> {
}
