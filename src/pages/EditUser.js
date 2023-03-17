import React, { useState,useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate,useParams } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { getSingleUser, updateUser } from '../redux/action';


const EditUser = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    });

    const [error, SetError] = useState("");

    const { name, email, contact, address } = state;

   
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let {id}=useParams();

 const {user} =useSelector((state)=>state.data);   


 useEffect(()=>{
    dispatch(getSingleUser(id));
},[])

useEffect(()=>{
    if(user){
        setState({...user})
    }
   
},[user])

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !address || !contact || !email) {
            SetError("please fill form");
        }
        else {
            dispatch(updateUser(state,id));
            navigate("/");
            SetError("");
        }
    }

    return (

        <div>
            <button variant="contained" color='secondry' type='submit' style={{ width: "100px", margintop: "20px" }}
                onClick={() => navigate("/")}>
                Go Back
            </button>


            <h2>Edit User</h2>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off" onSubmit={handleSubmit}
            >

                <TextField id="standard-basic" label="Name"  
                value={name || ""}
                 type="text"
                 name="name" 
                 onChange={handleInputChange}
                 />
                <br />
                <TextField id="standard-basic" label="Email" 
                    value={email || ""}
                    type="email"
                    name="email"
                    onChange={handleInputChange} />
                <br />
                <TextField id="standard-basic" label="Contact" 
                    value={contact || ""}
                    type="number"
                    name="contact"
                    onChange={handleInputChange}
                />
                <br />
                <TextField id="standard-basic" label="Address" 
                    value={address || ""}
                    type="text"
                    name="address"
                    onChange={handleInputChange} />
                <br />
                <button variant="contained" color='success' type='submit' style={{ width: "100px" }}
                    onChange={handleInputChange}>
                    Update
                </button>
            </Box>
        </div>
    )
}

export default EditUser
