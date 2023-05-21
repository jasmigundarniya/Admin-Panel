import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import Dashboard from "./Dashboard";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    navigate("/dashboard");
  };

  const [pass, setPass] = useState();
  const [currPass, setCurrPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();

  const id = localStorage.getItem("id");
  const uid = id.split('"');
  const ad_id = uid[1];

  const getData = async () => {
    let result = await fetch(`http://localhost:4000/api/v1/admins/${ad_id}`);
    result = await result.json();
    setPass(result.password);
  };
  useEffect(() => {
    getData();
  });

  const updatePassword = async () => {
    if (pass === currPass) {
      let result = await fetch(
        `http://localhost:4000/api/v1/admins/update-password/${ad_id}`,
        {
          method: "put",
          body: JSON.stringify({ password: newPass }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = await result.json();
      if (result) {
        if (newPass === confirmPass) {
          SuccessToast("Updated Successfully!!");
          navigate("/dashboard");
        } else {
          ErrorToast("Confirm Password not matched with New Password!!!");
        }
      } else {
        ErrorToast("Something went wrong!!");
      }
    } else {
      ErrorToast("Invalid Current Password");
    }
  };

  return (
    <>
      <Dashboard />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#16a08408" }}>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row">
              <div className="form-group col-lg-8">
                <label for="inputEmail4">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputEmail4"
                  value={currPass}
                  name="currPass"
                  onChange={(e) => {
                    setCurrPass(e.target.value);
                  }}
                  placeholder="Current Password"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-8">
                <label for="inputPassword4">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  name="newPass"
                  value={newPass}
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                  placeholder="New Password"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-8">
                <label for="inputPassword4">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  name="confirmPass"
                  value={confirmPass}
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#16a085" }}
            variant="primary"
            onClick={updatePassword}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChangePassword;
