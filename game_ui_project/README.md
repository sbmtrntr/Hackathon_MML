# UI画面接続方法

0. データベースを作成していない場合
.gitignoreでデータベースだけはgithubにアップしていないので、
自分の環境で動かすときは以下のコマンドでdb.sqlite3を作る必要がある
```bash
python manage.py migrate
```

1. Django の開発用ウェブサーバーを起動
```bash
python manage.py runserver
```

2. ユーザー登録画面への遷移
```bash
http://localhost:8000/login_app/signup/
```

3. ユーザー登録後のログイン
```bash
http://localhost:8000/login_app/login/
```

4. ログイン後のログアウト
```bash
http://localhost:8000/login_app/logout/
```

5. ログイン後に自分の情報を表示
```bash
http://localhost:8000/login_app/user/
```

6. ログイン後に他のユーザー情報を表示
```bash
http://localhost:8000/login_app/other/
```

# 参考にさせてもらったサイト
https://daeudaeu.com/django-login/#i-8