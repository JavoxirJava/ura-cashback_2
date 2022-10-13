package itca.uz.ura_cashback_2.service;


import itca.uz.ura_cashback_2.entity.CompanyUserRole;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.entity.enums.RoleName;
import itca.uz.ura_cashback_2.payload.ApiResponse;
import itca.uz.ura_cashback_2.payload.AuthDto;
import itca.uz.ura_cashback_2.payload.ResPageable;
import itca.uz.ura_cashback_2.repository.AttachmentRepository;
import itca.uz.ura_cashback_2.repository.AuthRepository;
import itca.uz.ura_cashback_2.repository.CompanyRepository;
import itca.uz.ura_cashback_2.repository.RoleRepository;
import itca.uz.ura_cashback_2.utils.CommonUtils;
import org.springframework.data.domain.Page;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
public class AuthService implements UserDetailsService {

    final AuthRepository authRepository;
    final AttachmentRepository attachmentRepository;
    final CompanyRepository companyRepository;
    final RoleRepository roleRepository;
    final CompanyUserRoleService companyUserRoleService;

    public AuthService(AuthRepository authRepository, AttachmentRepository attachmentRepository, CompanyRepository companyRepository, RoleRepository roleRepository, CompanyUserRoleService companyUserRoleService) {
        this.authRepository = authRepository;
        this.attachmentRepository = attachmentRepository;
        this.companyRepository = companyRepository;
        this.roleRepository = roleRepository;
        this.companyUserRoleService = companyUserRoleService;
    }

    public ApiResponse clintAndAdminRegister(CompanyUserRole companyUserRole, User user, AuthDto authDto) {
        if (!authRepository.existsByPhoneNumberEqualsIgnoreCaseAndEmailEqualsIgnoreCase(authDto.getPhoneNumber(), authDto.getEmail())) {
           if (authDto.getPassword().equals(authDto.getPrePassword())) {
                user.setFirstName(authDto.getFirstName());
                user.setLastName(authDto.getLastName());
                user.setPhoneNumber(authDto.getPhoneNumber());
                user.setEmail(authDto.getEmail());
                user.setSalary(authDto.getSalary());
                user.setPassword(authDto.getPassword());
                user.setActive(authDto.isActive());
                User save = authRepository.save(user);
                if (authDto.getRole()!=null){
                    companyUserRoleService.addCompanyUserRole(companyUserRole, save.getId(), authDto.getCompanyId(), authDto.getRole().getId());
                }else
                    companyUserRoleService.addCompanyUserRole(companyUserRole, save.getId(), authDto.getCompanyId(), roleRepository.findRoleByRoleName(RoleName.ROLE_USER).getId());
                return new ApiResponse("User saved", true);
            }
            return new ApiResponse("Password and PrePassword are not the same", false);
        }
        return new ApiResponse("User is all ready exist", false);
    }

    public ApiResponse deleteClient(UUID id) {
        authRepository.deleteById(id);
        return new ApiResponse("Successfully delete client", true);
    }

    public ApiResponse activeUser(UUID id) {
        User user = authRepository.findById(id).orElseThrow(() -> new ResourceAccessException("getUser"));
        user.setActive(!user.isActive());
        authRepository.save(user);
        return new ApiResponse("Successfully active", true);
    }

    public void editUserSalary(Double salary, User user) {
        user.setSalary(salary);
        authRepository.save(user);
    }


    public ResPageable getUserList(int page, int size) throws Exception {
        Page<User> allUser = authRepository.findAll(CommonUtils.getPageable(page, size));
        return new ResPageable(
                page,
                size,
                allUser.getTotalElements(),
                allUser.getTotalPages(),
                new ArrayList<>(allUser.getContent())
        );
    }

    public User getOneUser(UUID id) {
        return authRepository.findById(id).orElseThrow(() -> new ResourceAccessException("getUser"));
    }


    public List<User> getUser() {
        return authRepository.findAll();
    }


    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        return authRepository.findByPhoneNumberEquals(phoneNumber).orElseThrow(() -> new UsernameNotFoundException("getUser"));
    }

    public User getUserByToken(UUID id) {
        return authRepository.findById(id).orElseThrow(() -> new ResourceAccessException("getUser"));
    }
}
