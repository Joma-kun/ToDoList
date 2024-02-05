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

// DBにtaskを追加
func AddTask(name string) (*Task, error) {

	// 新たなuuidを生成
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

	// taskをDBのTaskテーブルに追加
	err = db.Create(&task).Error

	// taskのポインタ と errを返す
	return &task, err
}

// あるID(引数)のtaskの完了状態を変更
func ChangeFinishedTask(taskID uuid.UUID) error {

	// DBのTaskテーブルからtaskIDと一致するidを探し，そのFinishedをtureにする
	err := db.Model(&Task{}).Where("id = ?", taskID).Update("finished", true).Error
	return err
}

// あるID(引数)のtaskを削除
func DeleteTask(taskID uuid.UUID) error {

	// DBのTaskテーブルからtaskIDと一致するidを探し，そのタスクを削除
	err := db.Where("id = ?", taskID).Delete(&Task{}).Error
	return err
}
