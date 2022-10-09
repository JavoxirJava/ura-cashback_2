package itca.uz.ura_cashback_2.repository;

import itca.uz.ura_cashback_2.entity.Company;
import itca.uz.ura_cashback_2.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {
    boolean existsCompanyByNameEqualsIgnoreCase(String name);
    boolean existsCompanyByAttachmentIdEquals(UUID attachment_id);

}
