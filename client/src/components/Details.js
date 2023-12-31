import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useHistory, useParams } from 'react-router-dom';
const Details = () => {
  const history = useHistory("");
  const { id } = useParams();
  console.log(id);
  const [getUserData, setUserData] = useState([]);
  console.log(getUserData);
  const getData = async () => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      console.log("Error");
    }
    else {
      setUserData(data);
      console.log("Get Data");
    }
  }
  useEffect(() => {
    getData();
  }, [])
  const deleteUser = async (id) => {
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteData = await res2.json();
    console.log(deleteData);
    if (res2.status === 422 || !deleteData) {
      console.log("Error");
    }
    else {
      console.log("User Deleted Successfully!!!");
      history.push("/");
    }
  }
  return (
    <div className='container mt-3'>
      <h1 style={{ fontWeight: 400 }}>Welcome to Garvit Sharma</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className='add_btn'>
            <NavLink to={`/edit/${getUserData._id}`}><button className='btn btn-primary mx-2'><CreateIcon /></button></NavLink>
            <button onClick={() => deleteUser(getUserData._id)} className='btn btn-danger'><DeleteOutlineIcon /></button>
          </div>
          <div className='row'>
            <div className='left_view col-lg-6 col-md-6 col-12'>
              <img src="../images/profile.jpg" style={{ width: 50 }} alt="profile" />
              <h3 className='mt-3'>Name: <span style={{ fontWeight: 400 }}>{getUserData.name}</span></h3>
              <h3 className='mt-3'>Age: <span style={{ fontWeight: 400 }}>{getUserData.age}</span></h3>
              <p className='mt-3'><MailOutlineIcon /> Email: <span>{getUserData.email}</span></p>
              <p className='mt-3'><WorkIcon /> Occupation: <span>{getUserData.work}</span></p>
            </div>
            <div className='right_view col-lg-6 col-md-6 col-12'>
              <p className='mt-5'><PhoneAndroidIcon />Mobile: <span>{getUserData.mobile}</span></p>
              <p className='mt-3'><LocationOnIcon /> Location: <span>{getUserData.address}</span></p>
              <p className='mt-3'>Description: <span>{getUserData.desc}</span></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Details
