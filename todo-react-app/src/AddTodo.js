import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: { title: "", content: "", deadline: "", star: 0 },
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
      item: { title: "", content: "", deadline: "" },
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
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container spacing={5}>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
            <p>Title</p>
            <TextField
              name="title"
              placeholder="Add Title here"
              fullWidth
              onChange={this.onInputChange}
              value={this.state.item.title}
              //onKeyPress={this.enterKeyEventHandler}
            />
          </Grid>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
            <p>Content</p>
            <TextField
              name="content"
              placeholder="Add Content here"
              fullWidth
              multiline
              onChange={this.onInputChange}
              value={this.state.item.content}
            />
          </Grid>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
            <p>deadline</p>
            <TextField
              name="deadline"
              type="datetime-local"
              fullWidth
              value={this.state.item.deadline}
              onChange={this.onInputChange}
            />
          </Grid>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
            <p>Star</p>
            <Rating
              name="star"
              value={this.state.item.star}
              onChange={this.onRatingChange}
            />
          </Grid>

          <Grid xs={2} md={2} item>
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
