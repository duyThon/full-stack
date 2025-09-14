import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUsers } from "../../services/userService";
import "./userManager.scss";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUsers();
    if (response && response.errCode === 0) {
      this.setState({
        users: response.users,
      });
    }
  }

  render() {
    let users = this.state.users;
    return (
      <div>
        <div className="text-center ">Manage users</div>
        <div className="users-table mt-4 mx-3">
          <table>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Actions</th>
            </tr>
            {users.length > 0 &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>
                        <button className="">Edit</button>
                        <button>Delete</button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
