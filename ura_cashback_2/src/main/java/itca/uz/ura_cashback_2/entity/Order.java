package itca.uz.ura_cashback_2.entity;

import itca.uz.ura_cashback_2.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "orders")
public class Order extends AbsEntity {//Javohir ,Asliddin  yoo mayyo shottayam nagli chopgansiladaa Akbar qani

    private Double cashback;

    private String comment;

    @ManyToOne
    private User client;

    private Double cash_price;

}
