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
import java.util.Optional;
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

    public void addEditShort(OrderDto orderDto, Order order){
        //            Double percentage = getOneCompany(orderDto.getId()).getPercentage();
        User oneUser = getOneUser(orderDto.getClientId());

        order.setClient(oneUser);
        order.setComment(orderDto.getComment());
        order.setCash_price(orderDto.getCash_price());
//        order.setCashback(orderDto.getCash_price() * percentage / 100);
        order.setCashback(orderDto.getCashback());
        orderRepository.save(order);

    }

    public ApiResponse addOrder(OrderDto orderDto) {
        User oneUser = getOneUser(orderDto.getClientId());
        if (oneUser.getSalary() >= orderDto.getCashback()) {
            Order order = new Order();
            addEditShort(orderDto, order);
            return new ApiResponse("successfully saved Order", true);
        }
        return new ApiResponse("Not exist in the your cashback", false);
    }  public ApiResponse editOrder(UUID id, OrderDto orderDto) {
        Optional<Order> orderById = orderRepository.findById(id);
        if (orderById.isPresent()) {
                addEditShort(orderDto, orderById.get());
                return new ApiResponse("successfully edit order", true);
        }
        return new ApiResponse("order not found", false);
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

