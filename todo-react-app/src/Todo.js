import React from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  Modal,
  Paper,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import CloseIcon from "@material-ui/icons/Close";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      tempItem: { ...props.item },
      readOnly: true,
      open: false, // 모달 창 열림 여부
      originalItem: { ...props.item }, // 수정 전 원본 아이템
    };
    this.delete = props.delete;
    this.update = props.update;
  }

  deleteEventHandler = () => {
    this.delete(this.state.item);
  };

  toggleReadOnlyMode = () => {
    if (!this.state.readOnly) {
      // 수정 완료 버튼을 눌렀을 때만 업데이트
      this.setState(
        { item: { ...this.state.tempItem }, readOnly: true },
        () => {
          this.update(this.state.tempItem);
        }
      );
    } else {
      this.setState({ readOnly: false });
    }
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

  render() {
    const item = this.state.item;
    const tempItem = this.state.tempItem;
    return (
      <>
        <ListItem style={{ cursor: "pointer" }}>
          <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
          <ListItemText
            primary={item.title}
            secondary={`${new Date(item.deadline).toLocaleString()}`} //deadline 표시
            onClick={this.handleOpen}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete" onClick={this.deleteEventHandler}>
              <DeleteOutlined />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <Modal open={this.state.open} onClose={this.handleClose}>
          <Paper
            style={{
              margin: "auto",
              marginTop: "10%",
              padding: 20,
              width: 500,
              height: 400,
              position: "relative",
            }}
          >
            <IconButton
              aria-label="Close"
              onClick={this.handleClose}
              style={{
                position: "absolute",
                right: 10,
                top: 10,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Checkbox
                  checked={tempItem.done}
                  onChange={this.checkboxEventHandler}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">{tempItem.title}</Typography>
              </Grid>
            </Grid>
            <p>Title</p>
            <InputBase
              inputProps={{
                readOnly: this.state.readOnly,
              }}
              type="text"
              name="title"
              value={tempItem.title}
              multiline={true}
              fullWidth={true}
              onChange={this.editEventHandler}
            />
            <p>Content</p>
            <InputBase
              inputProps={{
                readOnly: this.state.readOnly,
              }}
              type="text"
              name="content"
              value={tempItem.content}
              multiline
              fullWidth
              onChange={this.editEventHandler}
            />
            <InputBase
              inputProps={{
                readOnly: this.state.readOnly,
              }}
              type="datetime-local"
              name="deadline"
              value={tempItem.deadline}
              fullWidth
              onChange={this.editEventHandler}
              //onKeyDown={this.enterKeyEventHandler}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.toggleReadOnlyMode}
              style={{ marginTop: 10 }}
            >
              {this.state.readOnly ? "수정하기" : "수정완료"}
            </Button>
            <IconButton aria-label="Delete" onClick={this.deleteEventHandler}>
              <DeleteOutlined />
            </IconButton>
          </Paper>
        </Modal>
      </>
    );
  }
}

export default Todo;
