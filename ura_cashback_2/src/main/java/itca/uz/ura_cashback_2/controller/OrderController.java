package itca.uz.ura_cashback_2.controller;

import itca.uz.ura_cashback_2.entity.Order;
import itca.uz.ura_cashback_2.payload.ApiResponse;
import itca.uz.ura_cashback_2.payload.OrderDto;
import itca.uz.ura_cashback_2.payload.ReqLogin;
import itca.uz.ura_cashback_2.service.OrderService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/order")
public class OrderController {
    final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    @GetMapping("/list")
    public HttpEntity<?> getOrderList() {
        return ResponseEntity.ok(orderService.getOrderList());
    }

//    @GetMapping("/{id}")
//    public HttpEntity<?> getOrderFindByUser(@PathVariable UUID id) {
//        return ResponseEntity.ok(orderService.getFindByUser(id));
//    }

    @PostMapping
    public HttpEntity<?> addOrder(@RequestBody OrderDto orderDto) {
        ApiResponse apiResponse = orderService.addOrder(new Order(), orderDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT).body(apiResponse);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editOrder(@PathVariable UUID id, @RequestBody OrderDto orderDto) {
        ApiResponse apiResponse = orderService.addOrder(orderService.getOneOrder(id), orderDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteOrder(@PathVariable UUID id) {
        return ResponseEntity.ok(orderService.deleteOrder(id));
    }


    @PutMapping("/login")
    public HttpEntity<?> isLogin(@RequestBody ReqLogin loginDto) {
        return ResponseEntity.ok(orderService.login(loginDto));
    }

}
