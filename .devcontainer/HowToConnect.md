# ゲームサーバへのつなぎ方


## 初めてサーバーを立ち上げる場合
1. コンテナを作成する
    1. VSCodeを開く
    2. 以下をターミナルで実行
        ```
        git clone https://github.com/sbmtrntr/Hackathon_MML.git
        ```
    3. 拡張機能"DevContainer: Open Folder in Container..."を実行
  
2. ポートフォワードの設定をする
    1. 以下を実行してコンテナのIPアドレス取得
        ```
        hostname -I
        ```
    2. Ctrl+@ -> "ポート" -> "ポートの追加"より、`[取得したIP]:8000`を追加
3. サーバーを実行する
    1. プロジェクトディレクトリに移動
        ```
        cd login_project
        ```
    2. pythonを実行する
        ```
        python manage.py runserver [取得したIP]:8000
        ```
4. ホストマシンのIPアドレスにアクセスする
    http://[ホストマシンIP]:8000

## 次回以降立ち上げる場合
1. VSCodeを開く
2. 拡張機能"DevContainer: Open Folder in Container..."を実行
3. pythonを実行する
    ```
    python manage.py runserver [取得したIP]:8000
    ```
4. ホストマシンのIPアドレスにアクセスする
    http://[ホストマシンIP]:8000


