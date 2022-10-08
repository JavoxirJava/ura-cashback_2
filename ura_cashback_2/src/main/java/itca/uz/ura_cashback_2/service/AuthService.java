package itca.uz.ura_cashback_2.service;

import itca.uz.ura_cashback_2.entity.Company;
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

    public ApiResponse registerClient(User user, AuthDto authDto){
        if (!authRepository.existsByPhoneNumberEqualsIgnoreCaseAndEmailEqualsIgnoreCase(authDto.getPhoneNumber(), authDto.getEmail())){
            if (authDto.getPassword().equals(authDto.getPrePassword())){
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



    public User getOneUser(UUID id){
        return authRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("getUser"));
    }

    public ApiResponse deleteCompany(UUID id){
        authRepository.deleteById(id);
        return new ApiResponse("User deleted", true);
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

    public List<Company> getUserCompany(UUID id) {
        return companyRepository.findByUserEquals(getOneUser(id));
    }

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        return authRepository.findByPhoneNumberEquals(phoneNumber).orElseThrow(() -> new UsernameNotFoundException("getUser"));
    }

    public UserDetails getUserById(UUID id) {
        return authRepository.findById(id).orElseThrow(() -> new ResourceAccessException("getUser"));
    }
}