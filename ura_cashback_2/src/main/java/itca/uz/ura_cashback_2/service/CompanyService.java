package itca.uz.ura_cashback_2.service;

import itca.uz.ura_cashback_2.entity.Company;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.payload.ApiResponse;
import itca.uz.ura_cashback_2.payload.CompanyDto;
import itca.uz.ura_cashback_2.payload.ResPageable;
import itca.uz.ura_cashback_2.repository.AttachmentRepository;
import itca.uz.ura_cashback_2.repository.CompanyRepository;
import itca.uz.ura_cashback_2.utils.CommonUtils;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    final CompanyRepository companyRepository;
    final AttachmentRepository attachmentRepository;

    public CompanyService(CompanyRepository companyRepository, AttachmentRepository attachmentRepository) {
        this.companyRepository = companyRepository;
        this.attachmentRepository = attachmentRepository;
    }

    public ApiResponse addCompany(CompanyDto companyDto, Company company){
        if (!companyRepository.existsCompanyByNameEqualsIgnoreCase(companyDto.getName())){
            if (!companyRepository.existsCompanyByAttachmentIdEquals(companyDto.getAttachmentId())){
                company.setName(companyDto.getName());
                company.setBio(companyDto.getBio());
                company.setDescription(companyDto.getDescription());
                company.setClientPercentage(companyDto.getClintPercentage());
                company.setKasserPercentage(companyDto.getKassaPercentage());
                company.setAttachment(attachmentRepository.findById(companyDto.getAttachmentId())
                        .orElseThrow(()-> new ResourceAccessException("GetAttachment")));
                companyRepository.save(company);
                return new ApiResponse("Successfully saved company", true);
            }
            return new ApiResponse("Attachment already exist",false);
        }
        return new ApiResponse("Name already exist", false);
    }

    public CompanyDto getOneCompany(UUID id, User user) {
        if (user.getRoles().size() > 2) {
            Company company = getOneCompany(id);
            return new CompanyDto(
                    company.getId(),
                    company.getName(),
                    company.getBio(),
                    company.getDescription(),
                    company.getClientPercentage(),
                    company.getKasserPercentage(),
                    company.getAttachment(),
                    company.isActive());
        }
        return new CompanyDto();
    }

    public Company getOneCompany(UUID companyId) {
        return companyRepository.findById(companyId).orElseThrow(() -> new ResourceAccessException("GetCompany"));
    }

    public ResPageable getCompanyPage(int page, int size, User user) throws Exception {
        Page<Company> allCompany = companyRepository.findAll(CommonUtils.getPageable(page, size));
        return new ResPageable(
                page,
                size,
                allCompany.getTotalElements(),
                allCompany.getTotalPages(),
                allCompany.getContent().stream().map(company -> getOneCompany(company.getId(), user))
                        .collect(Collectors.toList())
        );
    }

    public ApiResponse changeActiveCom(UUID id, User user) {
        Optional<Company> byId = companyRepository.findById(id);
        if (byId.isPresent()) {
//            if (user.getRoles().size() > 2) {
                Company company = byId.get();
                company.setActive(!company.isActive());
                companyRepository.save(company);
                return new ApiResponse(company.isActive() ? "Company active" : "Company inactive", true);
//            }
//            return new ApiResponse("User role not equals", false);
        }
        return new ApiResponse("Company not found", false);
    }
}
