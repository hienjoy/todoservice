import { signout } from "./service/ApiService";
import { Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";

var navigationBar = (
  <AppBar position="static" style={{ backgroundColor: "#073857" }}>
    <Toolbar>
      <Grid justifyContent="space-between" container>
        <Grid item>
          <Typography variant="h5">TODOLIST</Typography>
        </Grid>
        <Grid item>
          <Button color="inherit" onClick={signout}>
            LOGOUT
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

export default navigationBar;
