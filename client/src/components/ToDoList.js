import {useState} from "react"

function ToDoList() {
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [completedTodos, setCompletedTodos] = useState([])

    //todoが空文字列でない場合，新しくタスクを追加
    function handlePush() {
        if (todo !== "") {
            setTodos(todos.concat([todo]))
            setTodo("")
        }
    }

    return (
        <div>
            <h1>ToDoリスト</h1>

            {/* 入力欄への変更(文字入力)をtodoに反映 */}
            <input value={todo} onChange={(e) => setTodo(e.target.value)} />

            {/* ボタン押下でhandlePushを実行 */}
            <button onClick={handlePush}>登録</button>
            <h2>タスク一覧</h2>
            <h3>完了</h3>

            {/* keyの変化(要素の追加・削除)を検知し，リストを更新 */}
            <ul>
                {completedTodos.map((completedTodo, index) => (
                    <li key={index}>{completedTodo}</li>
                ))}
            </ul>
            <h3>未完</h3>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </div>
    )
}

export default ToDoList