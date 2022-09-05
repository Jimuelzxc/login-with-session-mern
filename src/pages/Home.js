import axios from "axios"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

export default function Home() {
    axios.defaults.withCredentials = true;
    let navigate = useNavigate()
    const [loginStatus, setLoginStatus] = useState("")
    useEffect(() => {
        axios.get("http://localhost:8000/signin").then((response) => {
            if(response.data.loggedIn){
                setLoginStatus(response.data.user)
            }else{
                navigate('/signin')
            }
        })
    }, [])
    function successLogout(){
        axios.get('http://localhost:8000/logout').then((response) => {
            console.log(response.data)
            if(response.data.status){
                navigate('/signin')
            }
        })
    }
    return (
        <div>
            <h1>{loginStatus.username}</h1>
            <button onClick={successLogout} className="btn btn-primary">Logout</button>
        </div>
    )
}