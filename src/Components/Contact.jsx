import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.svg";
import logo from "../assets/tripzen.png";
import { MdAirplaneTicket } from "react-icons/md";
import { BsBookmarksFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { MdSearch } from "react-icons/md";

import { SuccessToast } from "../helper/Toast";
import logout from "../assets/logout.png";

import video from "../assets/nocontact.mp4";
import { RiMessage3Fill } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";

function Contact() {
  const [data, setData] = useState([]);

  const getContactData = async () => {
    await axios
      .get("http://localhost:4000/contacts")
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
    getContactData();
  }, []);

  function deleteUser(id) {
    fetch(`http://localhost:4000/bookings/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res);
        getContactData();
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
        (val) =>
          val.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          val.email.toLowerCase().includes(e.target.value.toLowerCase())
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
            <a style={{ marginLeft: 40 }} className="active_link" href="#">
              Contact Details
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
            {/* <!-- MAIN TITLE STARTS HERE --> */}

            <div className="main__title">
              <div className="main__greeting1">
                <h1>Contact Details</h1>
                <p>Welcome to your contact us panel </p>
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
                    onInput={(e) => handleFilter(e)}
                    placeholder="search by name & email"
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
                      <tr>
                        <th style={{ width: "15%" }} scope="col">
                          Name
                        </th>
                        <th style={{ width: "22%" }} scope="col">
                          Email
                        </th>
                        <th style={{ width: "10%" }} scope="col">
                          phone
                        </th>
                        <th scope="col">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.length !== 0 ? (
                        rec?.map((val, i) => {
                          return (
                            <>
                              <tr>
                                <td scope="row">{val?.name}</td>
                                <td scope="row">{val?.email}</td>
                                <td>{val?.phone}</td>
                                <td>{val?.message}</td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <tr className="d-flex flex-column">
                          <video
                            style={{ marginLeft: "122%" }}
                            width="320"
                            height="240"
                            autoPlay
                            loop
                          >
                            <source src={video} />
                          </video>
                          <h5
                            style={{
                              marginLeft: "143%",
                              width: "200%",
                              marginTop: -70,
                            }}
                          >
                            No message found
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
              <NavLink className="dnav" to="/bookingdetails">
                Booking Details
              </NavLink>
            </div>
            <div className="sidebar__link">
              <RiMessage3Fill className="icon" />
              <NavLink onClick={getContactData} className="dnav" to="/contact">
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

export default Contact;
