import React from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import TodoModal from "./Functions/TodoModal";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      tempItem: { ...props.item },
      readOnly: true,
      open: false, // 모달 창 열림 여부
      originalItem: { ...props.item },
    };
    this.delete = props.delete;
    this.update = props.update;
  }

  deleteEventHandler = () => {
    this.delete(this.state.item);
  };

  editEventHandler = (e) => {
    const thisItem = this.state.tempItem;
    thisItem[e.target.name] = e.target.value;
    this.setState({ tempItem: thisItem });
  };

  checkboxEventHandler = (e) => {
    const done = !this.state.item.done;
    this.setState(
      {
        item: { ...this.state.item, done },
        tempItem: { ...this.state.tempItem, done },
      },
      () => {
        this.update(this.state.item);
      }
    );
  };

  handleOpen = () => {
    this.setState({
      open: true,
      originalItem: { ...this.state.item },
      tempItem: { ...this.state.item },
    });
  };

  handleClose = () => {
    if (!this.state.readOnly) {
      const confirmClose = window.confirm("수정하시겠습니까?");
      if (confirmClose) {
        this.setState(
          { item: { ...this.state.tempItem }, readOnly: true },
          () => {
            this.update(this.state.tempItem);
          }
        );
      } else {
        this.setState({
          tempItem: { ...this.state.originalItem },
          readOnly: true,
        });
      }
    }
    this.setState({ open: false });
  };

  handleSave = (updatedItem) => {
    this.setState({ item: updatedItem });
  };

  render() {
    const item = this.state.item;
    return (
      <>
        <ListItem
          style={{
            cursor: "pointer",
            minHeight: "5em",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
          <ListItemText
            primary={
              <span
                style={{
                  display: "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </span>
            }
            secondary={
              item.deadline ? new Date(item.deadline).toLocaleDateString() : ""
            }
            onClick={this.handleOpen}
          />
          <Rating value={item.star} readOnly size="small" />
          <IconButton aria-label="Delete" onClick={this.deleteEventHandler}>
            <DeleteOutlined />
          </IconButton>
        </ListItem>
        <TodoModal
          open={this.state.open}
          onClose={this.handleClose}
          onSave={this.handleSave}
          item={this.state.item}
          update={this.update}
          delete={this.deleteEventHandler}
        />
      </>
    );
  }
}

export default Todo;
