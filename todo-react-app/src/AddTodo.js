import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: { title: "", content: "", deadline: "", star: 0, priority: "" },
    };
    this.add = props.add;
  }

  onInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem[e.target.name] = e.target.value;
    this.setState({ item: thisItem });
  };

  onButtonClick = () => {
    this.add(this.state.item);
    this.setState({
      item: { title: "", content: "", deadline: "", star: 0, priority: "" },
    }); //입력 필드 초기화
  };

  onRatingChange = (e, newValue) => {
    const thisItem = this.state.item;
    thisItem.star = newValue;
    this.setState({ item: thisItem });
  };

  // 엔터키 작성 완료 되지 않게
  // enterKeyEventHandler = (e) => {
  //   if (e.key === "Enter") {
  //     this.onButtonClick();
  //   }
  // };

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16, backgroundColor: "#e3f1f8" }}>
        <Grid container spacing={5}>
          <Grid xs={11} md={11} item>
            <h3>Title</h3>
            <TextField
              variant="standard"
              name="title"
              placeholder="Add Title here"
              fullWidth
              onChange={this.onInputChange}
              value={this.state.item.title}
              InputProps={{
                style: {
                  backgroundColor: "white",
                  padding: "0.5em",
                },
                disableUnderline: true,
              }}
              //onKeyPress={this.enterKeyEventHandler}
            />
          </Grid>
          <Grid xs={11} md={11} item>
            <h3>Content</h3>
            <TextField
              name="content"
              placeholder="Add Content here"
              variant="standard"
              fullWidth
              multiline
              onChange={this.onInputChange}
              value={this.state.item.content}
              style={{ backgroundColor: "white", height: "100px" }}
              InputProps={{
                style: {
                  height: "100%",
                  alignItems: "flex-start",
                  overflow: "auto",
                  padding: "10px",
                },
                disableUnderline: true,
              }}
            />
          </Grid>
          <Grid xs={11} md={11} item>
            <h3>Deadline</h3>
            <TextField
              name="deadline"
              type="datetime-local"
              variant="standard"
              fullWidth
              value={this.state.item.deadline}
              onChange={this.onInputChange}
              InputProps={{
                style: {
                  backgroundColor: "white",
                  padding: "0.5em",
                },
                disableUnderline: true,
              }}
            />
          </Grid>
          <Grid xs={11} md={11} item>
            <h3>Importance</h3>
            <Rating
              name="star"
              value={this.state.item.star}
              onChange={this.onRatingChange}
            />
          </Grid>
          <Grid xs={11} md={11} item style={{ textAlign: "center" }}>
            <h3>Priority</h3>
            <TextField
              inputProps={{
                min: 1,
                style: {
                  textAlign: "center",
                },
              }}
              variant="standard"
              name="priority"
              type="number"
              fullWidth
              onChange={this.onInputChange}
              value={this.state.item.priority}
              InputProps={{
                style: {
                  backgroundColor: "white",
                  padding: "0.5em",
                },
                disableUnderline: true,
              }}
            />
          </Grid>
          <Grid xs={11} md={11} item>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={this.onButtonClick}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddTodo;
