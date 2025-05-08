package com.web.repository;

import com.web.entity.Category;
import com.web.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {


    @Query("select p from Product p where p.id = ?1 and p.deleted <> true")
    public Optional<Product> findById(Long id);

    @Query("select p from Product p where p.deleted <> true")
    public Page<Product> findAll(Pageable pageable);

    @Query("select p from Product p where p.deleted <> true")
    public List<Product> findAll();

    @Query("select p from Product p where p.name like ?1 and p.deleted <> true")
    public Page<Product> findAllByParam(String param, Pageable pageable);

    @Query("select p from Product p where p.name like ?1 and p.category.id = ?2 and p.deleted <> true")
    Page<Product> findByParamAndCate(String s, Long categoryId, Pageable pageable);

    @Query("select p from Product p where p.category.id= ?1 and p.id <> ?2 and p.deleted <> true")
    public List<Product> findByCategoryAndId(Long categoryId, Long id);

    @Query("select p from Product p where p.category.id= ?1 and p.deleted <> true")
    public Page<Product> findByCategory(Long categoryId, Pageable pageable);

    @Query("select p from Product p where p.category.id= ?1 and p.deleted <> true")
    public List<Product> findByCategory(Long categoryId);

    @Query("select p from Product p where p.name like ?1 or p.category.name like ?1 and p.deleted <> true")
    public Page<Product> findByParam(String param, Pageable pageable);

    @Query("select p from Product p where (p.name like ?1 or p.category.name like ?1) and p.price >= ?2 and p.price <= ?3 and p.deleted <> true")
    public Page<Product> searchFull(String param, Double small, Double large, Pageable pageable);

    @Query("select p from Product p where (p.name like ?1 or p.category.name like ?1) and p.price >= ?2 and p.price <= ?3 and p.category.id = ?4 and p.deleted <> true")
    public Page<Product> searchFull(String param, Double small, Double large, Long cate, Pageable pageable);

    @Query(value = "select p.* from product p where p.deleted != true order by p.quantity_sold desc limit 5", nativeQuery = true)
    public List<Product> sanPhamBanChay();

    @Query(value = "select p from Product p where p.deleted <> true order by p.quantitySold desc")
    public Page<Product> sanPhamBanChay(Pageable pageable);

    @Query(value = "select p from Product p where p.deleted <> true order by p.id desc")
    public Page<Product> sanPhamMoi(Pageable pageable);

    @Query("select p from Product p where p.deleted <> true and p.oldPrice is not null and p.oldPrice > 0 order by (p.oldPrice - p.price)/p.oldPrice*100 desc")
    public Page<Product> sanPhamKhuyenMai(Pageable pageable);
}
