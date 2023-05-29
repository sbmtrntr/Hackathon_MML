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