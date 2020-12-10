import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import { withRouter } from 'react-router-dom'

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount (){
    if (this.props.auth.isAuthenticated){
      this.props.history.push('/')
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    const userData = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.loginUser(userData)

  }
  render() {
    const { classes } = this.props;
    const { errors } = this.state
    return (
      <Paper style={{ padding: 15 }}>
        <form onSubmit={this.handleSubmit}>
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
          <div className={classes.btn}>
            <Button variant="outlined" color="primary" type="submit">
              Login
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login))
