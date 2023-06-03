import cv2
import glob

import numpy as np
from PIL import Image

import torch
from torchvision import transforms
import torch.nn as nn



eye_cascade_path = 'models/haarcascade_eye.xml'
eye_cascade = cv2.CascadeClassifier(eye_cascade_path)




transform = transforms.Compose([
            # transforms.Resize((100, 90)),
            # transforms.CenterCrop(240),
            transforms.ToTensor(),
            # transforms.Normalize((0.5), (0.5))
        ])





# def test(file_list):
#     for f in file_list:
#         # src = cv2.imread('img/temp/image2.jpg')
#         src = cv2.imread(f)
#         src_gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)

#         eyes = eye_cascade.detectMultiScale(src_gray)
#         print(len(eyes), f)

#         # eye1 = eyes[0]
#         # eye2 = eyes[1]

#         # left_x = min(eye1[0], eye2[0])
#         # top_y = min(eye1[1], eye2[1])
#         # right_x = max(eye1[0] + eye1[2], eye2[0] + eye2[2])
#         # bottom_y = max(eye1[1] + eye1[3], eye2[1] + eye2[3])

#         # img = src_gray[top_y:bottom_y, left_x:right_x]
#         # _, img2 = cv2.threshold(img, 0, 255, cv2.THRESH_OTSU)
#         # print(img.shape)




src = cv2.imread('img/test/1/image_00004.jpg')
src_gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)

eyes = eye_cascade.detectMultiScale(src_gray, minNeighbors=1)

eye1 = eyes[0]
eye2 = eyes[1]

left_x = min(eye1[0], eye2[0])
top_y = min(eye1[1], eye2[1])
right_x = max(eye1[0] + eye1[2], eye2[0] + eye2[2])
bottom_y = max(eye1[1] + eye1[3], eye2[1] + eye2[3])

img = src_gray[top_y:bottom_y, left_x:right_x]
_, img2 = cv2.threshold(img, 0, 255, cv2.THRESH_OTSU)
print(img.shape)

cv2.imwrite('sample.jpg', img2)



def make_filepath_list():
    test_file_list = glob.glob('img/test/*/image*.jpg')
    return test_file_list




# def test(file_list, img0):
#     cos = nn.CosineSimilarity(dim=0)
#     for i, f in enumerate(file_list):
#         img = cv2.imread(f, cv2.IMREAD_GRAYSCALE)
#         # eye_img = eye_crop(img, landmark, transform)
#         img2 = transform(Image.fromarray(img))
#         result = cos(torch.flatten(img0), torch.flatten(img2)).item()
#         print(f'{result:.6f}\t{i}\t{result < 0.96}\t{f}')



# img0 = cv2.imread('img/temp/image0.jpg')
# img1 = cv2.imread('img/temp/image1.jpg')
# img2 = cv2.imread('img/temp/image2.jpg')

# img0 = cv2.cvtColor(img0, cv2.COLOR_BGR2GRAY)
# img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
# img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

# img0 = transform(Image.fromarray(img0))
# img1 = transform(Image.fromarray(img1))
# img2 = transform(Image.fromarray(img2))



# file_list = make_filepath_list()

# test(file_list, img0)
# print()
# print()
# test(file_list, img1)
# print()
# print()
# test(file_list, img2)