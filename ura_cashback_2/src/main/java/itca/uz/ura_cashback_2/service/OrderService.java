package itca.uz.ura_cashback_2.service;

import itca.uz.ura_cashback_2.entity.Company;
import itca.uz.ura_cashback_2.entity.Order;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.entity.enums.RoleName;
import itca.uz.ura_cashback_2.payload.ApiResponse;
import itca.uz.ura_cashback_2.payload.LoginDto;
import itca.uz.ura_cashback_2.payload.OrderDto;
import itca.uz.ura_cashback_2.repository.AuthRepository;
import itca.uz.ura_cashback_2.repository.CompanyRepository;
import itca.uz.ura_cashback_2.repository.OrderRepository;
import itca.uz.ura_cashback_2.repository.RoleRepository;
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

    public OrderService(OrderRepository orderRepository, AuthRepository authRepository, CompanyRepository companyRepository,
                        CompanyUserRoleService companyUserRoleService, RoleRepository roleRepository, AuthService authService) {
        this.orderRepository = orderRepository;
        this.authRepository = authRepository;
        this.companyRepository = companyRepository;
        this.companyUserRoleService = companyUserRoleService;
        this.roleRepository = roleRepository;
        this.authService = authService;
    }

    public ApiResponse addOrder(Order order, OrderDto orderDto) {
        User getUserClient = authService.getOneUser(orderDto.getClientId());
        User getUserAdmin = authService.getOneUser(orderDto.getAdminId());
        Company getCompany = companyUserRoleService.getCompanyFindByUser(getUserAdmin.getId(), roleRepository.findRoleByRoleName(RoleName.ROLE_ADMIN).getId());
        if (orderDto.getCash_price() > 0 && orderDto.getCashback() <= getUserAdmin.getSalary()) {
            authService.editUserSalary(orderDto.getCash_price() * getCompany.getKasserPercentage() / 100, getUserAdmin);
            authService.editUserSalary(orderDto.getCash_price() < 0
                    ? getUserClient.getSalary() - orderDto.getCashback()
                    : orderDto.getCash_price() * getCompany.getClientPercentage() / 100 - orderDto.getCashback(), getUserClient);
        } else return new ApiResponse("There are not enough funds in your Cashback account", false);
        order.setCashback(orderDto.getCashback());
        order.setComment(orderDto.getComment());
        order.setClient(getUserClient);
        order.setCash_price(orderDto.getCash_price());
        order.setCreatedBy(getUserAdmin.getId());
        orderRepository.save(order);
        return new ApiResponse("successfully saved order", true);
    }

    public User login(LoginDto loginDto) {
        return authRepository.findByPhoneNumberEqualsAndPasswordEquals
                (loginDto.getPhoneNumber(), loginDto.getPassword());
    }

    public Order getOneOrder(UUID id) {
        return orderRepository.findById(id).orElseThrow(() -> new ResourceAccessException("getOrder"));
    }

    public List<Order> getOrderList() {
        return orderRepository.findAll();
    }

    public ApiResponse deleteOrder(UUID orderId) {
        orderRepository.deleteById(orderId);
        return new ApiResponse("successfully deleted Order", true);
    }
}
