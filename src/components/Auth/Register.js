import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { registerUser } from "../../actions/authActions";

const styles = {
  textField: {
    width: "100%",
    marginBotton: 20,
    marginTop: 20,
  },
  btn: {
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(userData, this.props.history);
  }
  render() {
    const { classes } = this.props;
    const { errors } = this.state
    return (
      <Paper style={{ padding: 15 }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            type="email"
            label="Email"
            className={classes.textField}
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            helperText = {errors.email ? errors.email : ''}
            error = {errors.email ? true : false}
          />
          <TextField
            type="text"
            label="Username"
            className={classes.textField}
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            helperText = {errors.username ? errors.username : ''}
            error = {errors.username ? true : false}
          />
          <TextField
            type="password"
            label="Password"
            className={classes.textField}
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            helperText = {errors.password ? errors.password : ''}
            error = {errors.password ? true : false}
          />
          <TextField
            type="password"
            label="Confirm Password"
            className={classes.textField}
            name="password2"
            value={this.state.password2}
            onChange={this.handleChange}
            helperText = {errors.password2 ? errors.password2 : ''}
            error = {errors.password2 ? true : false}
          />
          <div className={classes.btn}>
            <Button variant="outlined" color="primary" type="submit">
              Create account
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(
  withRouter(withStyles(styles)(Register))
);
