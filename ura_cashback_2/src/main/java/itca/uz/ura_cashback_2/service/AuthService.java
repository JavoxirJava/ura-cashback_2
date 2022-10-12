package itca.uz.ura_cashback_2.service;


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
import java.util.Collections;
import java.util.List;
import java.util.UUID;


@Service
public class AuthService implements UserDetailsService {

    final AuthRepository authRepository;
    final AttachmentRepository attachmentRepository;
    final CompanyRepository companyRepository;
    final RoleRepository roleRepository;


    public AuthService(AuthRepository authRepository, AttachmentRepository attachmentRepository, CompanyRepository companyRepository, RoleRepository roleRepository) {
        this.authRepository = authRepository;
        this.attachmentRepository = attachmentRepository;
        this.companyRepository = companyRepository;
        this.roleRepository = roleRepository;
    }

    public ApiResponse addOrEditRegisterClient(User user, AuthDto authDto) {
        if (!authRepository.existsByPhoneNumberEqualsIgnoreCaseAndEmailEqualsIgnoreCase(authDto.getPhoneNumber(), authDto.getEmail())) {
            if (authDto.getPassword().equals(authDto.getPrePassword())) {
                user.setFirstName(authDto.getFirstName());
                user.setLastName(authDto.getLastName());
                user.setPhoneNumber(authDto.getPhoneNumber());
                user.setEmail(authDto.getEmail());
                user.setPassword(authDto.getPassword());
                user.setRoles(Collections.singleton(roleRepository.findRoleByRoleName(RoleName.ROLE_USER)));
                authRepository.save(user);
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

    public ApiResponse editUserSalary(Double salary, User user) {
        try {
            user.setSalary(salary);
            authRepository.save(user);
            return new ApiResponse("successfully edit user salary", true);
        } catch (Exception e) {
            return new ApiResponse("error: " + e.getMessage(), false);
        }
    }


    public ResPageable getUserList(int page, int size, User user) throws Exception {
        Page<User> allUser = authRepository.findAll(CommonUtils.getPageable(page, size));
        return new ResPageable(
                page,
                size,
                allUser.getTotalElements(),
                allUser.getTotalPages(),
                new ArrayList<>(allUser.getContent())
        );
    }

//    public AuthDto getUser(User user){
//        return new AuthDto(
//                user.getId(),
//                user.getFirstName(),
//                user.getLastName(),
//                user.getPhoneNumber(),
//                user.getEmail(),
//                user.getSalary(),
//                user.getPassword(),
//                user.getCompany().stream().map(Company::getName).collect(Collectors.toList()),
//                user.getRoles().stream().map(Role::getRoleName).collect(Collectors.toList())
//        );
//    }


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
