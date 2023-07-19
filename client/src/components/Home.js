import React, { useContext, useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { addData, updateData, delData } from './context/ContextProvider';
const Home = () => {
  const {uData, setUData} = useContext(addData);
  const {upData, setUpData} = useContext(updateData);
  const {dltData, setDltData} = useContext(delData);
  const [getUserData, setUserData] = useState([]);
  
  console.log(getUserData);
  const getData = async (e) => {
    const res = await fetch('/getData', {
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
      setDltData(deleteData);
      getData();
    }
  }
  return (
    <>
      {
        uData ?
          <>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>{uData.name}</strong> User Added Successfully!!!.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </>
          :
          <>
            ""
          </>
      }
      {
        upData ?
          <>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>{upData.name}</strong> User has been updated Successfully!!!.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </>
          :
          <>
            ""
          </>
      }
      {
        dltData ?
          <>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>{dltData.name}</strong> User has been deleted Successfully!!!.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </>
          :
          <>
            ""
          </>
      }
      <div className='mt-5'>
        <div className='container'>
          <div className='add_btn mt-2 mb-2'>
            <NavLink to="/register" className='btn btn-primary'>Add data</NavLink>
          </div>
          <table class="table">
            <thead>
              <tr className='table-dark'>
                <th scope="col">id</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Job</th>
                <th scope="col">Number</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                getUserData.map((element, id) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{id + 1}</th>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.work}</td>
                        <td>{element.mobile}</td>
                        <td className='d-flex justify-content-between'>
                          <NavLink to={`view/${element._id}`}><button className='btn btn-success'><RemoveRedEyeIcon /></button></NavLink>
                          <NavLink to={`edit/${element._id}`}><button className='btn btn-primary'><CreateIcon /></button></NavLink>
                          <button onClick={() => deleteUser(element._id)} className='btn btn-danger'><DeleteOutlineIcon /></button>
                        </td>
                      </tr>
                    </>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home
