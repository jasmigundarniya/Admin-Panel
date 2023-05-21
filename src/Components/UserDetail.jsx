import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.svg";
import logo from "../assets/tripzen.png";
import { MdAirplaneTicket } from "react-icons/md";
import { BsBookmarksFill } from "react-icons/bs";
import { FaEdit, FaUser, FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import "./User.css";
import axios from "axios";
import moment from "moment";
import { RiMessage3Fill } from "react-icons/ri";
import logout from "../assets/logout.png";

function UserDetail() {
  const [data, setData] = useState([]);

  const getAdminData = async () => {
    await axios
      .get("http://localhost:4000/users")
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const uid = localStorage.getItem("urid");

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

  const uemail = localStorage.getItem("uemail");

  return (
    <body id="body">
      <div className="containers">
        <nav className="navbar">
          <div className="nav_icon">
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
          <div className="navbar__left">
            <a style={{ marginLeft: 40 }} className="active_link" href="#">
              User Details
            </a>
          </div>
          <div className="navbar__right">
            <div className="lname">admin</div>
            <a href="#">
              <img width="30" src={avatar} alt="" />
            </a>
          </div>
        </nav>

        <main>
          <div className="main__container">
            <div class="container">
              <div class="row">
                <div class="col-md-3">
                  <div class="osahan-account-page-left shadow-sm bg-white rounded h-100">
                    <div class="p-4">
                      <div class="osahan-user text-center">
                        <div class="osahan-user-media">
                          <h3 style={{ color: "#16a085" }} className="mb-4">
                            Profile
                          </h3>

                          <FaUserCircle
                            style={{
                              fontSize: "6rem",
                            }}
                            className="mb-4"
                          />
                          {data?.map((v, i) => {
                            return v?._id === uid ? (
                              <>
                                <div class="osahan-user-media-body" key={i}>
                                  <h6 class="mb-2">{v?.userName}</h6>
                                  <p class="mb-1">+91 {v?.phone}</p>
                                  <p>{v?.email}</p>
                                </div>
                              </>
                            ) : (
                              ""
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-9">
                  <div class="osahan-account-page-right shadow-sm bg-white rounded p-4 h-100">
                    <div class="tab-content" id="myTabContent">
                      <div
                        class="tab-pane fade active show"
                        id="payments"
                        role="tabpanel"
                        aria-labelledby="payments-tab"
                      >
                        <div class="row fs-6">
                          <div>
                            <h4 className="mb-4">My Booking</h4>

                            <div className="w-100 overflow-auto">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th scope="col">Booking Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">TourName</th>
                                    <th scope="col">GroupSize</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">BookDate</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Status</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {bookdata?.map((val, i) => {
                                    return val?.userEmail === uemail ? (
                                      <>
                                        <tr>
                                          <td key={i} scope="row">
                                            {val?.bookingId}
                                          </td>
                                          <td>{val?.fullName}</td>
                                          <td>{val?.tourName}</td>
                                          <td>
                                            <div style={{ marginLeft: 28 }}>
                                              {val?.guestSize}
                                            </div>
                                          </td>
                                          <td>{val?.phone}</td>
                                          <td>{val?.userEmail}</td>
                                          <td>
                                            {moment(val?.bookAt).format(
                                              "MMM D, YYYY"
                                            )}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default UserDetail;
