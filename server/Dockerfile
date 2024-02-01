# ベースとなるDockerイメージ指定
FROM golang:1.21.1-alpine as server-build

# コンテナ内の作業ディレクトリを作成し、そこを指定
WORKDIR  /home/joma/dev/todoList/server
# ローカルの現在のディレクトリから、コンテナの作業ディレクトリにコピー
COPY . .
# alpineパッケージのアップデート
RUN apk upgrade --update && \
    apk --no-cache add git