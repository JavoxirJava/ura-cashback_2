package itca.uz.ura_cashback_2.controller;

import itca.uz.ura_cashback_2.entity.Company;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.payload.ApiResponse;
import itca.uz.ura_cashback_2.payload.CompanyDto;
import itca.uz.ura_cashback_2.repository.CompanyRepository;
import itca.uz.ura_cashback_2.security.CurrentUser;
import itca.uz.ura_cashback_2.service.CompanyService;
import itca.uz.ura_cashback_2.utils.AppConstant;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.UUID;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    final CompanyService companyService;
    final CompanyRepository companyRepository;
    public CompanyController(CompanyService companyService, CompanyRepository companyRepository) {
        this.companyService = companyService;
        this.companyRepository = companyRepository;
    }


    @PostMapping
    public HttpEntity<?> addCompany(@RequestBody CompanyDto companyDto) {
        ApiResponse apiResponse = companyService.addCompany(companyDto, new Company());
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editCompany(@PathVariable UUID id, @RequestBody CompanyDto dtoCompany){
        Company company = companyRepository.findById(id).orElseThrow(() -> new ResourceAccessException("GetCompany"));
        ApiResponse apiResponse = companyService.addCompany(dtoCompany, company);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOneCompany(@PathVariable UUID id,  @CurrentUser User user){
        CompanyDto companyDto = companyService.getOneCompany(id, user);
        return ResponseEntity.ok(companyDto);
    }

    @PreAuthorize(value = "hasAnyRole('ROLE_SUPER_ADMIN')")
    @GetMapping
    public HttpEntity<?> getCompanyPage(@RequestParam(value = "page", defaultValue = AppConstant.DEFAULT_PAGE) int page,
                                        @RequestParam(value = "size", defaultValue = AppConstant.DEFAULT_SIZE) int size,
                                        @CurrentUser User user) throws Exception {
        return ResponseEntity.ok(companyService.getCompanyList(page, size, user));
    }

    @PutMapping("/active/{id}")
    public HttpEntity<?> changeActiveCom(@PathVariable UUID id, @CurrentUser User user){
        ApiResponse apiResponse = companyService.changeActiveCom(id, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
}