package itca.uz.ura_cashback_2.service;


import itca.uz.ura_cashback_2.entity.*;
import itca.uz.ura_cashback_2.entity.enums.RoleName;
import itca.uz.ura_cashback_2.payload.*;
import itca.uz.ura_cashback_2.repository.*;
import itca.uz.ura_cashback_2.utils.CommonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
public class AuthService{

    final AuthRepository authRepository;
    final AttachmentRepository attachmentRepository;
    final CompanyRepository companyRepository;
    final RoleRepository roleRepository;
    final CompanyUserRoleRepository companyUserRoleRepository;
    final OrderRepository orderRepository;

    public AuthService(AuthRepository authRepository, AttachmentRepository attachmentRepository, CompanyRepository companyRepository, RoleRepository roleRepository, CompanyUserRoleRepository companyUserRoleRepository, OrderRepository orderRepository) {
        this.authRepository = authRepository;
        this.attachmentRepository = attachmentRepository;
        this.companyRepository = companyRepository;
        this.roleRepository = roleRepository;
        this.companyUserRoleRepository = companyUserRoleRepository;
        this.orderRepository = orderRepository;
    }

    public ApiResponse addOrEditRegisterClient(User user,AuthDto authDto) {
        if (authDto.getPhoneNumber().length() == 13) {
            if (!authRepository.existsByPhoneNumberEqualsIgnoreCaseAndEmailEqualsIgnoreCase(authDto.getPhoneNumber(), authDto.getEmail())) {
                if (authDto.getPassword().equals(authDto.getPrePassword())) {
                    user.setFirstName(authDto.getFirstName());
                    user.setLastName(authDto.getLastName());
                    user.setPhoneNumber(authDto.getPhoneNumber());
                    user.setEmail(authDto.getEmail());
                    user.setPassword(authDto.getPassword());
                    user.setSalary(0.0);
                    User save = authRepository.save(user);

                    CompanyUserRole companyUserRole = new CompanyUserRole();
                    companyUserRole.setCompanyId(authDto.getCompanyId());
                    companyUserRole.setRoleId(roleRepository.findRoleByRoleName(RoleName.ROLE_USER).getId());
                    companyUserRole.setUserId(save.getId());
                    companyUserRoleRepository.save(companyUserRole);

                    return new ApiResponse("User saved", true);
                }
                return new ApiResponse("Password and PrePassword are not the same", false);
            }
            return new ApiResponse("User is all ready exist", false);
        }
        return new ApiResponse("Phone number error",false);
    }

    public ApiResponse deleteClient(UUID id) {
        authRepository.deleteById(id);
        return new ApiResponse("Successfully delete client", true);
    }


    public ApiResponse addOrEditCompanyAdmin(AuthDto authDto, User user){
        if (authDto.getPhoneNumber().length() == 13) {
            if (!authRepository.existsByPhoneNumberEqualsIgnoreCaseAndEmailEqualsIgnoreCase(authDto.getPhoneNumber(), authDto.getEmail())) {
                if (authDto.getPassword().equals(authDto.getPrePassword())) {
                    user.setFirstName(authDto.getFirstName());
                    user.setLastName(authDto.getLastName());
                    user.setPhoneNumber(authDto.getPhoneNumber());
                    user.setEmail(authDto.getEmail());
                    user.setPassword(authDto.getPassword());
                    User saveUser = authRepository.save(user);

                    CompanyUserRole companyUserRole = new CompanyUserRole();
                    companyUserRole.setCompanyId(authDto.getCompanyId());
                    companyUserRole.setRoleId(roleRepository.findRoleByRoleName(RoleName.ROLE_ADMIN).getId());
                    companyUserRole.setUserId(saveUser.getId());
                    companyUserRoleRepository.save(companyUserRole);
                    return new ApiResponse("User saqlandi", true);
                }
                return new ApiResponse("password and prePassword equals", false);
            }
        }
        return new ApiResponse("Phone number length not equals", false);
    }

    public ApiResponse addOrEditKassa(User user,AuthDto authDto) {
        if (authDto.getPhoneNumber().length() == 13) {
            if (!authRepository.existsByPhoneNumberEqualsIgnoreCaseAndEmailEqualsIgnoreCase(authDto.getPhoneNumber(), authDto.getEmail())) {
                if (authDto.getPassword().equals(authDto.getPrePassword())) {
                    user.setFirstName(authDto.getFirstName());
                    user.setLastName(authDto.getLastName());
                    user.setPhoneNumber(authDto.getPhoneNumber());
                    user.setEmail(authDto.getEmail());
                    user.setPassword(authDto.getPassword());
                    User save = authRepository.save(user);

                    CompanyUserRole companyUserRole = new CompanyUserRole();
                    companyUserRole.setCompanyId(authDto.getCompanyId());
                    companyUserRole.setRoleId(roleRepository.findRoleByRoleName(RoleName.ROLE_KASSA).getId());
                    companyUserRole.setUserId(save.getId());
                    companyUserRoleRepository.save(companyUserRole);

                    return new ApiResponse("Kassa saved", true);
                }
                return new ApiResponse("Password and PrePassword are not the same", false);
            }
            return new ApiResponse("User is all ready exist", false);
        }
        return new ApiResponse("Phone number error",false);
    }
    public ApiResponse activeUser(UUID id){
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

    public User findByPhoneNumber(String phoneNumber) {
        return authRepository.findByPhoneNumberEquals(phoneNumber);
    }


    public CompanyDto loginCompany(ReqLogin reqLogin){
        CompanyDto companyDto = new CompanyDto();
        User user = authRepository.findByPhoneNumberEqualsAndPasswordEquals(reqLogin.getPhoneNumber(), reqLogin.getPassword());
        CompanyUserRole companyUserRole = companyUserRoleRepository.findByUserIdEquals(user.getId());
        Role role = roleRepository.findByIdEquals(companyUserRole.getRoleId());
        if (role.getRoleName().equals(RoleName.ROLE_ADMIN)){
            Company company = companyRepository.findByIdEquals(companyUserRole.getCompanyId());
            companyDto.setId(company.getId());
            companyDto.setName(company.getName());
            companyDto.setBio(company.getBio());
            companyDto.setDescription(company.getDescription());
            companyDto.setAttachmentId(company.getAttachment().getId());
            companyDto.setUser(user);
            List<User> kassaList = new ArrayList<>();
            List<User> clintList = new ArrayList<>();
            List<OrderDto> orderList = new ArrayList<>();
            for (CompanyUserRole companyUserRole1 : companyUserRoleRepository.findByCompanyIdEqualsAndRoleIdEquals(company.getId(), roleRepository.findRoleByRoleName(RoleName.ROLE_ADMIN).getId())) {
                User admin = authRepository.findByIdEquals(companyUserRole1.getUserId());
                for(Order orders :orderRepository.findByCreatedByEquals(admin.getId())){
                    OrderDto orderDto = new OrderDto();
                    orderDto.setAdmin(authRepository.findById(orders.getCreatedBy()).get());
                    orderDto.setClient(orders.getClient());
                    orderDto.setCashback(orders.getCashback());
                    orderDto.setCash_price(orders.getCash_price());
                    orderList.add(orderDto);
                }
                kassaList.add(admin);
            }
            for (CompanyUserRole companyUserRole1 : companyUserRoleRepository.findByCompanyIdEqualsAndRoleIdEquals(company.getId(), roleRepository.findRoleByRoleName(RoleName.ROLE_KASSA).getId())) {
                User kassa = authRepository.findByIdEquals(companyUserRole1.getUserId());
                for(Order orders :orderRepository.findByCreatedByEquals(kassa.getId())){
                    OrderDto orderDto = new OrderDto();
                    orderDto.setAdmin(authRepository.findById(orders.getCreatedBy()).get());
                    orderDto.setClient(orders.getClient());
                    orderDto.setCashback(orders.getCashback());
                    orderDto.setCash_price(orders.getCash_price());
                    orderList.add(orderDto);
                }
                kassaList.add(kassa);
            }
            for (CompanyUserRole companyUserRole2 : companyUserRoleRepository.findByCompanyIdEqualsAndRoleIdEquals(company.getId(), roleRepository.findRoleByRoleName(RoleName.ROLE_USER).getId())) {
                User clint = authRepository.findByIdEquals(companyUserRole2.getUserId());
                clintList.add(clint);
            }
            companyDto.setKassa(kassaList);
            companyDto.setClint(clintList);
            companyDto.setOrders(orderList);
            return companyDto;
        }
        return null;
    }

    public ApiResponse editPassword(ReqPassword reqPassword){
        User user = authRepository.findByIdEquals(reqPassword.getUserId());
        if (user.getPassword().equals(reqPassword.getJoriyPassword())){
            if (reqPassword.getPassword().equals(reqPassword.getPrePassword())){
                user.setPassword(reqPassword.getPassword());
                authRepository.save(user);
                return new ApiResponse("SuccessFully", true);
            }
            return new ApiResponse("password and prePassword equals", false);
        }
        return new ApiResponse("Password not found", false);
    }

    public ApiResponse loginSuperAdmin(ReqLogin reqLogin){
        User superAdmin = authRepository.findByPhoneNumberEqualsAndPasswordEquals(reqLogin.getPhoneNumber(), reqLogin.getPassword());
        CompanyUserRole companyUserRole = companyUserRoleRepository.findByUserIdEqualsAndRoleIdEquals(superAdmin.getId(), roleRepository.findRoleByRoleName(RoleName.ROLE_SUPER_ADMIN).getId());
        Role role = roleRepository.findByIdEquals(companyUserRole.getRoleId());
        if (role.getRoleName().equals(RoleName.ROLE_SUPER_ADMIN)){
            return new ApiResponse("success", true);
        }
        return new ApiResponse("Super admin not found", false);
    }
}
