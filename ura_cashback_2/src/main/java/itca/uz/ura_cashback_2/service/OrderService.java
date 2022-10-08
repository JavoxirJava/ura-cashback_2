package itca.uz.ura_cashback_2.service;

import itca.uz.ura_cashback_2.entity.Company;
import itca.uz.ura_cashback_2.entity.Order;
import itca.uz.ura_cashback_2.entity.User;
import itca.uz.ura_cashback_2.payload.ApiResponse;
import itca.uz.ura_cashback_2.payload.OrderDto;
import itca.uz.ura_cashback_2.repository.AuthRepository;
import itca.uz.ura_cashback_2.repository.CompanyRepository;
import itca.uz.ura_cashback_2.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    final OrderRepository orderRepository;
    final AuthRepository authRepository;
    final CompanyRepository companyRepository;

    public OrderService(OrderRepository orderRepository, AuthRepository authRepository, CompanyRepository companyRepository) {
        this.orderRepository = orderRepository;
        this.authRepository = authRepository;
        this.companyRepository = companyRepository;
    }

    public ApiResponse addOrder(Order order, OrderDto orderDto) {
        User oneUser = getOneUser(orderDto.getClientId());
        if (oneUser.getSalary() >= orderDto.getCashback()) {
//            Double percentage = getOneCompany(orderDto.getId()).getPercentage();
            order.setClient(oneUser);
            order.setComment(orderDto.getComment());
            order.setCash_price(orderDto.getCash_price());
//        order.setCashback(orderDto.getCash_price() * percentage / 100);
            order.setCashback(orderDto.getCashback());
            orderRepository.save(order);
            return new ApiResponse("successfully saved Order", true);
        }
        return new ApiResponse("Not exist in the your cashback", false);
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

    public Company getOneCompany(UUID id) {
        return companyRepository.findById(id).orElseThrow(() -> new ResourceAccessException("getCompany"));
    }

    public User getOneUser(UUID id) {
        return authRepository.findById(id).orElseThrow(() -> new ResourceAccessException("getUser"));
    }


}

