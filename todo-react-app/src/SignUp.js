import React from "react";
import {
  Button,
  TextField,
  Link,
  Grid,
  Container,
  Typography,
} from "@material-ui/core";

import { signup } from "./service/ApiService";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  customFont: {
    fontFamily: "Arial, sans-serif",
  },
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const passwordRegex = /^.{5,}$/;
    if (!passwordRegex.test(password)) {
      alert("패스워드는 5자리 이상이어야 합니다.");
      return;
    }

    signup({ email: email, username: username, password: password }).then(
      (response) => {
        window.location.href = "/login";
      }
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <form noValidate onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                계정 생성
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="사용자 이름"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="패스워드"
                autoFocus
                InputProps={{
                  classes: {
                    input: classes.customFont,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                계정 생성
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item style={{ margin: "1em" }}>
              <Link href="/login" variant="body2">
                이미 계정이 있습니까? 로그인하세요.
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}

export default withStyles(styles)(SignUp);
