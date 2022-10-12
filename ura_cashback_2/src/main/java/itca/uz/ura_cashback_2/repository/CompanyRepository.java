package itca.uz.ura_cashback_2.repository;

import itca.uz.ura_cashback_2.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {
    boolean existsCompanyByNameEqualsIgnoreCase(String name);

    boolean existsCompanyByAttachmentIdEquals(UUID attachment_id);

//    @Query(value = "select * from company where id=(select company_id from users_company where users_id=
//    (select user_id from user_role where role_id = (select id from roles where role_name = 'ROLE_ADMIN') and user_id=:id))")
    @Query(value = "select * from company where id=(select company_id from users_company where users_id=" +
                "(select user_id from user_role where user_id=:id and role_id=(select id from roles where role_name='ROLE_ADMIN')))", nativeQuery = true)
    Company findByRoleNameAndUserId(@Param("id") UUID id);
}
