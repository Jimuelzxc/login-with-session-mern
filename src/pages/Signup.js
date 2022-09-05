import { useForm } from '../hooks/useForm'
import { useTheme } from "../hooks/useTheme"

import { useNavigate } from 'react-router-dom'
import { MdLightMode } from 'react-icons/md'

import axios from 'axios'

export default function Signup() {
    let navigate = useNavigate();
    const [mode, themeToggler] = useTheme('l')
    const [state, handleOnChange] = useForm({
        username: '',
        email: '',
        password: ''
    })
    function signupSuccess() {
        axios.post('http://localhost:8000/signup', {
            username: state.username,
            email: state.email,
            password: state.password
        }).then((result) => {
            if (result.data.status) {
                navigate('/signin')
            }else{
                console.log(result.data)
            }
        })
    }
    return (
        <div className="container-fluid vh-100 parent-container d-flex justify-content-center align-items-center position-relative" id={mode}>
            <div className="col-12 col-md-3 py-4 rounded-2">
                <div className="m-3 d-flex flex-column form-container">

                    {/* HEADER */}
                    <h1 id={mode} className="fw-bold">Sign Up</h1>

                    {/* INPUTS CONTAINER */}
                    <div className="inputs-container d-flex flex-column gap-4 ">
                        <div className="d-flex flex-column gap-3">
                            <label id={mode} className="fw-bold">Username</label>
                            <input
                                type="text"
                                id={mode}
                                className="input"
                                name="username"
                                onChange={handleOnChange}
                                autoFocus />
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <label id={mode} className="fw-bold">Email Address</label>
                            <input
                                type="text"
                                id={mode}
                                className="input"
                                name="email"
                                onChange={handleOnChange} />
                        </div>

                        <div className="d-flex flex-column gap-3">
                            <label id={mode} className="fw-bold">Password</label>
                            <input
                                type="text"
                                id={mode}
                                className="input"
                                name="password"
                                onChange={handleOnChange} />
                        </div>
                    </div>

                    {/* SUMBIT CONTAINER */}
                    <div className="d-flex flex-column gap-3">
                        <input
                            type="button"
                            value="Create Account"
                            className="submit-btn fw-bold"
                            onClick={signupSuccess} />
                        <label htmlFor="" className="text-center">Already have an account? <a href="/signin" id={mode}>Sign In</a></label>
                        <div className="d-flex align-items-center justify-content-center">
                            <button className="mode" onClick={themeToggler}>
                                <MdLightMode />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}