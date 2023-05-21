import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.svg";
import logo from "../assets/tripzen.png";
import { MdAirplaneTicket, MdDelete } from "react-icons/md";
import { BsBookmarksFill } from "react-icons/bs";
import { FaEdit, FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillEye } from "react-icons/ai";
import axios from "axios";
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
import { MdSearch } from "react-icons/md";
import { CgCalendarToday } from "react-icons/cg";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { RiArrowDropRightFill, RiMessage3Fill } from "react-icons/ri";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import Swal from "sweetalert2";
import image from "../assets/nofound.gif";
import logout from "../assets/logout.png";
import Dropdown from "react-bootstrap/Dropdown";

let day1 = [];
function TourPackages() {
  const [modal, setModal] = useState(false);
  const [model, setModel] = useState(false);
  const [modeel, setModeel] = useState(false);
  const [modeell, setModeell] = useState(false);
  const [moodel, setMoodel] = useState(false);

  const [data, setData] = useState([]);
  // const [dtitle, setDtitle] = useState([]);
  // const [bookdata, setBookdata] = useState([]);
  // const [stitle, setStitle] = useState();

  let ptitle = [];
  const getPackageData = async () => {
    await axios
      .get("http://localhost:4000/tours")
      .then((res) => {
        setData(res?.data?.data);
        setSearchData(res?.data?.data);
        SetFilter("");

        for (let i = 0; i < res?.data?.data?.length; i++) {
          ptitle.push(res?.data?.data[i]?.title);
        }
        // setDtitle(ptitle);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // let dstitle = [];
  // const getBookingData = async () => {
  //   let arr = [];

  //   await axios
  //     .get("http://localhost:4000/bookings")
  //     .then((res) => {
  //       for (let i = 0; i < res?.data?.data?.length; i++) {
  //         arr.push(res?.data?.data[i]?.guestSize);
  //       }
  //       setBookdata(arr);
  //       for (let i = 0; i < res?.data?.data?.length; i++) {
  //         dstitle.push(res?.data?.data[i]?.tourName);
  //       }
  //       setStitle(dstitle);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  useEffect(() => {
    getPackageData();
    // getBookingData();
  }, []);

  // const [sum5, setSum5] = useState();
  // console.log("sum5 :>> ", sum5);
  // let sum = 0;

  // const booksum = () => {
  //   if (dtitle === stitle) {
  //     for (let i = 0; i < bookdata?.length; i++) {
  //       let total1 = bookdata[i];
  //       sum += total1;
  //       setSum5(sum);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   booksum();
  // });

  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [groupSize, setGroupSize] = useState();
  const [city, setCity] = useState();
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState();
  const [flight, setFlight] = useState();
  const [hotel, setHotel] = useState();
  const [place, setPlace] = useState();
  const [desc, setDesc] = useState();
  const [address, setAddress] = useState();
  const [limit, setLimit] = useState();
  const [distance, setDistance] = useState();
  const [count, setcount] = useState(0);

  localStorage.setItem("duration", duration);
  const sduration = localStorage.getItem("duration");

  const sday = sduration?.split("/")[1];
  const stotalday = sday?.split("")[0];

  let data1 = [];
  const edit = (val) => {
    setId(val?._id);
    setTitle(val?.title);
    setCity(val?.city);
    setGroupSize(val?.maxGroupSize);
    setPrice(val?.price);
    setDuration(val?.duration);
    setFlight(val?.flight);
    setHotel(val?.hotel);
    setPlace(val?.place);
    setDesc(val?.desc);
    setAddress(val?.address);
    setDistance(val?.distance);
    setLimit(val?.limit);
    for (let i = 0; i < stotalday; i++) {
      data1.push(val?.schedule[i]);
    }
    day1 = data1;
  };

  const onchangearray = (e, i) => {
    let { name, value } = e.target;
    // console.log(e, i, name, value, day1);
    if (name == "day") day1[i].day = value;
    if (name == "atitle") day1[i].atitle = value;
    if (name == "message1") day1[i].message1 = value;
    if (name == "message2") day1[i].message2 = value;
    if (name == "message3") day1[i].message3 = value;
    if (name == "img") day1[i].img = "/tour-images/" + e.target.files[0].name;
    setcount(count + 1);
  };

  function updateTour() {
    let item = {
      title: title,
      city: city,
      maxGroupSize: groupSize,
      price: price,
      duration: duration,
      flight: flight,
      hotel: hotel,
      place: place,
      limit: limit,
      desc: desc,
      address: address,
      distance: distance,
      schedule: day1,
    };
    console.warn("item", item);

    fetch(`http://localhost:4000/tours/${id}`, {
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

  function deleteTour(id) {
    fetch(`http://localhost:4000/tours/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((res) => {
        SuccessToast("Deleted Successfully!!");
        getPackageData();
      });
    });
  }

  const [filter, SetFilter] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      setData(searchData);
    } else {
      const filterres = searchData.filter(
        (val) =>
          val.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
          val.title.toLowerCase().includes(e.target.value.toLowerCase())
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

  // const [action, setAction] = useState([]);
  // const schedule = (row) => {
  //   setAction(row);
  // };

  const [title1, setTitle1] = useState();
  const [hotel1, setHotel1] = useState();
  const [place1, setPlace1] = useState();
  const [description1, setDescription1] = useState();
  const [address1, setAddress1] = useState();
  const [distance1, setDistance1] = useState();
  const [groupSize1, setGroupSize1] = useState();
  const [city1, setCity1] = useState();
  const [price1, setPrice1] = useState();
  const [duration1, setDuration1] = useState();
  const [flight1, setFlight1] = useState();
  const [limit1, setLimit1] = useState();
  const [pic1, setPic1] = useState();
  const [pic2, setPic2] = useState();
  const [pic3, setPic3] = useState();
  const [pic4, setPic4] = useState();
  const [pic5, setPic5] = useState();
  const [feature, setFeature] = useState(false);
  const [addreview, setAddreview] = useState([]);
  const [addSchedule, setAddSchedule] = useState({
    day: "",
    atitle: "",
    message1: "",
    message2: "",
    message3: "",
    img: "",
  });

  const [totalDay, setTotalDay] = useState([]);

  const day = duration1?.split("/")[1];
  const totalday = day?.split("")[0];

  const [schedule1, setSchedule] = useState([]);
  let array = schedule1;

  const addData = () => {
    if (count <= totalDay.length) {
      array.push(addSchedule);
      setSchedule(array);
      setAddSchedule({
        day: "",
        atitle: "",
        message1: "",
        message2: "",
        message3: "",
        img: "",
      });
      count = count + 1;
    }
  };

  const finish = () => {
    array.push(addSchedule);
    setSchedule(array);
    setAddSchedule({
      day: "",
      atitle: "",
      message1: "",
      message2: "",
      message3: "",
      img: "",
    });
    count = 0;
    setModeell(false);
    console.log("schedule1 :>> ", schedule1);
    console.log("sche :>> ", "/tour-images/" + schedule1[0].img);
  };

  const handleTotalDay = () => {
    let array = [];
    for (let i = 1; i <= totalday; i++) {
      // console.log("i :>> ", i);
      array.push(i);
    }
    // console.log("array :>> ", array);
    setTotalDay(array);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !title1 ||
      !city1 ||
      !hotel1 ||
      !place1 ||
      !description1 ||
      !address1 ||
      !distance1 ||
      !groupSize1 ||
      !price1 ||
      !duration1 ||
      !flight1 ||
      !limit1 ||
      !pic1 ||
      !pic2 ||
      !pic3 ||
      !pic4 ||
      !pic5
    ) {
      ErrorToast("Please enter all data");
      setModal(true);
      if (schedule1.length === 0) {
        setModeell(true);
      }
    } else {
      let body = {
        title: title1,
        city: city1,
        price: price1,
        hotel: hotel1,
        desc: description1,
        maxGroupSize: groupSize1,
        address: address1,
        distance: distance1,
        duration: duration1,
        flight: flight1,
        place: place1,
        limit: limit1,
        photo: "/tour-images/" + pic1,
        photo1: "/tour-images/" + pic2,
        photo2: "/tour-images/" + pic3,
        photo3: "/tour-images/" + pic4,
        photo4: "/tour-images/" + pic5,
        reviews: addreview,
        featured: feature,
        schedule: schedule1,
        // schedule: {
        //   day: addSchedule.day1,
        //   atitle: addSchedule.atitle1,
        //   message1: addSchedule.msg1,
        //   message2: addSchedule.msg2,
        //   message3: addSchedule.msg3,
        //   img: "/tour-images/" + addSchedule.img1,
        // },
      };

      fetch("http://localhost:4000/api/v1/tours", {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => {
          // navigate('/dashboard')
          setModal(false);
          setModeell(false);
          SuccessToast("Tour Added Successfully!!");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "img") {
      setAddSchedule({
        ...addSchedule,
        [name]: "/tour-images/" + e.target.files[0].name,
      });
    } else {
      setAddSchedule({ ...addSchedule, [name]: value });
    }
  };

  useEffect(() => {
    handleTotalDay();
  }, [totalday]);

  const tid = localStorage.getItem("tid");
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
    <>
      <body id="body">
        <div className="containers">
          <nav className="navbar">
            <div className="nav_icon">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
            <div className="navbar__left">
              <a style={{ marginLeft: 40 }} className="active_link" href="#">
                Tour Packages
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
            size="xl"
            isOpen={modal}
            toggle={() => setModal(!modal)}
            style={{ marginTop: 60 }}
          >
            <form onSubmit={handleSubmit}>
              <ModalHeader
                toggle={() => setModal(false)}
                className="mt-1 d-flex justify-content-center updatemodalfooter"
                style={{ backgroundColor: "#16a08408" }}
              >
                <h3>Add Tour</h3>
              </ModalHeader>
              <ModalBody>
                <Row className="d-flex justify-content-center p-3">
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        placeholder="Title"
                        value={title1}
                        onChange={(e) => setTitle1(e.target.value)}
                        name="title"
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        value={city1}
                        onChange={(e) => setCity1(e.target.value)}
                        name="city"
                        placeholder="City"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        name="address"
                        placeholder="Address"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="number"
                        value={distance1}
                        onChange={(e) => setDistance1(e.target.value)}
                        name="distance"
                        placeholder="Distance"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="number"
                        value={groupSize1}
                        onChange={(e) => setGroupSize1(e.target.value)}
                        name="groupSize"
                        placeholder="GroupSize"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        value={duration1}
                        onChange={(e) => setDuration1(e.target.value)}
                        name="duration"
                        placeholder="Duration"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        value={hotel1}
                        onChange={(e) => setHotel1(e.target.value)}
                        name="hotel"
                        placeholder="Hotel"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        value={flight1}
                        onChange={(e) => setFlight1(e.target.value)}
                        name="flight"
                        placeholder="Flight"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        value={description1}
                        onChange={(e) => setDescription1(e.target.value)}
                        name="desc"
                        placeholder="Description"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        value={place1}
                        onChange={(e) => setPlace1(e.target.value)}
                        name="place"
                        placeholder="Place Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        value={addreview}
                        name="review"
                        placeholder="Add Review"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="text"
                        value={feature}
                        name="review"
                        placeholder="Add Review"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="number"
                        value={price1}
                        onChange={(e) => setPrice1(e.target.value)}
                        name="price"
                        placeholder="Price"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="number"
                        value={limit1}
                        onChange={(e) => setLimit1(e.target.value)}
                        name="price"
                        placeholder="Limit"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        style={{ cursor: "pointer" }}
                        type="text"
                        name="addactivity"
                        onClick={() => setModeell(true)}
                        placeholder="Add Activity"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="file"
                        onChange={(e) => {
                          setPic1(e.target.files[0]?.name);
                        }}
                        name="photo"
                        placeholder="Add Image"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="file"
                        onChange={(e) => {
                          setPic2(e.target.files[0]?.name);
                        }}
                        name="photo"
                        placeholder="Add Image"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="file"
                        onChange={(e) => {
                          setPic3(e.target.files[0]?.name);
                        }}
                        name="photo"
                        placeholder="Add Image"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="file"
                        onChange={(e) => {
                          setPic4(e.target.files[0]?.name);
                        }}
                        name="photo"
                        placeholder="Add Image"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <Input
                        type="file"
                        onChange={(e) => {
                          setPic5(e.target.files[0]?.name);
                        }}
                        name="photo"
                        placeholder="Add Image"
                      />
                    </FormGroup>
                  </Col>

                  {/* {duration1 &&
                    totalDay.map((v) => {
                      return <div>{`day${v}`}</div>;
                    })} */}
                </Row>
              </ModalBody>

              <div className="d-flex justify-content-center updatemodalfooter">
                <div className="text-center">
                  <Button className="addtour mt-3 mb-5">Add</Button>
                </div>
              </div>
            </form>
          </Modal>

          <Modal
            size="xl"
            isOpen={modeell}
            toggle={() => setModeell(!modeell)}
            style={{ marginTop: 60 }}
          >
            <form>
              <ModalHeader
                toggle={() => setModeell(false)}
                className="mt-1 d-flex justify-content-center updatemodalfooter"
                style={{ backgroundColor: "#16a08408" }}
              >
                <h3>Add Tour</h3>
              </ModalHeader>
              <ModalBody>
                {totalday ? (
                  <Row className="d-flex justify-content-center p-3 mt-4">
                    <Col
                      style={{
                        border: "1px solid gray",
                        borderRadius: 5,
                        padding: 20,
                        cursor: "pointer",
                      }}
                      className="mb-3"
                      lg="3"
                    >
                      {totalDay.map((v) => {
                        return (
                          <>
                            <div>
                              <CgCalendarToday
                                style={{
                                  fontSize: "1.5rem",
                                  marginInline: 10,
                                  fontWeight: "normal",
                                }}
                              />
                              {`Day ${v}`}
                            </div>
                          </>
                        );
                      })}
                    </Col>

                    <Col lg="9">
                      {
                        <div>
                          <Input
                            type="text"
                            value={addSchedule.day}
                            onChange={handleChange}
                            placeholder="Day"
                            name="day"
                          />
                        </div>
                      }
                      <br />

                      <div>
                        <Input
                          type="text"
                          value={addSchedule.atitle}
                          onChange={handleChange}
                          placeholder="Title"
                          name="atitle"
                        />
                      </div>
                      <br />
                      <div>
                        <Input
                          type="text"
                          value={addSchedule.message1}
                          onChange={handleChange}
                          placeholder="Message"
                          name="message1"
                        />
                      </div>
                      <br />
                      <div>
                        <Input
                          type="text"
                          value={addSchedule.message2}
                          onChange={handleChange}
                          placeholder="Message"
                          name="message2"
                        />
                      </div>
                      <br />
                      <div>
                        <Input
                          type="text"
                          value={addSchedule.message3}
                          onChange={handleChange}
                          placeholder="Message"
                          name="message3"
                        />
                      </div>
                      <br />
                      <div>
                        <Input type="file" onChange={handleChange} name="img" />
                      </div>
                    </Col>
                  </Row>
                ) : null}
              </ModalBody>
              <div className="d-flex justify-content-center updatemodalfooter">
                <div className="text-center">
                  <Button
                    className="addtour mt-3 mb-5"
                    onClick={count < totalDay.length - 1 ? addData : finish}
                  >
                    {count < totalDay.length - 1 ? "Add" : "Finish"}
                  </Button>
                </div>
              </div>
            </form>
          </Modal>

          <Modal
            size="lg"
            isOpen={model}
            toggle={() => setModel(!model)}
            style={{ marginTop: 60 }}
          >
            <ModalHeader
              toggle={() => setModel(false)}
              className="mt-1 d-flex justify-content-center updatemodalfooter"
              style={{ backgroundColor: "#16a08408" }}
            >
              <h3>Edit Tour</h3>
            </ModalHeader>
            <ModalBody>
              <Row className="p-3 d-flex justify-content-center">
                <Col lg="6">
                  <FormGroup className="d-flex">
                    <Col lg="3" className="mt-1 fw-bold">
                      Title:
                    </Col>
                    <Col lg="9">
                      <Input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      ></Input>
                    </Col>
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup className="d-flex">
                    <Col lg="3" className="mt-1 fw-bold">
                      City:
                    </Col>
                    <Col lg="9">
                      <Input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        // required
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup className="d-flex">
                    <Col lg="3" className="mt-1 fw-bold">
                      People:
                    </Col>
                    <Col lg="9">
                      <Input
                        type="number"
                        name="groupsize"
                        placeholder="GroupSize"
                        value={groupSize}
                        onChange={(e) => setGroupSize(e.target.value)}
                        // required
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup className="d-flex">
                    <Col lg="3" className="mt-1 fw-bold">
                      Duration:
                    </Col>
                    <Col lg="9">
                      <Input
                        type="text"
                        name="duration"
                        placeholder="Duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        // required
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup className="d-flex">
                    <Col lg="3" className="mt-1 fw-bold">
                      Flight:
                    </Col>
                    <Col lg="9">
                      <Input
                        type="text"
                        name="flight"
                        placeholder="Flight"
                        value={flight}
                        onChange={(e) => setFlight(e.target.value)}
                        // required
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup className="d-flex">
                    <Col lg="3" className="mt-1 fw-bold">
                      Price:
                    </Col>
                    <Col lg="9">
                      <Input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        // required
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup className="d-flex">
                    <Col lg="3" className="mt-1 fw-bold">
                      Hotel:
                    </Col>
                    <Col lg="9">
                      <Input
                        type="text"
                        name="hotel"
                        placeholder="Hotel"
                        value={hotel}
                        onChange={(e) => setHotel(e.target.value)}
                        // required
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup className="d-flex">
                    <Col lg="3" className="mt-1 fw-bold">
                      Distance:
                    </Col>
                    <Col lg="9">
                      <Input
                        type="number"
                        name="distance"
                        placeholder="Distance"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        // required
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup className="d-flex">
                    <Col lg="3" className="mt-1 fw-bold">
                      Address:
                    </Col>
                    <Col lg="9">
                      <Input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        // required
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup className="d-flex">
                    <Col lg="3" className="mt-1 fw-bold">
                      Limit:
                    </Col>
                    <Col lg="9">
                      <Input
                        type="number"
                        name="limit"
                        placeholder="Limit"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        // required
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col lg="12">
                  <FormGroup className="d-flex">
                    <Col lg="1" className="mt-1 fw-bold">
                      Desc:
                    </Col>
                    <Col lg="11">
                      <Input
                        style={{ marginLeft: 27, width: "96%" }}
                        type="text"
                        name="desc"
                        placeholder="Description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        // required
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col className="mb-4" lg="12">
                  <FormGroup className="d-flex">
                    <Col lg="1" className="mt-1 fw-bold">
                      Place:
                    </Col>
                    <Col lg="11">
                      <Input
                        style={{ marginLeft: 27, width: "96%" }}
                        type="text"
                        name="place"
                        placeholder="Place"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        // required
                      />
                    </Col>
                  </FormGroup>
                </Col>

                <Col
                  style={{ backgroundColor: "#e2fbf6", fontSize: 25 }}
                  className="text-center mb-4 fw-bold p-3"
                  lg="12"
                >
                  Activities
                </Col>

                {day1?.map((a, i) => {
                  return (
                    <>
                      <Col lg="6">
                        <FormGroup className="d-flex">
                          <Col lg="3" className="mt-1 fw-bold">
                            Day:
                          </Col>
                          <Col lg="9">
                            <Input
                              type="text"
                              name="day"
                              placeholder="Day"
                              value={a?.day}
                              onChange={(e) => onchangearray(e, i)}
                              // required
                            />
                          </Col>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup className="d-flex">
                          <Col lg="3" className="mt-1 fw-bold">
                            Atitle:
                          </Col>
                          <Col lg="9">
                            <Input
                              type="text"
                              name="atitle"
                              placeholder="Atitle"
                              value={a?.atitle}
                              onChange={(e) => onchangearray(e, i)}
                              // onChange={(e) => setDay1(e.target.value)}
                              // required
                            />
                          </Col>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup className="d-flex">
                          <Col lg="3" className="mt-1 fw-bold">
                            Photo:
                          </Col>
                          <Col lg="9">
                            <Input
                              type="file"
                              name="img"
                              onChange={(e) => onchangearray(e, i)}
                            />
                          </Col>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup className="d-flex">
                          <Col lg="3" className="mt-1 fw-bold">
                            Message1:
                          </Col>
                          <Col lg="9">
                            <Input
                              type="text"
                              name="message1"
                              placeholder="Message1"
                              value={a?.message1}
                              onChange={(e) => onchangearray(e, i)}
                              // onChange={(e) => setDay1(e.target.value)}
                              // required
                            />
                          </Col>
                        </FormGroup>
                      </Col>

                      <Col lg="6"></Col>
                      <Col lg="6">
                        <FormGroup className="d-flex">
                          <Col lg="3" className="mt-1 fw-bold">
                            Message2:
                          </Col>
                          <Col lg="9">
                            <Input
                              type="text"
                              name="message2"
                              placeholder="Message2"
                              value={a?.message2}
                              onChange={(e) => onchangearray(e, i)}
                              // onChange={(e) => setDay1(e.target.value)}
                              // required
                            />
                          </Col>
                        </FormGroup>
                      </Col>

                      <Col lg="6"></Col>
                      <Col className="mb-3" lg="6">
                        <FormGroup className="d-flex">
                          <Col lg="3" className="mt-1 fw-bold">
                            Message3:
                          </Col>
                          <Col lg="9">
                            <Input
                              type="text"
                              name="message3"
                              placeholder="Message3"
                              value={a?.message3}
                              onChange={(e) => onchangearray(e, i)}
                              // onChange={(e) => setDay1(e.target.value)}
                              // required
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </ModalBody>

            <div className="d-flex justify-content-center updatemodalfooter">
              <div className="text-center">
                <Button
                  onClick={() => {
                    {
                      updateTour();
                    }
                    setModel(false);
                  }}
                  className="addtour mb-4"
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal>

          <main>
            <div className="main__container">
              <div className="main__title">
                <div className="main__greeting1">
                  <h1>Add New Package</h1>
                  <p>Welcome to your tour package panel</p>
                  <IoIosAddCircle
                    className="addicon"
                    role="button"
                    onClick={() => setModal(true)}
                  />
                </div>
              </div>
              <div className="main__title">
                <div className="main__greeting2">
                  <h1>All Package</h1>
                  {/* <p>Welcome to your user panel</p> */}
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
                      placeholder="Search by city or title"
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
                        <tr>
                          <th style={{ width: "10%" }} scope="col">
                            Image
                          </th>
                          <th scope="col">Title</th>
                          <th scope="col">Location</th>
                          <th scope="col">GroupSize</th>
                          <th scope="col">Duration</th>
                          <th scope="col">Flight</th>
                          <th scope="col">Price</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.length !== 0 ? (
                          rec?.map((val, i) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    <img
                                      src={val?.photo}
                                      style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 5,
                                        objectFit: "cover",
                                      }}
                                    />
                                  </td>
                                  <td>{val?.title}</td>
                                  <td>{val?.city}</td>
                                  <td>
                                    <div style={{ marginLeft: "28px" }}>
                                      {val?.maxGroupSize}
                                    </div>
                                  </td>
                                  <td>{val?.duration}</td>
                                  <td>{val?.flight}</td>
                                  <td>₹ {val?.price}</td>
                                  <td>
                                    <AiFillEye
                                      style={{
                                        fontSize: "1.5rem",
                                        color: "#16a085",
                                        cursor: "pointer",
                                        marginRight: 2,
                                      }}
                                      onClick={() => {
                                        setMoodel(true);
                                        localStorage.setItem("tid", val?._id);
                                      }}
                                    />
                                    <FaEdit
                                      role="button"
                                      style={{
                                        fontSize: "1.3rem",
                                        color: "green",
                                        marginInline: 8,
                                      }}
                                      onClick={() => {
                                        setModel(true);
                                        edit(val);
                                      }}
                                    />
                                    <MdDelete
                                      onClick={() => {
                                        Swal.fire({
                                          title:
                                            "Are you sure you want to delete this tour?",
                                          showConfirmButton: true,
                                          showCancelButton: true,
                                          confirmButtonText: "OK",
                                          cancelButtonText: "Cancel",
                                          icon: "warning",
                                        }).then((result) => {
                                          if (result.isConfirmed) {
                                            deleteTour(val?._id);
                                          } else
                                            ErrorToast(
                                              "Something went wrong!!"
                                            );
                                        });
                                      }}
                                      role="button"
                                      style={{
                                        fontSize: "1.3rem",
                                        color: "#EB455F",
                                      }}
                                    />
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        ) : (
                          <tr className="d-flex flex-column">
                            <img
                              style={{ width: "180%", marginLeft: "380%" }}
                              src={image}
                            />
                            <h5
                              style={{
                                marginLeft: "410%",
                                width: "200%",
                                marginTop: -30,
                              }}
                            >
                              No tour found
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

          <Modal
            size="xl"
            isOpen={moodel}
            toggle={() => setMoodel(!moodel)}
            style={{ marginTop: 60 }}
          >
            <ModalHeader
              toggle={() => setMoodel(false)}
              className="mt-1 d-flex justify-content-center updatemodalfooter"
              style={{ backgroundColor: "#16a08408" }}
            >
              <h3>Tour Details</h3>
            </ModalHeader>
            <ModalBody className="p-4">
              {data?.map((d, i) => {
                return d?._id === tid ? (
                  <>
                    <Row>
                      <div className="tpdata d-flex">
                        <Col className="col-md-4">
                          <div key={i}>
                            <img
                              style={{ width: "100%", borderRadius: 5 }}
                              src={d?.photo}
                            />
                          </div>
                        </Col>

                        <Col
                          className="tpdesc col-md-8"
                          style={{ marginInline: 20 }}
                        >
                          <Col
                            style={{
                              fontSize: 23,
                              fontWeight: "bold",
                              marginTop: 10,
                            }}
                            lg="6"
                            className="mb-3"
                          >
                            {d?.title}
                          </Col>
                          <Col lg="12" className="mb-3">
                            <i className="ri-map-pin-user-fill">
                              <span
                                style={{
                                  marginInline: 5,
                                  fontFamily: "Lato",
                                  fontSize: 17,
                                }}
                              >
                                {d?.address}
                              </span>
                            </i>
                          </Col>

                          <Col lg="12" className="mb-3">
                            <span>
                              <i className="ri-map-pin-2-line"></i> {d?.city}
                            </span>
                            <span style={{ marginInline: 40 }}>
                              <i className="ri-money">
                                <HiOutlineCurrencyRupee
                                  style={{ marginTop: "-6px", fontSize: 17 }}
                                />
                              </i>{" "}
                              {d?.price} /per person
                            </span>
                            <span>
                              <i className="ri-map-pin-time-line"></i>{" "}
                              {d?.distance} k/m
                            </span>
                          </Col>

                          <Col lg="12" className="mb-3">
                            <span>
                              <i className="ri-group-line"></i>{" "}
                              {d?.maxGroupSize} people
                            </span>
                            <span style={{ marginInline: 40 }}>
                              <i className="ri-calendar-todo-fill"></i>{" "}
                              {d?.duration}
                            </span>
                            <span>
                              <i className="ri-flight-takeoff-fill"></i>{" "}
                              {d?.flight}
                            </span>
                          </Col>

                          <Col lg="12" className="mb-5">
                            <span>
                              <i className="ri-taxi-fill"></i> (Cab) +
                              <i className="ri-restaurant-fill"></i> (Breakfast)
                            </span>
                            <span style={{ marginInline: 40 }}>
                              <i className="ri-hotel-fill"></i> {d?.hotel}
                            </span>
                          </Col>
                        </Col>
                      </div>

                      <Col lg="12" className="tptitle mb-3">
                        <h5 style={{ marginTop: 5 }} className="fw-bold mb-2">
                          Description
                        </h5>
                        <p>{d?.desc}</p>
                      </Col>

                      <Col lg="12" className="tptitle mb-3">
                        <h5 className="fw-bold mb-2">Places to Visit</h5>
                        <p>{d?.place}</p>
                      </Col>

                      <Col lg="12">
                        <h5 className="fw-bold mb-4">Activity</h5>
                        {d?.schedule?.map((v, i) => {
                          return (
                            <>
                              <div
                                className="accordion-item"
                                style={{ marginLeft: "-10px" }}
                              >
                                <h2
                                  className="accordion-header"
                                  id={"heading" + i}
                                >
                                  <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={"#collapse" + i}
                                    aria-expanded="false"
                                    aria-controls={"collapse" + i}
                                  >
                                    <RiArrowDropRightFill className="fs-1" />
                                    {v?.day} : {v?.atitle}
                                  </button>
                                </h2>
                                <div
                                  id={"collapse" + i}
                                  className="accordion-collapse collapse"
                                  aria-labelledby={"heading" + i}
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="accordion-body">
                                    <div className="d-flex mt-4 ms-3">
                                      <img
                                        src={v?.img}
                                        style={{
                                          width: "25%",
                                          height: "28vh",
                                          borderRadius: 10,
                                        }}
                                      />
                                      <div className="ms-4">
                                        <span className="mb-3">
                                          <div
                                            style={{
                                              color: "#000",
                                              fontSize: "1rem",
                                            }}
                                          >
                                            {v?.message1}
                                          </div>
                                        </span>
                                        <span className="ms-3 mb-3">
                                          <div
                                            style={{
                                              color: "#000",
                                              fontSize: "1rem",
                                            }}
                                          >
                                            {v?.message2}
                                          </div>
                                        </span>
                                        <span className="ms-3 mb-3">
                                          <div
                                            style={{
                                              color: "#000",
                                              fontSize: "1rem",
                                            }}
                                          >
                                            {v?.message3}
                                          </div>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <hr />
                            </>
                          );
                        })}
                      </Col>
                    </Row>
                  </>
                ) : (
                  ""
                );
              })}
            </ModalBody>
          </Modal>

          {/* <Modal
            size="lg"
            isOpen={modeel}
            toggle={() => setModeel(!modeel)}
            style={{ marginTop: 60 }}
          >
            <ModalHeader
              toggle={() => setModeel(false)}
              className="mt-1 d-flex justify-content-center updatemodalfooter"
              style={{ backgroundColor: "#16a08408" }}
            >
              <h3>All Activity</h3>
            </ModalHeader>
            <ModalBody>
              {action?.schedule?.map((i) => {
                return (
                  <>
                    <div className="mb-3 fw-bold fs-5">
                      {i?.day} : {i?.atitle}
                    </div>

                    <div className="d-flex mb-5">
                      <img
                        src={i?.img}
                        style={{
                          width: "30%",
                          height: "28vh",
                          borderRadius: 5,
                          objectFit: "cover",
                        }}
                        className="me-3"
                      />
                      {i?.message1}
                      <br />
                      <br />
                      {i?.message2}
                      <br />
                      <br />
                      {i?.message3}
                      <br />
                    </div>
                  </>
                );
              })}
            </ModalBody>
          </Modal> */}

          {/* <!-- SIDEBAR START HERE --> */}
          <div id="sidebar">
            <div className="sidebar__title">
              <div className="sidebar__img">
                <img src={logo} alt="logo" />
              </div>
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
                  onClick={getPackageData}
                  className="dnav"
                  to="/tourpackages"
                >
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
    </>
  );
}

export default TourPackages;
