import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Swal from 'sweetalert2'
const { VITE_APP_API_URL } = import.meta.env

function TodoList() {

    const [token, setToken] = useState('')
    const [nickname, setNickname] = useState('')

    useEffect(() => {
        const cookies = document.cookie.split("; ")
        const cookieToken = cookies.find((row) => row.startsWith("token="))?.split("=")[1];

        setToken(cookieToken)

        ;(async () => {
            await axios.get(`${VITE_APP_API_URL}/users/checkout`, {
                headers: {
                    Authorization: cookieToken
                }
            })
            .then((response) => {
                setNickname(response.data.nickname)
            })
            .catch((error) => {
                console.log(error);
            })
        })()

    }, [])

    function signOut() {
        (async () => {
            await axios.post(`${VITE_APP_API_URL}/users/sign_out`, {}, {
                headers: {
                    Authorization: token
                }
            })
            .then((response) => {
                Swal.fire({
                    title: response.data.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
            })
            .catch((error) => {
                Swal.fire({
                    title: "登出失敗",
                    text: error.response.data.message,
                    icon: 'error'
                })
            })
        })()
    }
    
    return (
        <div id="todoListPage" className="bg-half">
        <nav>
            <h1><a href="/#/todoList" style={{backgroundImage: 'url("/logo.svg")'}}>ONLINE TODO LIST</a></h1>
            <ul>
                <li className="todo_sm"><a href="#/todoList"><span>{nickname}的代辦</span></a></li>
                <li><NavLink to="/" onClick={() => signOut()}>登出</NavLink></li>
            </ul>
        </nav>
        <div className="container todoListPage vhContainer">
            <div className="todoList_Content">
                <div className="inputBox">
                    <input type="text" placeholder="請輸入待辦事項" />
                    <a href="#">
                        <i className="fa fa-plus"></i>
                    </a>
                </div>
                <div className="todoList_list">
                    <ul className="todoList_tab">
                        <li><a href="#" className="active">全部</a></li>
                        <li><a href="#">待完成</a></li>
                        <li><a href="#">已完成</a></li>
                    </ul>
                    <div className="todoList_items">
                        <ul className="todoList_item">
                            <li>
                                <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" value="true" />
                                    <span>把冰箱發霉的檸檬拿去丟</span>
                                </label>
                                <a href="#">
                                    <i className="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" value="true" />
                                    <span>打電話叫媽媽匯款給我</span>
                                </label>
                                <a href="#">
                                    <i className="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" value="true" />
                                    <span>整理電腦資料夾</span>
                                </label>
                                <a href="#">
                                    <i className="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" value="true" />
                                    <span>繳電費水費瓦斯費</span>
                                </label>
                                <a href="#">
                                    <i className="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" value="true" />
                                    <span>約vicky禮拜三泡溫泉</span>
                                </label>
                                <a href="#">
                                    <i className="fa fa-times"></i>
                                </a>
                            </li>
                            <li>
                                <label className="todoList_label">
                                    <input className="todoList_input" type="checkbox" value="true" />
                                    <span>約ada禮拜四吃晚餐</span>
                                </label>
                                <a href="#">
                                    <i className="fa fa-times"></i>
                                </a>
                            </li>
                        </ul>
                        <div className="todoList_statistics">
                            <p> 5 個已完成項目</p>
                            <a href="#">清除已完成項目</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default TodoList