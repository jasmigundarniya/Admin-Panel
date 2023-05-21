import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.svg";
import logo from "../assets/tripzen.png";
import { MdAirplaneTicket, MdDelete } from "react-icons/md";
import { RiMessage3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import "./User.css";
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import { MdSearch } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import moment from "moment";
import { BsBookmarksFill } from "react-icons/bs";
import logout from "../assets/logout.png";
import Dropdown from "react-bootstrap/Dropdown";

function User() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);

  const getAdminData = async () => {
    await axios
      .get("http://localhost:4000/users")
      .then((res) => {
        setData(res?.data?.data);
        setSearchData(res?.data?.data);
        SetFilter("");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getAdminData();
  }, []);

  const [bookdata, setBookdata] = useState([]);

  const getPackageData = async () => {
    await axios
      .get("http://localhost:4000/bookings")
      .then((res) => {
        setBookdata(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getPackageData();
  }, []);

  function deleteUser(id) {
    fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((res) => {
        // console.warn(res);
        SuccessToast("Deleted Successfully!!");
        getAdminData();
      });
    });
  }

  const [filter, SetFilter] = useState("");
  const [searchData, setSearchData] = useState([]);
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setData(searchData);
    } else {
      const filterres = searchData.filter(
        (val) =>
          val.userName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          val.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setData(filterres);
    }
    SetFilter(e.target.value);
    setCurrentPage(1);
  };

  const uid = localStorage.getItem("urid");
  const uemail = localStorage.getItem("uemail");

  const [select, setSelect] = useState(5);

  const selection = (event) => {
    setSelect(parseInt(event?.target?.value));
    setCurrentPage(1);
  };

  const [currentpage, setCurrentPage] = useState(1);
  const record = select;
  const firstindex = (currentpage - 1) * record;
  const lastindex = firstindex + record;
  const rec = data.slice(firstindex, lastindex);
  const npage = Math.ceil(data.length / record);
  const number = [...Array(npage + 1).keys()].slice(1);

  function prepage() {
    if (currentpage !== firstindex) {
      if (currentpage !== 1) {
        setCurrentPage(currentpage - 1);
      }
    }
  }

  function changepage(id) {
    setCurrentPage(id);
  }

  function nextpage() {
    if (currentpage !== lastindex) {
      if (currentpage < number.length) setCurrentPage(currentpage + 1);
    }
  }

  return (
    <body id="body">
      <div className="containers">
        <nav className="navbar">
          <div className="nav_icon">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
          <div className="navbar__left">
            <a style={{ marginLeft: 40 }} className="active_link">
              User
            </a>
          </div>

          <div className="d-flex">
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#fff",
                  border: "none",
                  color: "#000",
                }}
                className="usertoggle"
                variant="success"
                id="dropdown-basic"
              >
                <div className="navbar__right">
                  <a href="#">
                    <img
                      style={{ marginInline: 10 }}
                      width="30"
                      src={avatar}
                      alt=""
                    />
                  </a>
                  <div style={{ marginRight: 50 }} className="lname">
                    admin
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{
                  lineHeight: 2,
                  position: "absolute",
                  top: 0,
                  marginTop: 10,
                }}
              >
                <Dropdown.Item className="mt-0">
                  <div
                    style={{
                      backgroundColor: "#e9ecef",
                      width: "120%",
                      padding: 10,
                      marginTop: -12,
                      marginLeft: -15,
                      borderRadius: "5px 5px 0 0",
                    }}
                    className="d-flex"
                  >
                    <div>
                      <img width="30" src={avatar} alt="" />
                    </div>
                    <div
                      style={{ marginLeft: 20, lineHeight: 0, marginTop: 7 }}
                    >
                      <p className="fw-bold" style={{ marginBottom: 20 }}>
                        Admin
                      </p>
                      <p>Administrator</p>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    style={{ textDecoration: "none", color: "#212529" }}
                    to="/changepassword"
                  >
                    Change Password
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item href="/">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </nav>

        <main>
          <div className="main__container">
            <div className="main__title">
              <div className="main__greeting1">
                <h1>User</h1>
                <p>Welcome to your user panel</p>
                <hr />
                <div className="filtersearch">
                  <MdSearch
                    style={{
                      width: "1.5rem",
                      height: "3vh",
                      marginTop: "-7px",
                    }}
                  />
                  <input
                    type="text"
                    value={filter}
                    placeholder="Search by name & email"
                    onInput={(e) => handleFilter(e)}
                    style={{
                      border: "none",
                      height: "2rem",
                      background: "#f8f9fa",
                      borderRadius: "5px",
                      paddingLeft: "7px",
                      outline: "none",
                      marginBottom: "10px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="main__title">
              <div className="main__greeting2">
                <div className="w-100 overflow-auto">
                  <table className="table">
                    <thead>
                      <tr style={{ fontSize: "1.3rem" }}>
                        <th scope="col">Index</th>

                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Number</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rec?.map((val, i) => {
                        return (
                          <>
                            <tr>
                              <th scope="col" key={i}>
                                {i + 1}
                              </th>

                              <td
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  // setModal(true);
                                  localStorage.setItem("urid", val?._id);
                                  localStorage.setItem("uemail", val?.email);
                                }}
                                scope="row"
                              >
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "#000",
                                  }}
                                  to="/userdetail"
                                >
                                  {val?.userName}
                                </Link>
                              </td>

                              <td>{val?.email}</td>
                              <td>{val?.phone}</td>
                              <td>
                                {/* <BiBlock
                                  style={{
                                    marginInline: 6,
                                    fontSize: "1.3rem",
                                    color: "red",
                                  }}
                                /> */}
                                <MdDelete
                                  onClick={() => {
                                    Swal.fire({
                                      title:
                                        "Are you sure you want to deactivate this user?",
                                      showConfirmButton: true,
                                      showCancelButton: true,
                                      confirmButtonText: "OK",
                                      cancelButtonText: "Cancel",
                                      icon: "warning",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        deleteUser(val?._id);
                                      } else
                                        ErrorToast("Something went wrong!!");
                                    });
                                  }}
                                  role="button"
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#EB455F",
                                    marginLeft: 20,
                                  }}
                                />
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <select onChange={selection} className="selectbutton">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>

          <nav>
            <ul
              className="pagination justify-content-center"
              style={{ marginRight: "3%" }}
            >
              <li className="page-item">
                <a
                  href="#"
                  className="page-link"
                  onClick={prepage}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {number.map((n, i) => {
                return (
                  <>
                    <li
                      className={`page-item ${
                        currentpage === n ? "active" : ""
                      }`}
                      key={i}
                    >
                      <a
                        href="#"
                        className="page-link"
                        onClick={() => changepage(i + 1)}
                      >
                        {n}
                      </a>
                    </li>
                  </>
                );
              })}
              <li className="page-item">
                <a
                  href="#"
                  className="page-link"
                  onClick={nextpage}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </main>

        <Modal
          size="xl"
          isOpen={modal}
          toggle={() => setModal(!modal)}
          style={{ marginTop: 60 }}
        >
          <ModalHeader
            toggle={() => setModal(false)}
            className="mt-1 d-flex justify-content-center updatemodalfooter"
            style={{ backgroundColor: "#16a08408" }}
          >
            <h3>User Details</h3>
          </ModalHeader>
          <ModalBody style={{ borderRadius: "0.5rem" }} className="bg-light">
            <Row className="d-flex justify-content-center p-3">
              <Col className="col-md-3 bg-white rounded-3 p-4">
                <div>
                  <h4>Profile</h4>
                  <hr
                    className="mb-4
                  "
                  />

                  <div className="text-center">
                    <FaUserCircle
                      style={{
                        fontSize: "5.5rem",
                      }}
                      className="mb-4"
                    />
                  </div>
                  {data?.map((v, i) => {
                    return v?._id === uid ? (
                      <>
                        <div key={i} className="p_detail mb-4 text-center">
                          Name : {v?.userName}
                        </div>
                        <div className="p_detail mb-4 text-center">
                          Email : {v?.email}
                        </div>
                        <div className="p_detail mb-4 text-center">
                          Phone : {v?.phone}
                        </div>
                      </>
                    ) : (
                      ""
                    );
                  })}
                </div>
              </Col>

              <Col className="col-md-8 ms-3 bg-white rounded-3 p-4">
                <div>
                  <h4 className="">My Booking</h4>
                  <hr className="mb-4" />

                  <div className="w-100 overflow-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">TourName</th>
                          <th scope="col">GroupSize</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Email</th>
                          <th scope="col">BookDate</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {bookdata?.map((val, i) => {
                          return val?.userEmail === uemail ? (
                            <>
                              <tr>
                                <td scope="row">{val?.fullName}</td>
                                <td>{val?.tourName}</td>
                                <td>
                                  <div style={{ marginLeft: 28 }}>
                                    {val?.guestSize}
                                  </div>
                                </td>
                                <td>{val?.phone}</td>
                                <td>{val?.userEmail}</td>
                                <td>
                                  {moment(val?.bookAt).format("MMM D, YYYY")}
                                </td>
                                <td>
                                  {new Date(val?.bookAt).getTime() >=
                                  new Date().getTime() ? (
                                    <div
                                      style={{
                                        backgroundColor: "#ffe6e6",
                                        color: "red",
                                        borderRadius: 5,
                                      }}
                                      className="text-center"
                                    >
                                      Upcoming
                                    </div>
                                  ) : (
                                    <div
                                      style={{
                                        backgroundColor: "#cdffcd",
                                        color: "green",
                                        borderRadius: 5,
                                      }}
                                      className="text-center"
                                    >
                                      Completed
                                    </div>
                                  )}
                                </td>
                              </tr>
                            </>
                          ) : (
                            ""
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Row>
          </ModalBody>
        </Modal>

        {/* <!-- SIDEBAR START HERE --> */}
        <div id="sidebar">
          <div className="sidebar__title">
            <div className="sidebar__img">
              <img src={logo} alt="logo" />
            </div>
            <i className="fa fa" id="sidebarIcon" aria-hidden="true"></i>
          </div>

          <div className="sidebar__menu">
            <div className="sidebar__link active_menu_link">
              <i className="fa fa-home"></i>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </div>
            <h2>ACTIVITY</h2>
            <div className="sidebar__link">
              <MdAirplaneTicket className="icon" />
              <NavLink className="dnav" to="/tourpackages">
                Tour Packages
              </NavLink>
            </div>
            <div className="sidebar__link">
              <FaUser className="icon" />
              <NavLink onClick={getAdminData} className="dnav" to="/user">
                User
              </NavLink>
            </div>
            <div className="sidebar__link">
              <BsBookmarksFill className="icon" />
              <NavLink className="dnav" to="/bookingdetails">
                Booking Details
              </NavLink>
            </div>
            <div className="sidebar__link">
              <RiMessage3Fill className="icon" />
              <NavLink className="dnav" to="/contact">
                Contact Details
              </NavLink>
            </div>

            <div className="sidebar__logout">
              {/* <i className="fa fa-power-off"></i> */}
              <i className="fa fa">
                <img src={logout} style={{ width: 25 }} alt="" />
              </i>
              <a href="/">Log out</a>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default User;
