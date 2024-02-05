package model

import (
	"github.com/google/uuid"
	_ "gorm.io/gorm"
)

// Task型の定義
type Task struct {
	ID       uuid.UUID
	Name     string
	Finished bool
}

// 	DBからtask一覧を取得する
func GetTasks() ([]Task, error) {

	// tasksを空のタスクのスライスで定義
	var tasks []Task

	// tasksにDBのタスク全てを代入．その操作の成否をerrと定義
	// GORMではdb.Find()の検索結果を引数に直接代入することに注意
	err := db.Find(&tasks).Error

	return tasks, err
}

// 関数 AddTask は引数がstring型のnameで、戻り値はTaskのポインターとerror型である
func AddTask(name string) (*Task, error) {

	// 新たなuuidを生成し、これをid、成否をerrとする（*2）
	id, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	// ID,Name,Finishedにid,name,false を代入したTask型のtaskを定義
	task := Task{
		ID:       id,
		Name:     name,
		Finished: false,
	}

	// taskをDBのTaskテーブルに追加。その成否を(ry
	err = db.Create(&task).Error

	// taskのポインタ と errを返す
	return &task, err
}

// 関数 ChangeFinishedTaskの引数はuuid.UUID型のtaskIDで、戻り値はerror型である
func ChangeFinishedTask(taskID uuid.UUID) error {

	// DBのTaskテーブルからtaskIDと一致するidを探し、そのFinishedをtureにする(*3)
	err := db.Model(&Task{}).Where("id = ?", taskID).Update("finished", true).Error
	return err
}

func DeleteTask(taskID uuid.UUID) error {
	// DBのTaskテーブルからtaskIDと一致するidを探し、そのタスクを削除する
	err := db.Where("id = ?", taskID).Delete(&Task{}).Error
	return err
}
