## 使用技術
<p style="display: inline">
<img src="https://img.shields.io/badge/Javascript-blue.svg?logo=javascript&style=flat">
<img src="https://img.shields.io/badge/React-blue.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/Go-red.svg?logo=go&style=flat">
<img src="https://img.shields.io/badge/MySQL-yellow.svg?logo=mysql&style=flat">
<img src="https://img.shields.io/badge/Dcoker-gray.svg?logo=docker&style=flat">
</p>

## 起動方法
- Dockerコンテナの起動
    - serverディレクトリで `docker compose up -d --build`
- サーバーの起動
    - serverのターミナルで `go run main.go`
- アプリの実行
    - clientディレクトリで `npm start`

## 概要
フロント・バックエンドの学習のために作成したToDoリスト管理用アプリケーションです。 

### 利用方法
1. 画面上部の入力欄に追加したいタスクを記入

![image](https://github.com/Joma-kun/ToDoList/assets/63985130/32be0d13-27c9-4802-baf7-38d16a3f23a1)

2. [登録]ボタンを押下することで[未完]一覧にタスクを追加 

![image](https://github.com/Joma-kun/ToDoList/assets/63985130/377a9695-4df5-4acf-be01-c0a4edbc7e65)

3. タスクを終えた後、[完了する]ボタンを押下することで[完了]一覧にタスクを追加 

![image](https://github.com/Joma-kun/ToDoList/assets/63985130/b9779411-d0a8-4700-9115-9c713b060d2c)

4. タスクを削除したい場合は[削除する]ボタンを押下することで削除可能

![image](https://github.com/Joma-kun/ToDoList/assets/63985130/ae238084-c7bc-4f95-b42e-c376debe62d0)

## 参考
[ReactでToDoリストを作る](https://trap.jp/post/1486/)  
[Webエンジニアになろう講習会](https://traptitech.github.io/naro-text/)