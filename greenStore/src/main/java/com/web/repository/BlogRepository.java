package com.web.repository;

import com.web.entity.Blog;
import com.web.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog,Long> {

}
