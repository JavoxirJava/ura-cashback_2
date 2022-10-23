package itca.uz.ura_cashback_2.repository;

import itca.uz.ura_cashback_2.entity.CompanyUserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CompanyUserRoleRepository extends JpaRepository<CompanyUserRole, UUID> {

    CompanyUserRole findByUserIdEqualsAndRoleIdEquals(UUID userId, Integer roleId);

    CompanyUserRole findByUserIdEquals(UUID userId);

    List<CompanyUserRole> findByCompanyIdEqualsAndRoleIdEquals(UUID companyId, Integer roleId);
}
