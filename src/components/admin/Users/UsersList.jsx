import React from "react";
import { List, Divider, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import "../../admin/AdminStyles.css";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import UsersAddEditButton from "./UsersAddEditButton";
const URL = process.env.REACT_APP_URL;

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    await fetch(`${URL}/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data.usuariosDB));
  };

  const deleteUser = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${URL}/api/user/${_id}`);
        getUser();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  useEffect(() => {
    getUser();
  }, [users]);

  return (
    <>
      <Divider orientation="left">
        <h5>Users List:</h5>
      </Divider>
      <Row>
        <Col className="productListTitles">
          <b>Full Name</b>
        </Col>
        <Col className="productListTitles">
          <b>Email</b>
        </Col>

        <Col className="productListTitles">
          <b>Role</b>
        </Col>
        <Col className="productListTitles">
          <b>Actions</b>
        </Col>
      </Row>
      <Divider orientation="left"></Divider>
      {users?.map((userItem) => {
        return (
          <>
            <Row>
              <Col>
                <List.Item className="ProductListItem">
                  {userItem.fullname}
                </List.Item>
              </Col>
              <Col>
                <List.Item className="ProductListItem">
                  {userItem.email}
                </List.Item>
              </Col>
              <Col>
                <List.Item className="ProductListItem">
                  {userItem.role}
                </List.Item>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Button
                      className="m-2"
                      type="danger"
                      onClick={() => deleteUser(userItem._id)}
                      style={{
                        minHeight: "40px",
                        minWidth: "50px",
                        borderRadius: "5px",
                      }}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Col>
                  <Col>
                    <UsersAddEditButton props={userItem} />
                  </Col>
                </Row>
              </Col>
              <Divider orientation="left"></Divider>
            </Row>
          </>
        );
      })}
    </>
  );
};

export default UsersList;
