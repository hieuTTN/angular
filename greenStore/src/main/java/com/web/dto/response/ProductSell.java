package com.web.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.web.entity.Category;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

public interface ProductSell {

    public Long getId();

    public String getName();

    public Double getPrice();

    public Double getOldPrice();

    public String getImageBanner();

    public Integer getSoLuongBan();

    public Integer getQuantity();

}
