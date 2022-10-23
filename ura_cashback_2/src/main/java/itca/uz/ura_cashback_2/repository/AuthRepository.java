package itca.uz.ura_cashback_2.repository;

import itca.uz.ura_cashback_2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthRepository extends JpaRepository<User, UUID> {
    boolean existsByPhoneNumberEqualsIgnoreCaseAndEmailEqualsIgnoreCase(String phoneNumber, String email);

    User findByIdEquals(UUID id);
    User findByPhoneNumberEqualsAndPasswordEquals(String phoneNumber, String password);
    //    @Query(value = "select * from company " +
//            "where id=(select company_id from users_company " +
//            "where user_id=(select id from users " +
//            "where id=(select user_id from user_role " +
//            "where role_id=(select id from roles " +
//            "where role_name=:role))))", nativeQuery = true)
//    Company findByRoleEquals(@Param("role") RoleName role);

    User findByPhoneNumberEquals(String phoneNumber);
}
