import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.svg";
import logo from "../assets/tripzen.png";
import { MdAirplaneTicket } from "react-icons/md";
import { BsBookmarksFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { MdSearch } from "react-icons/md";
import logout from "../assets/logout.png";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import moment from "moment/moment";
import { SuccessToast } from "../helper/Toast";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

import image from "../assets/nofound.gif";
import { RiMessage3Fill } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";

function BookingDetails() {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);

  const getPackageData = async () => {
    await axios
      .get("http://localhost:4000/bookings")
      .then((res) => {
        setData(res?.data?.data);
        setSearchData(res?.data?.data);
        setProduct(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getPackageData();
  }, []);

  const [id, setId] = useState();
  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [groupSize, setGroupSize] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState();

  const edit = (val) => {
    setId(val?._id);
    setName(val?.fullName);
    setTitle(val?.tourName);
    setGroupSize(val?.guestSize);
    setPhone(val?.phone);
    setEmail(val?.userEmail);
    setDate(val?.bookAt);
  };

  function updateUser() {
    let item = {
      fullName: name,
      tourName: title,
      guestSize: groupSize,
      phone: phone,
      userEmail: email,
      bookAt: date,
    };
    console.warn("item", item);

    fetch(`http://localhost:4000/bookings/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        getPackageData();
      });
    });
    SuccessToast("Updated Successfully!!");
  }

  function deleteUser(id) {
    fetch(`http://localhost:4000/bookings/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        getPackageData();
      });
    });
    SuccessToast("Deleted Successfully!!");
  }

  const [filter, SetFilter] = useState("");
  const [searchData, setSearchData] = useState([]);
  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchData);
    } else {
      const filterres = searchData.filter(
        (val) => val.bookAt.toLowerCase().includes(e.target.value.toLowerCase())
        // val.bookingId.toLowerCase().includes(e.target.value.toLowerCase())
      );

      if (filterres.length < 0) {
        setData([{ bookAt: "no data" }]);
      } else {
        setData(filterres);
      }
    }
    SetFilter(e.target.value);
    setCurrentPage(1);
  };

  const filterByStatus = (status) => {
    if (status === "upcoming") {
      const filteredData = searchData.filter(
        (data) => new Date(data.bookAt).getTime() >= new Date().getTime()
      );
      setData(filteredData);
      setCurrentPage(1);
    } else if (status === "completed") {
      const filteredData = searchData.filter(
        (data) => new Date(data.bookAt).getTime() < new Date().getTime()
      );
      setData(filteredData);
      setCurrentPage(1);
    }
  };

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

  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSelect = (date) => {
    let datefilter = product.filter((product) => {
      let productDate = new Date(product["bookAt"]);
      return (
        productDate >= date.selection.startDate &&
        productDate <= date.selection.endDate
      );
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setData(datefilter);
    setIsOpen(false);
    setCurrentPage(1);
  };
  const selectionRange = {
    startDate: startDate,
    startDate: endDate,
    key: "selection",
  };

  return (
    <body id="body">
      <div className="containers">
        <nav className="navbar">
          <div className="nav_icon">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
          <div className="navbar__left">
            <a style={{ marginLeft: 40 }} className="active_link" href="#">
              Booking Details
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

        <Modal
          size="lg"
          isOpen={modal}
          toggle={() => setModal(!modal)}
          style={{ marginTop: 60 }}
        >
          <ModalHeader
            toggle={() => setModal(false)}
            className="mt-1 d-flex justify-content-center updatemodalfooter"
            style={{ backgroundColor: "#16a08408" }}
          >
            <h3>Edit Details</h3>
          </ModalHeader>
          <ModalBody>
            <Row className="d-flex justify-content-center p-3">
              <Col lg="6">
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Input>
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <Input
                    type="text"
                    name="tourname"
                    placeholder="TourName"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                    // required
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <Input
                    type="number"
                    name="groupsize"
                    placeholder="GroupSize"
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}

                    // required
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <Input
                    type="number"
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}

                    // required
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                    // required
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <Input
                    type="date"
                    name="bookingdate"
                    placeholder="BookingDate"
                    value={moment(date).format("YYYY-MM-DD")}
                    onChange={(e) => setDate(e.target.value)}

                    // required
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <div className="d-flex justify-content-center updatemodalfooter">
            <div className="text-center">
              <Button
                onClick={() => {
                  {
                    updateUser();
                  }
                  setModal(false);
                }}
                className="addtour mb-5"
              >
                Save
              </Button>
            </div>
          </div>
        </Modal>

        <main>
          <div className="main__container">
            {/* <!-- MAIN TITLE STARTS HERE --> */}

            <div className="main__title">
              <div className="main__greeting1">
                <h1>Booking Details</h1>
                <p>Welcome to your booking panel </p>
                <hr />

                <div className="filtersearch d-flex">
                  <MdSearch
                    style={{
                      width: "1.5rem",
                      height: "3vh",
                      marginTop: "5px",
                    }}
                  />

                  {/* <input
                    type="text"
                    value={filter}
                    placeholder="Search by id"
                    onInput={(e) => handleFilter(e)}
                    style={{
                      border: "none",
                      height: "2rem",
                      width: "10%",
                      background: "#f8f9fa",
                      borderRadius: "5px",
                      paddingLeft: "7px",
                      outline: "none",
                      marginBottom: "10px",
                    }}
                  /> */}

                  <div className="d-flex flex-column">
                    <div className="m-2 mt-0 mb-2">
                      <input
                        style={{
                          width: "105%",
                          border: "1px solid #ccc",
                          height: "2rem",
                          background: "rgb(248, 249, 250)",
                          borderRadius: "5px",
                          paddingLeft: "7px",
                          outline: "none",
                        }}
                        value={`${moment(startDate).format(
                          "DD-MM-YYYY"
                        )} ~ ${moment(endDate).format("DD-MM-YYYY")}`}
                        onClick={() => setIsOpen(true)}
                      />
                    </div>
                    <div
                      style={{
                        boxShadow: "0 2px 8px 2px rgba(178, 178, 178, 0.406)",
                      }}
                      className="position-absolute mt-5 ms-1"
                    >
                      {isOpen && (
                        <DateRange
                          editableDateInputs={false}
                          onChange={handleSelect}
                          moveRangeOnFirstSelection={false}
                          ranges={[selectionRange]}
                        />
                      )}
                    </div>
                  </div>
                  <span
                    className="ms-3 mb-2 mt-1"
                    onChange={(e) => filterByStatus(e.target.value)}
                  >
                    <input type="radio" value="upcoming" name="status" />{" "}
                    Upcoming
                    <span style={{ marginInline: 10 }}>
                      <input type="radio" value="completed" name="status" />{" "}
                      Completed{" "}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="main__title">
              <div className="main__greeting2">
                <div className="w-100 overflow-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: "10%" }} scope="col">
                          Booking Id
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">TourName</th>
                        <th scope="col">GroupSize</th>
                        <th scope="col">phone</th>
                        <th scope="col">Email</th>
                        <th scope="col">BookDate</th>
                        <th scope="col">Price</th>
                        <th className="text-center" scope="col">
                          Status
                        </th>
                        {/* <th scope="col">Activity</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {data?.length !== 0 ? (
                        rec?.map((val, i) => {
                          return (
                            <>
                              <tr>
                                <td scope="row">{val?.bookingId}</td>
                                <td scope="row">{val?.fullName}</td>
                                <td>{val?.tourName}</td>
                                <td>
                                  <div style={{ marginLeft: "28px" }}>
                                    {val?.guestSize}
                                  </div>
                                </td>
                                <td>{val?.phone}</td>
                                <td>{val?.userEmail}</td>
                                <td>
                                  {moment(val?.bookAt).format("DD-MM-YYYY")}
                                </td>
                                <td>₹ {val?.amount}</td>

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

                                {/* <td className="text-center"> */}
                                {/* <FaEdit
                                  role="button"
                                  style={{
                                    marginInline: 10,
                                    fontSize: "1.3rem",
                                    color: "green",
                                  }}
                                  onClick={() => {
                                    setModal(true);
                                    edit(val);
                                  }}
                                /> */}
                                {/* <MdDelete
                                  onClick={() => deleteUser(val?._id)}
                                  role="button"
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#EB455F",
                                  }}
                                /> */}

                                {/* {new Date(val?.bookAt).getTime() >=
                                new Date().getTime() ? (
                                  <ImCancelCircle
                                    onClick={() => deleteUser(val?._id)}
                                    role="button"
                                    style={{
                                      fontSize: "1.3rem",
                                      color: "#EB455F",
                                    }}
                                  />
                                ) : (
                                  <FaRegCheckCircle
                                    style={{
                                      fontSize: "1.3rem",
                                      color: "green",
                                    }}
                                  />
                                )}
                              </td> */}
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <tr className="d-flex flex-column">
                          <img
                            style={{ width: "180%", marginLeft: "400%" }}
                            src={image}
                          />
                          <h5
                            style={{
                              marginLeft: "412%",
                              width: "200%",
                              marginTop: -30,
                            }}
                          >
                            No booking found
                          </h5>
                        </tr>
                      )}
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
              <NavLink className="dnav" to="/user">
                User
              </NavLink>
            </div>
            <div className="sidebar__link">
              <BsBookmarksFill className="icon" />
              <NavLink
                onClick="/bookingdetails"
                className="dnav"
                to="/bookingdetails"
              >
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

export default BookingDetails;
