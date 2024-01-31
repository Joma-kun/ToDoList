import "./ToDoList.css"
import {useState} from "react"

function ToDoList() {
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [completedTodos, setCompletedTodos] = useState([])

    //タスクを追加する
    function handlePush() {
        ////todoが空文字列でない場合，新しくタスクを追加．その後入力欄を初期化
        if (todo !== "") {
            setTodos(todos.concat([todo]))
            setTodo("")
        }
    }

    //タスクを未完から完了にする
    function handleComplete(index) {
        //index番のタスクを完了に追加
        setCompletedTodos(completedTodos.concat(todos[index]))
        //index番以外のタスクをスライスし，それらを未完に追加(更新)
        setTodos(todos.slice(0, index).concat(todos.slice(index + 1)))
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
                    <li key={index} className="li">{completedTodo}</li>
                ))}
            </ul>
            <h3>未完</h3>
            <ul className="ul">
                {todos.map((todo, index) => (
                    <li key={index} className="li">
                        {todo}

                        {/* ボタン押下でhandleCompleteを実行 */}
                        <button onClick={() => handleComplete(index)}>完了する</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ToDoList