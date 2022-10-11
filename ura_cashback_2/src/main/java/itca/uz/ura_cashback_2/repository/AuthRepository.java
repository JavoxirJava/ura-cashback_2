package itca.uz.ura_cashback_2.repository;

import itca.uz.ura_cashback_2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AuthRepository extends JpaRepository<User, UUID> {
    boolean existsByPhoneNumberEqualsIgnoreCaseAndEmailEqualsIgnoreCase(String phoneNumber, String email);
    boolean existsByPhoneNumberEqualsAndPasswordEquals(String phoneNumber, String password);
    User findByPhoneNumberEqualsAndPasswordEquals(String phoneNumber, String password);

    Optional<User> findByPhoneNumberEquals(String phoneNumber);
}
