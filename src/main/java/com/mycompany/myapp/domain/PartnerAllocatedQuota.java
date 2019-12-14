package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A PartnerAllocatedQuota.
 */
@Entity
@Table(name = "partner_allocated_quota")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PartnerAllocatedQuota implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "partner_order_id")
    private Integer partnerOrderId;

    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @ManyToOne
    @JsonIgnoreProperties("partnerAllocatedQuotas")
    private Product productDetails;

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private PartnerOrder partnerOrder;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPartnerOrderId() {
        return partnerOrderId;
    }

    public PartnerAllocatedQuota partnerOrderId(Integer partnerOrderId) {
        this.partnerOrderId = partnerOrderId;
        return this;
    }

    public void setPartnerOrderId(Integer partnerOrderId) {
        this.partnerOrderId = partnerOrderId;
    }

    public Integer getProductId() {
        return productId;
    }

    public PartnerAllocatedQuota productId(Integer productId) {
        this.productId = productId;
        return this;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public PartnerAllocatedQuota quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public PartnerAllocatedQuota startDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public PartnerAllocatedQuota expiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
        return this;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Product getProductDetails() {
        return productDetails;
    }

    public PartnerAllocatedQuota productDetails(Product product) {
        this.productDetails = product;
        return this;
    }

    public void setProductDetails(Product product) {
        this.productDetails = product;
    }

    public PartnerOrder getPartnerOrder() {
        return partnerOrder;
    }

    public PartnerAllocatedQuota partnerOrder(PartnerOrder partnerOrder) {
        this.partnerOrder = partnerOrder;
        return this;
    }

    public void setPartnerOrder(PartnerOrder partnerOrder) {
        this.partnerOrder = partnerOrder;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PartnerAllocatedQuota)) {
            return false;
        }
        return id != null && id.equals(((PartnerAllocatedQuota) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PartnerAllocatedQuota{" +
            "id=" + getId() +
            ", partnerOrderId=" + getPartnerOrderId() +
            ", productId=" + getProductId() +
            ", quantity=" + getQuantity() +
            ", startDate='" + getStartDate() + "'" +
            ", expiryDate='" + getExpiryDate() + "'" +
            "}";
    }
}
