import React, { useContext, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import avatar from "../assets/avatar.svg";
import hello from "../assets/hello.svg";
import logo from "../assets/tripzen.png";
import logout from "../assets/logout.png";
import { MdAirplaneTicket, MdCollectionsBookmark } from "react-icons/md";
import { BsBookmarksFill } from "react-icons/bs";
import { IoMdBookmarks } from "react-icons/io";
import { FaUser, FaUserAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { RiMessage3Fill } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";

function Dashboard() {
  const data1 = [
    {
      name: "2017",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "2018",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "2019",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "2020",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "2021",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "2022",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "2023",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const [data, setData] = useState([]);
  const getPackageData = async () => {
    await axios
      .get("http://localhost:4000/tours")
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const [userdata, setUserData] = useState([]);
  const getAdminData = async () => {
    await axios
      .get("http://localhost:4000/users")
      .then((res) => {
        setUserData(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const [bookingdata, setBookingData] = useState([]);
  const getBookingData = async () => {
    await axios
      .get("http://localhost:4000/bookings")
      .then((res) => {
        setBookingData(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const [contactdata, setContactData] = useState([]);
  const getContactData = async () => {
    await axios
      .get("http://localhost:4000/contacts")
      .then((res) => {
        setContactData(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getPackageData();
    getAdminData();
    getBookingData();
    getContactData();
  }, []);

  return (
    <>
      <body id="body">
        <div className="containers">
          <nav className="navbar">
            <div className="nav_icon">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div className="navbar__left">
              <a style={{ marginLeft: 40 }} className="active_link" href="#">
                Dashboard
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
                <img src={hello} alt="" />
                <div className="main__greeting">
                  <h1>Hello Tripzen</h1>
                  <p>Welcome to your admin dashboard</p>
                </div>
              </div>

              {/* <!-- MAIN TITLE ENDS HERE -->
    
              <!-- MAIN CARDS STARTS HERE --> */}
              <div className="main__cards">
                <div className="card">
                  <i className="fa fa fa-2x text-lightblue">
                    <FaUserAlt />
                  </i>
                  <div className="card_inner">
                    <p className="text-primary-p">
                      Number of <br /> User
                    </p>
                    <span className="font-bold text-title">
                      {userdata.length}
                    </span>
                  </div>
                </div>

                <div className="card">
                  <i
                    style={{ fontSize: "2.2rem" }}
                    className="fa fa fa-2x text-red"
                  >
                    <IoMdBookmarks />
                  </i>
                  <div className="card_inner">
                    <p className="text-primary-p">
                      Number of <br /> Tours
                    </p>
                    <span className="font-bold text-title">{data.length}</span>
                  </div>
                </div>

                <div className="card">
                  <i className="fa fa fa-2x text-yellow">
                    <MdCollectionsBookmark />
                  </i>
                  <div className="card_inner">
                    <p className="text-primary-p">
                      Number of <br /> Booking
                    </p>
                    <span className="font-bold text-title">
                      {bookingdata.length}
                    </span>
                  </div>
                </div>

                <div className="card">
                  <i className="fa fa fa-2x text-green">
                    <RiMessage3Fill style={{ fontSize: 35 }} />
                  </i>
                  <div className="card_inner">
                    <p className="text-primary-p">
                      Number of <br /> Contacts
                    </p>
                    <span className="font-bold text-title">
                      {contactdata.length}
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- MAIN CARDS ENDS HERE -->
    
              <!-- CHARTS STARTS HERE --> */}
              <div className="charts">
                <div className="charts__left">
                  <div className="charts__left__title">
                    <div>
                      <h1>Daily Reports</h1>
                      <p>Trivago</p>
                    </div>
                    <i className="fa fa-usd" aria-hidden="true"></i>
                  </div>
                  <div>
                    <AreaChart
                      width={530}
                      height={250}
                      data={data1}
                      style={{ marginTop: "50px" }}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorUv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorPv"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="uv"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorUv)"
                      />
                      <Area
                        type="monotone"
                        dataKey="pv"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#colorPv)"
                      />
                    </AreaChart>
                  </div>
                </div>

                <div className="charts__right">
                  <div className="charts__right__title">
                    <div>
                      <h1>Stats Reports</h1>
                      <p>Trivago</p>
                    </div>
                    <i className="fa fa-usd" aria-hidden="true"></i>
                  </div>

                  <div className="charts__right__cards">
                    <div className="card1">
                      <h1>Income</h1>
                      <p>$75,300</p>
                    </div>

                    <div className="card2">
                      <h1>Sales</h1>
                      <p>$124,200</p>
                    </div>

                    <div className="card3">
                      <h1>Users</h1>
                      <p>{userdata.length}</p>
                    </div>

                    <div className="card4">
                      <h1>Bookings</h1>
                      <p>{bookingdata.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- CHARTS ENDS HERE --> */}
            </div>
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
                <NavLink
                  activeClassName="active"
                  className="dnav"
                  to="/tourpackages"
                >
                  Tour Packages
                </NavLink>
              </div>

              <div className="sidebar__link">
                <FaUser className="icon" />
                <NavLink activeClassName="active" className="dnav" to="/user">
                  User
                </NavLink>
              </div>
              <div className="sidebar__link">
                <BsBookmarksFill className="icon" />
                <NavLink
                  activeClassName="active"
                  className="dnav"
                  to="/bookingdetails"
                >
                  Booking Details
                </NavLink>
              </div>
              <div className="sidebar__link">
                <RiMessage3Fill className="icon" />
                <NavLink
                  activeClassName="active"
                  className="dnav"
                  to="/contact"
                >
                  Contact Details
                </NavLink>
              </div>

              <div className="sidebar__logout">
                <i className="fa fa">
                  {/* <MdOutlineLogout
                    style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                  /> */}
                  <img src={logout} style={{ width: 25 }} alt="" />
                </i>
                <a href="/">Log out</a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}

export default Dashboard;
