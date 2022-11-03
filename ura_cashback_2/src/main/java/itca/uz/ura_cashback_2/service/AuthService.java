package itca.uz.ura_cashback_2.service;


import itca.uz.ura_cashback_2.entity.Company;
import itca.uz.ura_cashback_2.entity.Order;
import itca.uz.ura_cashback_2.entity.Role;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.entity.enums.RoleName;
import itca.uz.ura_cashback_2.payload.*;
import itca.uz.ura_cashback_2.repository.*;
import itca.uz.ura_cashback_2.utils.CommonUtils;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;


@Service
public class AuthService{

    final AuthRepository authRepository;
    final AttachmentRepository attachmentRepository;
    final CompanyRepository companyRepository;
    final RoleRepository roleRepository;
    final OrderRepository orderRepository;

    public AuthService(AuthRepository authRepository, AttachmentRepository attachmentRepository, CompanyRepository companyRepository, RoleRepository roleRepository,OrderRepository orderRepository) {
        this.authRepository = authRepository;
        this.attachmentRepository = attachmentRepository;
        this.companyRepository = companyRepository;
        this.roleRepository = roleRepository;
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
                    user.setCompanies(Collections.singletonList(companyRepository.findById(authDto.getCompanyId()).get()));
                    user.setRoles(Collections.singletonList(roleRepository.findRoleByRoleName(RoleName.ROLE_USER)));
                    authRepository.save(user);
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


    public UUID addOrEditCompanyAdmin(AuthDto authDto, User user){
        if (authDto.getPhoneNumber().length() == 13) {
            if (!authRepository.existsByPhoneNumberEqualsIgnoreCaseAndEmailEqualsIgnoreCase(authDto.getPhoneNumber(), authDto.getEmail())) {
                if (authDto.getPassword().equals(authDto.getPrePassword())) {
                    user.setFirstName(authDto.getFirstName());
                    user.setLastName(authDto.getLastName());
                    user.setPhoneNumber(authDto.getPhoneNumber());
                    user.setEmail(authDto.getEmail());
                    user.setPassword(authDto.getPassword());
                    User saveUser = authRepository.save(user);
                    return saveUser.getId();
                }
            }
        }
        return null;
    }

    public User addOrEditKassa(User user,AuthDto authDto) {
        if (authDto.getPhoneNumber().length() == 13) {
            if (!authRepository.existsByPhoneNumberEqualsIgnoreCaseAndEmailEqualsIgnoreCase(authDto.getPhoneNumber(), authDto.getEmail())) {
                if (authDto.getPassword().equals(authDto.getPrePassword())) {
                    user.setFirstName(authDto.getFirstName());
                    user.setLastName(authDto.getLastName());
                    user.setPhoneNumber(authDto.getPhoneNumber());
                    user.setEmail(authDto.getEmail());
                    user.setPassword(authDto.getPassword());
                    User save = authRepository.save(user);

                    CompanyUserRole companyUserRole;
                    if(authDto.getId() == null) {
                        companyUserRole = new CompanyUserRole();
                    }else {
                        companyUserRole = companyUserRoleRepository.findByUserIdEquals(authDto.getId());
                    }
                    companyUserRole.setCompanyId(authDto.getCompanyId());
                    companyUserRole.setRoleId(roleRepository.findRoleByRoleName(RoleName.ROLE_KASSA).getId());
                    companyUserRole.setUserId(save.getId());
                    companyUserRoleRepository.save(companyUserRole);
                    return save;
                    user.setCompanies(Collections.singletonList(companyRepository.findById(authDto.getCompanyId()).get()));
                    user.setRoles(Collections.singletonList(roleRepository.findRoleByRoleName(RoleName.ROLE_KASSA)));
                    return authRepository.save(user);
                }
            }
        }
        return null;
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

    public UUID companyLogin(ReqLogin reqLogin){
        User user = authRepository.findByPhoneNumberEqualsAndPasswordEquals(reqLogin.getPhoneNumber(), reqLogin.getPassword());
        CompanyUserRole companyUserRole = companyUserRoleRepository.findByUserIdEqualsAndRoleIdEquals(user.getId(), roleRepository.findRoleByRoleName(RoleName.ROLE_ADMIN).getId());
        Company company = companyRepository.findByIdEquals(companyUserRole.getCompanyId());
        if(company.isActive()){
            return company.getId();
        }
            return null;
    }


    public CompanyDto loginCompany(ReqLogin reqLogin){
        CompanyDto companyDto = new CompanyDto();
        User user = authRepository.findByPhoneNumberEqualsAndPasswordEquals(reqLogin.getPhoneNumber(), reqLogin.getPassword());
        CompanyUserRole companyUserRole = companyUserRoleRepository.findByUserIdEquals(user.getId());
        Role role = roleRepository.findByIdEquals(companyUserRole.getRoleId());
        Company company = companyRepository.findByIdEquals(companyUserRole.getCompanyId());
        if(company.isActive()) {
            if (role.getRoleName().equals(RoleName.ROLE_ADMIN) || role.getRoleName().equals(RoleName.ROLE_KASSA)) {
                companyDto.setId(company.getId());
                companyDto.setName(company.getName());
                companyDto.setBio(company.getBio());
                companyDto.setDescription(company.getDescription());
                companyDto.setAttachmentId(company.getAttachment().getId());
                companyDto.setUser(user);
                List<User> kassaList = new ArrayList<>();
                List<User> clintList = new ArrayList<>();
                List<OrderDto> orderList = new ArrayList<>();
                for (CompanyUserRole companyUserRole1 : companyUserRoleRepository.findByCompanyIdEqualsAndRoleIdEquals(company.getId(), roleRepository.findRoleByRoleName(RoleName.ROLE_KASSA).getId())) {
                    User kassa = authRepository.findByIdEquals(companyUserRole1.getUserId());
                    for (Order orders : orderRepository.findByCreatedByEquals(kassa.getId())) {
                        OrderDto orderDto = new OrderDto();
                        orderDto.setId(orders.getId());
                        orderDto.setCreatedBy(orders.getCreatedBy());
                        orderDto.setAdmin(authRepository.findById(orders.getCreatedBy()).get());
                        orderDto.setClient(orders.getClient());
                        orderDto.setCashback(orders.getCashback());
                        orderDto.setCash_price(orders.getCash_price());
                        orderList.add(orderDto);
    public CompanyDto loginCompany(ReqLogin reqLogin) {
        CompanyDto companyDto = new CompanyDto();
        User user = authRepository.findByPhoneNumberEqualsAndPasswordEquals(reqLogin.getPhoneNumber(), reqLogin.getPassword());
        for (Company company : user.getCompanies()) {
            for (Role role : user.getRoles()) {
                if(role.getId().equals(roleRepository.findRoleByRoleName(RoleName.ROLE_ADMIN).getId())){
                    companyDto.setId(company.getId());
                    companyDto.setName(company.getName());
                    companyDto.setBio(company.getBio());
                    companyDto.setDescription(company.getDescription());
                    companyDto.setClintPercentage(company.getClientPercentage());
                    companyDto.setAttachment(company.getAttachment());
                    companyDto.setUser(user);
                    List<User> kassaList = new ArrayList<>();
                    List<User> clintList = new ArrayList<>();
                    List<OrderDto> orderList = new ArrayList<>();
                    for (User admin : authRepository.findAll()) {
                        for (Company userCompany : admin.getCompanies()) {
                            if (userCompany.equals(company)) {
                                for(Role role1 : admin.getRoles()) {
                                    if (role1.getId().equals(roleRepository.findRoleByRoleName(RoleName.ROLE_ADMIN).getId())){
                                        for (Order order : orderRepository.findByKassirIdEquals(admin.getId())) {
                                            OrderDto orderDto = new OrderDto();
                                            orderDto.setId(order.getId());
                                            orderDto.setCreatedBy(order.getCreatedBy());
                                            orderDto.setAdmin(authRepository.findById(order.getKassir().getId()).get());
                                            orderDto.setClient(order.getClient());
                                            orderDto.setCashback(order.getCashback());
                                            orderDto.setCash_price(order.getCash_price());
                                            orderList.add(orderDto);
                                        }
                                        kassaList.add(admin);
                                    }
                                }
                                for(Role role2: admin.getRoles()) {
                                    if (role2.getId().equals(roleRepository.findRoleByRoleName(RoleName.ROLE_KASSA).getId())) {
                                        for (Order order : orderRepository.findByKassirIdEquals(admin.getId())) {
                                            OrderDto orderDto = new OrderDto();
                                            orderDto.setId(order.getId());
                                            orderDto.setCreatedBy(order.getCreatedBy());
                                            orderDto.setAdmin(authRepository.findById(order.getKassir().getId()).get());
                                            orderDto.setClient(order.getClient());
                                            orderDto.setCashback(order.getCashback());
                                            orderDto.setCash_price(order.getCash_price());
                                            orderList.add(orderDto);
                                        }
                                        kassaList.add(admin);
                                    }
                                }
                                for(Role role3 : admin.getRoles()) {
                                    if (role3.getId().equals(roleRepository.findRoleByRoleName(RoleName.ROLE_USER).getId())) {
                                        clintList.add(admin);
                                    }
                                }
                            }
                        }
                    }
                    companyDto.setClint(clintList);
                    companyDto.setKassa(kassaList);
                    companyDto.setOrders(orderList);
                    return companyDto;
                }
            }
        }
        return null;
    }

//    public List<User> companyKassa(UUID id){
//        List<User> userList = new ArrayList<>();
//        return userList;
//    }

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
        for(Role role : superAdmin.getRoles()) {
            if (role.getId().equals(roleRepository.findRoleByRoleName(RoleName.ROLE_SUPER_ADMIN).getId())) {
                return new ApiResponse("SuperAdmin already exist", true);
            }
        }
        return new ApiResponse("SuperAdmin not found", false);
    }

    public User getUserByToken(UUID id){
        return authRepository.findById(id).orElseThrow(()-> new ResourceAccessException("getUser"));
    }
}