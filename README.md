# Geek Touch Typer
サポーターズが主催するハッカソンで優秀賞を受賞した作品。(https://twitter.com/geek_pjt/status/1665287265659105281?s=61&t=BE0nPuZTR0ueV0_wTYGzWg)

## 紹介
![スクリーンショット 2023-06-16 12 27 50](https://github.com/sbmtrntr/Hackathon_MML/assets/97890981/bb328ebf-63e6-47e2-91ea-917ced8ca891)
![スクリーンショット 2023-06-16 12 28 28](https://github.com/sbmtrntr/Hackathon_MML/assets/97890981/7ef3cbaa-0537-466a-a23c-546302d13c36)
![スクリーンショット 2023-06-16 12 28 49](https://github.com/sbmtrntr/Hackathon_MML/assets/97890981/83bf55d3-14ae-42d9-95dd-86378f204e0a)
![スクリーンショット 2023-06-16 12 29 28](https://github.com/sbmtrntr/Hackathon_MML/assets/97890981/63e61e65-6047-4074-bac3-b4c8ccdc148e)

![index](https://github.com/sbmtrntr/Hackathon_MML/assets/97890981/0667595c-f121-4473-b8e0-be20296737bc)
![スクリーンショット (217)](https://github.com/sbmtrntr/Hackathon_MML/assets/97890981/2338620a-49a3-4627-bcaa-1ccb1bd9bc2a)



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
        cd MML_project
        ```
    2. データベースを作成する
        ```
        python manage.py migrate
        ```
    3. サーバを立ち上げる
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
