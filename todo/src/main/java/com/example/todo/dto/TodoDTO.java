package com.example.todo.dto;

import java.time.LocalDateTime;

import com.example.todo.model.TodoEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TodoDTO {
	private String id;
	private String title;
	private String content; //���� �ʵ� �߰�
	private LocalDateTime deadline; //�Ⱓ �ʵ� �߰�
	private Integer star; //�߿䵵 �ʵ� �߰�
	private Integer priority; //�켱 ���� �ʵ�
	private boolean done;
	
	public TodoDTO(final TodoEntity entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.content = entity.getContent(); 
		this.deadline = entity.getDeadline(); //�Ⱓ �ʵ�
		this.star = entity.getStar(); //�߿䵵 �ʵ�
		this.priority = entity.getPriority(); //�켱 ���� �ʵ�
		this.done = entity.isDone();
	}
	public static TodoEntity toEntity(final TodoDTO dto) {
		return TodoEntity.builder()
						.id(dto.getId())
						.title(dto.getTitle())
						.content(dto.getContent()) //���� �ʵ� �߰�
						.deadline(dto.getDeadline()) //�Ⱓ �ʵ�
						.star(dto.getStar())
						.priority(dto.getPriority())
						.done(dto.isDone()).build();
	}
}
