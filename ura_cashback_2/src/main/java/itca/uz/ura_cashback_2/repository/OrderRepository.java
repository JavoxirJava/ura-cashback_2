package itca.uz.ura_cashback_2.repository;

import itca.uz.ura_cashback_2.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {

    List<Order> findByKassirIdEquals(UUID kassirId);
}
