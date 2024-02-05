package router

import (
	"net/http"
	"todoList/model"

	"github.com/google/uuid"

	"github.com/labstack/echo/v4"
)

// Task一覧をjsonで返す
func GetTasksHandler(c echo.Context) error {

	// modelの関数GetTasksを実行
	tasks, err := model.GetTasks()

	// errが空でない時(err発生時)は StatusBadRequestを返す
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Bad Request")
	}

	// StasusOK と tasksを返す
	return c.JSON(http.StatusOK, tasks)
}

type ReqTask struct {
	Name string `json:"name"`
}

// 追加したtaskをjsonで返す
func AddTaskHandler(c echo.Context) error {

	// 空のReqTaskであるreqを定義
	var req ReqTask

	// bodyのjsonファイルをbind
	// bind: DBやHTTPリクエストのデータをGoの構造体(今回はreq)に対応付け
	err := c.Bind(&req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Bad Request")
	}

	// taskを空のモデルのTaskで定義
	var task *model.Task

	// modelのAddTask関数を実行
	task, err = model.AddTask(req.Name)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Bad Request")
	}

	// StastsOK と 追加されたtaskを返す
	return c.JSON(http.StatusOK, task)
}

// taskの完了状態を変更する関数を呼び出す
func ChangeFinishedTaskHandler(c echo.Context) error {

	// taskIDのパスパラメータ(string型)を取得し，uuid型に変換
	taskID, err := uuid.Parse(c.Param("taskID"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Bad Request")
	}

	// modelのChangeFinishedTaskを実行
	err = model.ChangeFinishedTask(taskID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Bad Request")
	}
	return c.NoContent(http.StatusOK)
}

// taskを削除する関数を呼び出す
func DeleteTaskHandler(c echo.Context) error {

	// taskIDのパスパラメータ(string型)を取得し，uuid型に変換
	taskID, err := uuid.Parse(c.Param("taskID"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Bad Request")
	}

	// modelのDeleteTaskを実行
	err = model.DeleteTask(taskID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Bad Request")
	}
	return c.NoContent(http.StatusOK)
}
