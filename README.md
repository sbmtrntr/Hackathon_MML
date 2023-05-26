# Streamlitを使った場合のひな形を作りました

## ※src/type_master/main.py内にコードが記述されています
---
## 使い方
1. git clone
2. pythonの実行環境を整える   
    1. Venvを用いる場合
       - VSCodeの拡張機能"Python"を入手 
       - Ctrl+Shift+P --> Python: Create Environmentをクリック
       - Venvを選択
       - インタープリターパスはデフォルトでOK
       - インストールの依存関係は`.devcontainer\requirements.txt`を選択
       - ```.venv\Scripts\activate```を実行すると仮想環境に入ります
       - 仮想環境から出る場合は```deactivate```を実行
    2. docker＋VSCodeを使う場合
       - VSCodeの拡張機能"Remote Development"を入手 
       - Ctrl+Shift+P --> DevContainers: Open Folder in Containerをクリック
       - フォルダ"Hackathon_MML"を選択
       - docker containerに入ります
    3. 手元の環境を汚してもイイよって場合
       - ```pip install -r .devcontainer\requirements.txt```を実行

3. ```streamlit run src/type_master/main.py```を実行
4. ここ(http://localhost:8501) にアクセス
5. 終了する場合は コマンドライン上で Ctrl+C.
---
## TODO
- gameのUIは果たしてどこまで作れるのか(あんま期待できない)
- デプロイの仕方を勉強する
- 視線検知のための勉強

=======
# 毎日の手順
 
1. ローカルのmainブランチで、最新のリモートリポジトリをpullする
```bash
git pull origin main
```

2. ローカルのmainブランチから、新しくブランチを作成する
```bash
git switch -c <ブランチ名>
```

3. 新しいブランチでファイルを更新した後、addしてcommitする
```bash
git add .
git commit -m "<メッセージ>"
```

4. リモートにpushする
```bash
git push origin <ブランチ名>
```

5. Githubでpull requestを作成する

終わり！