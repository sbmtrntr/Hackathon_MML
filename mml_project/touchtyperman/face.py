import cv2
import time

start = time.time()
path = "./img/train/0/image0.jpg"
# 画像の読み込み
img_gray = cv2.imread(path)
print(time.time() - start)
# 画像のグレースケール化
# img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# 学習済みモデルの読み込み
cascade = cv2.CascadeClassifier("models/haarcascade_frontalface_default.xml")
print(time.time() - start)
# 顔を検出する
lists = cascade.detectMultiScale(img_gray, minNeighbors=1, minSize=(100, 100))
# if len(lists):
#     # 顔を検出した場合、forですべての顔を赤い長方形で囲む
#     for (x,y,w,h) in lists:
#         cv2.rectangle(img, (x,y), (x+w, y+h), (0, 0, 255), thickness=2)
#     cv2.imshow('img', img)
#     cv2.waitKey(0)
# else:
#     print('Nothing')

print(len(lists) != 0)
print(time.time() - start)