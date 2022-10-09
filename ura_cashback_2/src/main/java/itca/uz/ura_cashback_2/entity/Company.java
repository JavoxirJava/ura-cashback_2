package itca.uz.ura_cashback_2.entity;

import itca.uz.ura_cashback_2.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Company extends AbsEntity { //Ozod Samandar
    @Column(nullable = false)
    private String name;

    private String bio;

    private String description;

        private Double percentage;

    @OneToOne
    private Attachment attachment;

    private boolean active;
}
