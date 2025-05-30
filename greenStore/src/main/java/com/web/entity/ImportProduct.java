package com.web.entity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;

@Entity
@Table(name = "import_product")
@Getter
@Setter
public class ImportProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private Date importDate;

    private Time importTime;

    private Integer quantity;

    private Double importPrice;

    private String description;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
