# 実行方法

## 環境
用意された Dockerfile で環境構築可能
- Python
- pytorch
- django
- opencv
- imutils
- dlib

## サーバーの起動
ローカルホストでの実行方法

### 初回実行時のみの操作
サーバー起動前に次のコマンドでデータベースを作成する
```
python manage.py migrate
```

### 毎回の操作
#### Docker を使用しない物理環境で実行する場合
次のコマンドでサーバーを起動後、http://127.0.0.1:8000/ にアクセス
```
python manage.py runserver
```

#### Docker 上で実行する場合
次のコマンドでサーバーを起動後、http://localhost:8000/ にアクセス
```
python manage.py runserver 0.0.0.0:8000
```