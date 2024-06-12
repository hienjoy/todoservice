import { signout } from "./service/ApiService";
import { Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";

var navigationBar = (
  <AppBar position="static">
    <Toolbar>
      <Grid justifyContent="space-between" container>
        <Grid item>
          <Typography variant="h6">오늘의 할일</Typography>
        </Grid>
        <Grid item>
          <Button color="inherit" onClick={signout}>
            logout
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default navigationBar;
