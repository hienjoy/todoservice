package com.example.todo.model;

import java.time.LocalDateTime;

//import javax.persistence.Entity;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name ="Todo")
public class TodoEntity {
	@Id
	@GeneratedValue(generator="system-uuid")
	@GenericGenerator(name="system-uuid",strategy="uuid")
	private String id;
	private String userId;
	private String title;
	private String content; //���� �ʵ� �߰�
	private LocalDateTime deadline; //�Ⱓ �ʵ� �߰�
	private Integer star; //�߿䵵 �ʵ� �߰�
	private Integer priority; //�켱���� �ʵ� �߰�
	private boolean done;
}