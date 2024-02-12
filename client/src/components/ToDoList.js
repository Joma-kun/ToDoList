import axios from "axios"
import "./ToDoList.css"
import {useState, useEffect} from "react"

function ToDoList() {
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [completedTodos, setCompletedTodos] = useState([])

    // タスクを取得する
    function handleGetTodos() {

        // GETリクエストを送信
        axios.get("http://localhost:8000/api/tasks").then((res) => {
            let tempCompletedTodos = []
            let tempTodos = []

            // 配列の中身を確認し，完と未完に分類
            for (let i=0; i<res.data.length; i++) {
                if (res.data[i].Finished) { // finished->Finishedに修正
                    tempCompletedTodos = tempCompletedTodos.concat([
                        {
                            id: res.data[i].ID, //id->IDに修正
                            name: res.data[i].Name, // name->Nameに修正
                        },
                    ])
                } else {
                    tempTodos = tempTodos.concat([
                        {
                            id: res.data[i].ID, //id->IDに修正
                            name: res.data[i].Name, // name->Nameに修正
                        },
                    ])
                }
            }
            setCompletedTodos(tempCompletedTodos)
            setTodos(tempTodos)
        })
    }

    // ページを読み込んだ時に関数を実行
    useEffect(() => {
        handleGetTodos()
    }, [])

    //タスクを追加する
    function handlePush() {

        ////todoが空文字列でない場合，新しくタスクを追加．その後入力欄を初期化
        if (todo !== "") {

            // POSTリクエストを送信
            axios.post("http://localhost:8000/api/tasks", {
                name: todo,
            }).then(() => {

                // リストの中身を更新
                handleGetTodos()
            })
            setTodo("")
        }
    }

    //タスクを未完から完了にする
    function handleComplete(index) {
        // PUTリクエストを送信(FalseをTrueにするだけなので送信データなし)
        axios.put(`http://localhost:8000/api/tasks/` + todos[index].id).then(() => {

            // リストの中身を更新
            handleGetTodos()
        })
    }

    // タスクを削除する
    function handleDelete(index) {

        // DELETEリクエストを送信
        axios.delete(`http://localhost:8000/api/tasks/` + completedTodos[index].id).then(() => {
            
            // リストの中身を更新
            handleGetTodos()
        })
    }

    return (
        <div className="todoList">
            <h1 className="title">ToDoリスト</h1>

            {/* 入力欄への変更(文字入力)をtodoに反映 */}
            <input value={todo} onChange={(e) => setTodo(e.target.value)} />

            {/* ボタン押下でhandlePushを実行 */}
            <button onClick={handlePush} className="button">登録</button>
            <h2>タスク一覧</h2>
            <h3>完了</h3>

            {/* keyの変化(要素の追加・削除)を検知し，リストを更新 */}
            <ul className="ul">
                {completedTodos.map((completedTodo, index) => (
                    <li key={completedTodo.id} className="li">
                        {completedTodo.name}

                        {/* ボタン押下でhandleDeleteを実行 */}
                        <button onClick={() => handleDelete(index)}>削除する</button>
                        </li>
                ))}
            </ul>
            <h3>未完</h3>
            <ul className="ul">
                {todos.map((todo, index) => (
                    <li key={todo.id} className="li">
                        {todo.name}
                        {/* ボタン押下でhandleCompleteを実行 */}
                        <button onClick={() => handleComplete(index)}>完了する</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ToDoList