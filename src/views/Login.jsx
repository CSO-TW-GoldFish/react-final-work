import axios from "axios"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
const { VITE_APP_API_URL } = import.meta.env

function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function login() {
        (async () => {
            await axios.post(`${VITE_APP_API_URL}/users/sign_in`, {email, password})
                .then((response) => {
                    const token = response.data.token
                    document.cookie = `token=${token};`

                    Swal.fire({
                        title: '登入成功',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    })

                    navigate('/todoList')
                })
                .catch((error) => {
                    Swal.fire({
                        title: "登入失敗",
                        text: error.response.data.message,
                    })
                })
        })()
    }

    return (
        <div id="loginPage" className="bg-yellow">
            <div className="container loginPage vhContainer ">
                <div className="side">
                    <a href="/react-final-work/#"><img className="logoImg" src="/react-final-work/logo_lg.svg" alt="" /></a>
                    <img className="d-m-n" src="/react-final-work/left.svg" alt="workImg" />
                </div>
                <div>
                    <form className="formControls" action="index.html">
                        <h2 className="formControls_txt">最實用的線上待辦事項服務</h2>
                        <label className="formControls_label" htmlFor="email">Email</label>
                        <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" onChange={(e) => setEmail(e.target.value)} required />
                        <label className="formControls_label" htmlFor="pwd">密碼</label>
                        <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼"  onChange={(e) => setPassword(e.target.value)} required />
                        <input className="formControls_btnSubmit" type="button" onClick={() => login()} value="登入" />
                        <NavLink className="formControls_btnLink" to="/signUp">註冊帳號</NavLink>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login