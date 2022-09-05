import { useNavigate } from "react-router-dom"
import { useForm } from "../hooks/useForm"
import { useTheme } from "../hooks/useTheme"
import { MdLightMode } from 'react-icons/md'
import axios from 'axios'

export default function Signin() {
    axios.defaults.withCredentials = true;

    let navigate = useNavigate()
    const [mode, themeToggler] = useTheme('l')
    const [state, handleOnChange] = useForm({
        username: '',
        password: ''
    });

    function signinSuccess() {
        axios.post('http://localhost:8000/signin', {
            username: state.username,
            password: state.password
        }).then((result) => {
            if (result.data.status) {
                alert(result.data.message)

                navigate('/home')
            } else {
                alert(result.data.message)
            }
        })
    }

    return (
        <div className="container-fluid vh-100 parent-container d-flex justify-content-center align-items-center position-relative" id={mode}>
            <div className="col-12 col-md-3 py-4 rounded-2">
                <div className="m-3 d-flex flex-column form-container">
                    {/* HEADER */}
                    <h1 id={mode} className="fw-bold">Sign In</h1>

                    {/* INPUTS CONTAINER */}
                    <div className="inputs-container d-flex flex-column gap-4 ">
                        <div className="d-flex flex-column gap-3">
                            <label id={mode} className="fw-bold">Username or Email</label>
                            <input
                                type="text"
                                id={mode}
                                className="input"
                                name="username"
                                onChange={handleOnChange}
                                autoFocus />
                        </div>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex justify-content-between">
                                <label id={mode} className="fw-bold">Password</label>
                                <a href="" id={mode}>Forgot password?</a>
                            </div>
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
                        <input type="button" value="Sign In" className="submit-btn fw-bold" onClick={signinSuccess} />
                        <label htmlFor="" className="text-center">Don't have an account? <a href="/signup" id={mode}>Sign Up</a></label>
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