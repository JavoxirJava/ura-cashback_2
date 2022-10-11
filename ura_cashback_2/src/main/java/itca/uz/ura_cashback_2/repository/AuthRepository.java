package itca.uz.ura_cashback_2.repository;

import itca.uz.ura_cashback_2.entity.Company;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.entity.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface AuthRepository extends JpaRepository<User, UUID> {
    boolean existsByPhoneNumberEqualsIgnoreCaseAndEmailEqualsIgnoreCase(String phoneNumber, String email);
    User findByPhoneNumberEqualsAndPasswordEquals(String phoneNumber, String password);
    @Query(value = "select * from company where id=(select company_id from users_company where user_id=\n" +
            "(select id from users where id=(select user_id from user_role where role_id=(select id from roles where role_name=:role))))", nativeQuery = true)
    Company existsByRoleEquals(@Param("role") RoleName role);

    Optional<User> findByPhoneNumberEquals(String phoneNumber);
}
