import React from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import TodoStats from "./Functions/TodoStats";
import {
  Paper,
  Container,
  Select,
  MenuItem,
  Grid,
  Button,
} from "@material-ui/core";
import "./App.css";
import { call } from "./service/ApiService";
import DeleteDoneAll from "./Functions/DeleteDoneAll";
import Clear from "./Functions/Clear";
import Weathers from "./Functions/Weathers";
import Quotes from "./Functions/Quotes";
import navigationBar from "./navigation";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      sortList: "register",
      currentPage: 1,
      itemsPerPage: 6,
    };
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  //완료 리스트 일괄 삭제
  clearAllDonelist = () => {
    const thisItems = this.state.items;
    thisItems.forEach((tdl) => {
      if (tdl.done === true) {
        call("/todo", "DELETE", tdl).then((response) =>
          this.setState({ items: response.data })
        );
      }
    });
  };

  //일괄 삭제
  clearAll = () => {
    const thisItems = this.state.items;
    thisItems.forEach((tdl) => {
      call("/todo", "DELETE", tdl).then((response) =>
        this.setState({ items: response.data })
      );
    });
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  sortItems = (items) => {
    const { sortList } = this.state;
    if (sortList === "deadline") {
      return [...items].sort((a, b) => {
        if (a.deadline === null) return 1;
        if (b.deadline === null) return -1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
    } else if (sortList === "star") {
      return [...items].sort((a, b) => b.star - a.star);
    } else if (sortList === "priority") {
      return [...items].sort((a, b) => {
        if (a.priority === null) return 1;
        if (b.priority === null) return -1;
        return a.priority - b.priority;
      });
    }
    return items;
  };

  handleSort = (e) => {
    this.setState({ sortList: e.target.value });
  };

  handleClickNext = () => {
    this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
  };

  handleClickPrev = () => {
    this.setState((prevState) => ({ currentPage: prevState.currentPage - 1 }));
  };

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }

  render() {
    const { items, currentPage, itemsPerPage } = this.state;
    const sortItems = this.sortItems(items);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortItems.slice(indexOfFirstItem, indexOfLastItem);

    const todoItems = currentItems.length > 0 && (
      <Grid container spacing={3}>
        {currentItems.map((item, idx) => (
          <Grid
            item
            xs={12}
            sm={6}
            key={item.id}
            style={{ listStyleType: "none", backgroundColor: "white" }}
          >
            <div
              style={{
                margin: "0.5em",
                padding: "1em",
                backgroundColor: "#fdfaf5",
              }}
            >
              <Todo item={item} delete={this.delete} update={this.update} />
            </div>
          </Grid>
        ))}
      </Grid>
    );

    var todoListPage = (
      <div>
        {navigationBar}
        <div className="center">
          <div className="add_Container">
            <AddTodo add={this.add} />
          </div>
          <div>
            <Quotes />
            <div className="content">
              <Container
                maxWidth="md"
                style={{
                  padding: 0,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Select value={this.state.sortList} onChange={this.handleSort}>
                  <MenuItem value="register">등록순</MenuItem>
                  <MenuItem value="deadline">마감일순</MenuItem>
                  <MenuItem value="star">중요도순</MenuItem>
                  <MenuItem value="priority">우선순위순</MenuItem>
                </Select>
                <TodoStats todos={this.state.items} />
              </Container>
            </div>
            <Paper
              style={{
                margin: "1em",
                padding: "1em",
                width: "70em",
                height: "30em",
              }}
            >
              {todoItems}
            </Paper>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "1em 0",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClickPrev}
                disabled={currentPage === 1}
                style={{ marginRight: "1em" }}
              >
                이전
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleClickNext}
                disabled={indexOfLastItem >= items.length}
              >
                다음
              </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <DeleteDoneAll clearAllDonelist={this.clearAllDonelist} />
              <Clear clearAll={this.clearAll} />
            </div>
          </div>
          <Weathers />
        </div>
      </div>
    );

    var loadingPage = <h1>Loading...</h1>;
    var content = loadingPage;

    if (!this.state.loading) {
      content = todoListPage;
    }

    return <div className="App">{content}</div>;
  }
}

export default App;
