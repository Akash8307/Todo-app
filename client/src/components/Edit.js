import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { updateData } from './context/ContextProvider';

const Edit = () => {
    // const [getUserData, setUserData] = useState([]);
    // console.log(getUserData);
    const {upData, setUpData} = useContext(updateData);
    const history = useHistory("");
    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        address: "",
        desc: "",
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }
    const { id } = useParams();
    console.log(id);
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
            setINP(data);
            console.log("Get Data");
        }
    }
    useEffect(() => {
        getData();
    }, [])
    const updateUser = async(e) => {
        e.preventDefault();
        const {name, email, age, mobile, work, address, desc} = inpval;
        const res2 = await fetch(`/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, email, age, mobile, work, address, desc
            })
        })
        const data2 = await res2.json();
        console.log(data2);
        if(res2.status===422 || !data2){
            alert('Plz fill data');
        }
        else{
            alert('Data Updated Succesfully!!!');
            setUpData(data2);
            history.push("/");
        }
    }
    return (
        <div className='container'>
            <NavLink to="/">home2</NavLink>
            <form className='mt-4'>
                <div className='row'>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="name" name='name' value={inpval.name} onChange={setdata} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email" name='email' value={inpval.email} onChange={setdata} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" className="form-label">Age</label>
                        <input type="text" name='age' value={inpval.age} onChange={setdata} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" className="form-label">Mobile</label>
                        <input type="number" name='mobile' value={inpval.mobile} onChange={setdata} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" className="form-label">Work</label>
                        <input type="text" name='work' value={inpval.work} onChange={setdata} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" className="form-label">Address</label>
                        <input type="text" name='address' value={inpval.address} onChange={setdata} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" className="form-label">Description</label>
                        <textarea name='desc' value={inpval.desc} onChange={setdata} className="form-control" id="" cols="30" rows="5" ></textarea>
                    </div>
                    <button type="submit" onClick={updateUser} className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    )
}

export default Edit
