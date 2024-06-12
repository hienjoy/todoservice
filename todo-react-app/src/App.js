import React from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import TodoStats from "./Functions/TodoStats";
import { Paper, List, Container, Select, MenuItem } from "@material-ui/core";
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
      // 로딩 중이라는 상태를 표현할 변수 생성자에 상태 변수를 초기화한다.
      loading: true,
      sortList: "register",
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
    console.log(this.state.items);
    console.log(this.state.items.done);
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
    console.log(this.state.items);
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

  //정렬 추가
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

  // componentDidmount는 페이지(돔) 마운트가 일어나고 렌더링되기 전에 실행된다.
  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }
  render() {
    // todoItems에 this.state.items.length가 0보다 크다면 true이므로 && 뒤에 값을 넘겨준다.
    // todoItem = this.state.items.length > 0 ? (<Paper></Paper>):""; 이렇게 해도 같은 결과이다. 조건선택문 ? ternary operator
    const sortItems = this.sortItems(this.state.items);
    const todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {sortItems.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            />
          ))}
        </List>
      </Paper>
    );

    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <TodoStats todos={this.state.items} />
          <Select value={this.state.sortList} onChange={this.handleSort}>
            <MenuItem value="deadline">마감일순</MenuItem>
            <MenuItem value="register">등록순</MenuItem>
            <MenuItem value="star">중요도순</MenuItem>
            <MenuItem value="priority">우선순위순</MenuItem>
          </Select>
          <div className="TodoList">{todoItems}</div>
        </Container>
        <DeleteDoneAll clearAllDonelist={this.clearAllDonelist} />
        <Clear clearAll={this.clearAll} />
        <Weathers />
        <Quotes />
      </div>
    );

    // loading 중일 때
    var loadingPage = <h1>Loading...</h1>;
    var content = loadingPage;

    if (!this.state.loading) {
      content = todoListPage;
    }

    // 생성된 컴포넌트 JSX를 리턴한다.
    return <div className="App">{content}</div>;
  }
}

export default App;
