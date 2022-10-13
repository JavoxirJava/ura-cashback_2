package itca.uz.ura_cashback_2.service;

import itca.uz.ura_cashback_2.entity.Company;
import itca.uz.ura_cashback_2.entity.CompanyUserRole;
import itca.uz.ura_cashback_2.repository.CompanyUserRoleRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CompanyUserRoleService {

    final CompanyUserRoleRepository companyUserRoleRepository;
    final CompanyService companyService;

    public CompanyUserRoleService(CompanyUserRoleRepository companyUserRoleRepository, CompanyService companyService) {
        this.companyUserRoleRepository = companyUserRoleRepository;
        this.companyService = companyService;
    }

    public void addCompanyUserRole(CompanyUserRole companyUserRole, UUID userId, UUID companyId, Integer roleId) {
        companyUserRole.setUserId(userId);
        companyUserRole.setCompanyId(companyId);
        companyUserRole.setRoleId(roleId);
        companyUserRoleRepository.save(companyUserRole);
    }

    public Company getCompanyFindByUser(UUID userId, Integer roleId) {
        return companyService.getOneCompany(companyUserRoleRepository.findByUserIdEqualsAndRoleIdEquals(userId, roleId).getCompanyId());
    }

    public CompanyUserRole getCompanyUserRole(UUID userId, Integer roleId){
        return companyUserRoleRepository.findByUserIdEqualsAndRoleIdEquals(userId, roleId);
    }
}
