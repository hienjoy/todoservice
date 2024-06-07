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
	private String content; //내용 필드 추가
	private LocalDateTime deadline; //기간 필드 추가
	private boolean done;
	
	public TodoDTO(final TodoEntity entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.content = entity.getContent(); 
		this.deadline = entity.getDeadline(); //기간 필드
		this.done = entity.isDone();
	}
	public static TodoEntity toEntity(final TodoDTO dto) {
		return TodoEntity.builder()
						.id(dto.getId())
						.title(dto.getTitle())
						.content(dto.getContent()) //내용 필드 추가
						.deadline(dto.getDeadline()) //기간 필드
						.done(dto.isDone()).build();
	}
}
