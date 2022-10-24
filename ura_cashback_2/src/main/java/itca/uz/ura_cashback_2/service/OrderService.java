package itca.uz.ura_cashback_2.service;

import itca.uz.ura_cashback_2.entity.Company;
import itca.uz.ura_cashback_2.entity.CompanyUserRole;
import itca.uz.ura_cashback_2.entity.Order;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.entity.enums.RoleName;
import itca.uz.ura_cashback_2.payload.ApiResponse;
import itca.uz.ura_cashback_2.payload.OrderDto;
import itca.uz.ura_cashback_2.payload.ReqLogin;
import itca.uz.ura_cashback_2.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    final OrderRepository orderRepository;
    final AuthRepository authRepository;
    final CompanyRepository companyRepository;
    final CompanyUserRoleService companyUserRoleService;
    final RoleRepository roleRepository;
    final AuthService authService;
    final CompanyUserRoleRepository companyUserRoleRepository;

    public OrderService(OrderRepository orderRepository, AuthRepository authRepository, CompanyRepository companyRepository,
                        CompanyUserRoleService companyUserRoleService, RoleRepository roleRepository, AuthService authService, CompanyUserRoleRepository companyUserRoleRepository) {
        this.orderRepository = orderRepository;
        this.authRepository = authRepository;
        this.companyRepository = companyRepository;
        this.companyUserRoleService = companyUserRoleService;
        this.roleRepository = roleRepository;
        this.authService = authService;
        this.companyUserRoleRepository = companyUserRoleRepository;
    }

    public ApiResponse addOrder(Order order, OrderDto orderDto) {
        double cashback = 0, cash_price = 0;
        User getUserClient = authService.getOneUser(orderDto.getClientId());
        User getUserAdmin = authService.getOneUser(orderDto.getAdminId());
        Company getCompany = companyUserRoleService.getCompanyFindByUser(getUserAdmin.getId(), roleRepository.findRoleByRoleName(RoleName.ROLE_ADMIN).getId());
        if (orderDto.getCashback() != null) cashback = orderDto.getCashback();
        if (orderDto.getCash_price() != null) cash_price = orderDto.getCash_price();
        if (cashback <= getUserClient.getSalary()) {
            if(cashback == 0){
                order.setCashback(((cash_price / 100) * getCompany.getClientPercentage()));
                authService.editUserSalary(getUserClient.getSalary() + ((cash_price / 100) * getCompany.getClientPercentage()),getUserClient);
            }else {
                order.setCashback(((cash_price / 100) * getCompany.getClientPercentage()));
                authService.editUserSalary((getUserClient.getSalary() - cashback) +(((cash_price / 100) * getCompany.getClientPercentage())) ,getUserClient);
            }
        } else return new ApiResponse("There are not enough funds in your Cashback account", false);
        order.setClient(getUserClient);
        order.setCash_price(cash_price);
        order.setCreatedBy(getUserAdmin.getId());
        orderRepository.save(order);
        return new ApiResponse("successfully saved order", true);
    }

    public User login(ReqLogin loginDto) {
        User getUser = authRepository.findByPhoneNumberEqualsAndPasswordEquals(loginDto.getPhoneNumber(), loginDto.getPassword());
        CompanyUserRole companyUserRole = companyUserRoleRepository.findByUserIdEqualsAndRoleIdEquals(getUser.getId(), roleRepository.findRoleByRoleName(RoleName.ROLE_ADMIN).getId());
        if(companyUserRole.getCompanyId().equals(loginDto.getCompanyId())){
            if (companyUserRole.getId() != null) return getUser;
            return null;
        }
        return null;
    }

    public Order getOneOrder(UUID id) {
        return orderRepository.findById(id).orElseThrow(() -> new ResourceAccessException("getOrder"));
    }

    public List<Order> getFindByUser(UUID userId) {
        return orderRepository.findByCreatedByEquals(userId);
    }

    public List<Order> getOrderList() {
        return orderRepository.findAll();
    }

    public ApiResponse deleteOrder(UUID orderId) {
        orderRepository.deleteById(orderId);
        return new ApiResponse("successfully deleted Order", true);
    }
}
