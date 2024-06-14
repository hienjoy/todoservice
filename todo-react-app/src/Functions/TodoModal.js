import React from "react";
import {
  Modal,
  Paper,
  Typography,
  Button,
  Grid,
  Checkbox,
  InputBase,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class TodoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempItem: { ...props.item },
      readOnly: true,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      this.setState({ tempItem: { ...this.props.item } });
    }
  }

  toggleReadOnlyMode = () => {
    if (!this.state.readOnly) {
      this.setState({ readOnly: true }, () => {
        this.props.update(this.state.tempItem);
        this.props.onSave(this.state.tempItem);
      });
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
    const done = !this.state.tempItem.done;
    this.setState(
      {
        tempItem: { ...this.state.tempItem, done },
      },
      () => {
        this.props.update(this.state.tempItem);
        this.props.onSave(this.state.tempItem);
      }
    );
  };
  handleClose = () => {
    if (!this.state.readOnly) {
      const confirmClose = window.confirm("수정하시겠습니까?");
      if (confirmClose) {
        this.setState({ readOnly: true }, () => {
          this.props.update(this.state.tempItem);
          this.props.onSave(this.state.tempItem);
          this.props.onClose(this.state.tempItem);
        });
      } else {
        this.setState({ tempItem: { ...this.props.item }, readOnly: true });
        this.props.onClose();
      }
    } else {
      this.setState({ tempItem: { ...this.props.item }, readOnly: true });
      this.props.onClose();
    }
  };

  render() {
    const tempItem = this.state.tempItem;
    return (
      <Modal open={this.props.open} onClose={this.handleClose}>
        <Paper
          style={{
            margin: "auto",
            marginTop: "10%",
            padding: 20,
            width: 600,
            height: 600,
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
              <Typography variant="h5">{tempItem.title}</Typography>
            </Grid>
          </Grid>
          <h3 style={{ color: "#073857" }}>Title</h3>
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
          <h3 style={{ color: "#073857" }}>Content</h3>
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
            style={{
              overflow: "auto",
              height: "120px",
              alignItems: "flex-start",
              maxHeight: "120px",
            }}
          />
          <h3 style={{ color: "#073857" }}>Deadline</h3>
          <InputBase
            inputProps={{
              readOnly: this.state.readOnly,
            }}
            type="datetime-local"
            name="deadline"
            value={tempItem.deadline}
            fullWidth
            onChange={this.editEventHandler}
          />
          <div style={{ display: "flex" }}>
            <div>
              <h3 style={{ color: "#073857", marginRight: "80px" }}>
                Importance
              </h3>
              <InputBase
                inputProps={{
                  readOnly: this.state.readOnly,
                  min: 0,
                  max: 5,
                }}
                type="number"
                name="star"
                value={tempItem.star}
                fullWidth
                onChange={this.editEventHandler}
              />
            </div>
            <div>
              <h3 style={{ color: "#073857" }}>Priority</h3>
              <InputBase
                inputProps={{
                  readOnly: this.state.readOnly,
                  min: 1,
                }}
                type="number"
                name="priority"
                value={tempItem.priority}
                fullWidth
                onChange={this.editEventHandler}
              />
            </div>
          </div>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={this.toggleReadOnlyMode}
            style={{ marginTop: 10 }}
          >
            {this.state.readOnly ? "수정하기" : "수정완료"}
          </Button>
          <IconButton aria-label="Delete" onClick={this.props.delete}>
            <DeleteOutlined />
          </IconButton>
        </Paper>
      </Modal>
    );
  }
}

export default TodoModal;
