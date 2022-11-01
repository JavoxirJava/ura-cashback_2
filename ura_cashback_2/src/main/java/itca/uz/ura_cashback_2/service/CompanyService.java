package itca.uz.ura_cashback_2.service;

import itca.uz.ura_cashback_2.entity.Company;
import itca.uz.ura_cashback_2.entity.Role;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.entity.enums.RoleName;
import itca.uz.ura_cashback_2.payload.ApiResponse;
import itca.uz.ura_cashback_2.payload.CompanyDto;
import itca.uz.ura_cashback_2.payload.ResPageable;
import itca.uz.ura_cashback_2.repository.AttachmentRepository;
import itca.uz.ura_cashback_2.repository.AuthRepository;
import itca.uz.ura_cashback_2.repository.CompanyRepository;
import itca.uz.ura_cashback_2.repository.RoleRepository;
import itca.uz.ura_cashback_2.utils.CommonUtils;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    final CompanyRepository companyRepository;
    final AttachmentRepository attachmentRepository;
    final RoleRepository roleRepository;
    final AuthRepository authRepository;

    public CompanyService(CompanyRepository companyRepository, AttachmentRepository attachmentRepository, RoleRepository roleRepository, AuthRepository authRepository) {
        this.companyRepository = companyRepository;
        this.attachmentRepository = attachmentRepository;
        this.roleRepository = roleRepository;
        this.authRepository = authRepository;
    }

    public ApiResponse addCompany(CompanyDto companyDto, Company company) {
        if (!companyRepository.existsCompanyByNameEqualsIgnoreCase(companyDto.getName())) {
            if (!companyRepository.existsCompanyByAttachmentIdEquals(companyDto.getAttachmentId())) {
                company.setName(companyDto.getName());
                company.setBio(companyDto.getBio());
                company.setDescription(companyDto.getDescription());
                company.setClientPercentage(companyDto.getClintPercentage());
                company.setAttachment(attachmentRepository.findById(companyDto.getAttachmentId())
                        .orElseThrow(() -> new ResourceAccessException("GetAttachment")));
                Company save = companyRepository.save(company);
                User user = authRepository.findById(companyDto.getUserId()).get();
                user.setCompanies(Collections.singletonList(save));
                user.setRoles(Collections.singletonList(roleRepository.findRoleByRoleName(RoleName.ROLE_ADMIN)));
                authRepository.save(user);

                return new ApiResponse("Successfully saved company", true);
            }
            return new ApiResponse("Attachment already exist", false);
        }
        return new ApiResponse("Name already exist", false);
    }

    public CompanyDto getOneCompany(UUID id) {
        Company company = companyRepository.findById(id).get();
        for(User user : authRepository.findAll()){
            for(Company company1 : user.getCompanies()){
                if(company1.getId().equals(id)){
                    for(Role role : user.getRoles()){
                        if(role.getId().equals(roleRepository.findRoleByRoleName(RoleName.ROLE_ADMIN).getId()) || role.getId().equals(roleRepository.findRoleByRoleName(RoleName.ROLE_SUPER_ADMIN).getId())){
                            return new CompanyDto(
                                    company.getId(),
                                    company.getName(),
                                    company.getBio(),
                                    company.getDescription(),
                                    company.getClientPercentage(),
                                    company.getAttachment(),
                                    company.isActive(),
                                    authRepository.findById(user.getId()).get());
                        }
                    }
                }
            }
        }
        return null;
    }

    public List<CompanyDto> companyList() {
        return companyRepository.findAll().stream().map(company -> getOneCompany(company.getId())).collect(Collectors.toList());
    }

//    public ResPageable getCompanyPage(int page, int size, User user) throws Exception {
//        Page<Company> allCompany = companyRepository.findAll(CommonUtils.getPageable(page, size));
//        return new ResPageable(
//                page,
//                size,
//                allCompany.getTotalElements(),
//                allCompany.getTotalPages(),
//                allCompany.getContent().stream().map(company -> getOneCompany(company.getId(), user))
//                        .collect(Collectors.toList())
//        );
//    }

    public ApiResponse changeActiveCom(UUID id) {
        Company company = companyRepository.findById(id).get();
        company.setActive(!company.isActive());
        companyRepository.save(company);
        return new ApiResponse("Successfully active company",true);
    }
}