# coding:utf-8

import numpy as np
from PIL import Image
import time
import glob

import torch
from torchvision import transforms
import torch.nn as nn
import matplotlib.pyplot as plt

import dlib
from imutils import face_utils
import cv2





face_detector = dlib.get_frontal_face_detector()
predictor_path = 'models/shape_predictor_68_face_landmarks.dat'
face_predictor = dlib.shape_predictor(predictor_path)




def detect_landmark(img_gry):
    # img_gry2 = cv2.cvtColor(img_gry, cv2.COLOR_BGR2GRAY)
    faces = face_detector(img_gry, 1)
    # print(faces)
    # print(len(faces) != 0)
    if len(faces) == 0:
        return None
    else:
        landmark = face_predictor(img_gry, faces[0])
        landmark = face_utils.shape_to_np(landmark)
        # print(landmark)
        return landmark


# # 検出した全顔に対して処理
# for face in faces:
#     # 顔のランドマーク検出
#     landmark = face_predictor(img_gry, face)
#     # 処理高速化のためランドマーク群をNumPy配列に変換(必須)
#     landmark = face_utils.shape_to_np(landmark)

#     # ランドマーク描画
#     for (i, (x, y)) in enumerate(landmark):
#         cv2.circle(img_gry, (x, y), 1, (255, 0, 0), -1)

# # print(landmark)
# print(len(landmark))

# print(time.time() - start)
# # --------------------------------
# # 3.結果表示
# # --------------------------------
# cv2.imwrite('sample1.jpg', img_gry)
# # cv2.imshow('sample', img_gry)
# # cv2.waitKey(0)
# # cv2.destroyAllWindows()







def eye_crop(img_gry, landmark):
    # if landmark is None:
    #     top_y = 150
    #     bottom_y = 160
    #     left_x = 120
    #     right_x = 185
    # else:
    #     # left_x = landmark[36][0] - 5
    #     # right_x = landmark[45][0] + 5
    #     # top_y = max([landmark[37][1], landmark[38][1], landmark[43][1], landmark[44][1]]) - 5
    #     # bottom_y = max([landmark[40][1], landmark[41][1], landmark[46][1], landmark[47][1]]) + 5
    #     left_x = landmark[0][0] - 3
    #     right_x = landmark[16][0] + 3
    #     top_y = max([landmark[19][1], landmark[24][1]]) - 3
    #     bottom_y = landmark[8][1] + 3


    # right_eye_region = {'left_x': landmark[36][0] - 5, 'right_x': landmark[39][0] + 3,
    #                     'top_y': landmark[37][1] - 3 if landmark[37][1] < landmark[38][1] else landmark[38][1] - 3,
    #                     'bottom_y': landmark[41][1] + 3 if landmark[41][1] > landmark[40][1] else landmark[40][1] + 3}

    # # 左目切り出し
    # left_eye_region = {'left_x': landmark[42][0] - 3, 'right_x': landmark[45][0] + 5,
    #                    'top_y': landmark[43][1] - 3 if landmark[43][1] < landmark[45][1] else landmark[45][1] - 3,
    #                    'bottom_y': landmark[47][1] + 3 if landmark[47][1] > landmark[46][1] else landmark[46][1] + 3}

    eye_region = {'left_x': landmark[36][0] - 5, 'right_x': landmark[45][0] + 5,
                  'top_y': max(landmark[19][1], landmark[24][1]) - 3,
                #   'top_y': max(landmark[37][1], landmark[38][1], landmark[43][1], landmark[44][1]) - 3,
                  'bottom_y': max(landmark[40][1], landmark[41][1], landmark[46][1], landmark[47][1]) + 3}


    # face_region = {'left_x': left_x, 'right_x': right_x,'top_y': top_y, 'bottom_y': bottom_y}
    # # print([top_y, bottom_y, left_x, right_x])
    cropped_img = img_gry[eye_region['top_y']:eye_region['bottom_y'], eye_region['left_x']:eye_region['right_x']]
    print(cropped_img.shape)
    print(eye_region['top_y'])
    # right_cropped_img = img_gry[right_eye_region['top_y']:right_eye_region['bottom_y'], right_eye_region['left_x']:right_eye_region['right_x']]
    # left_cropped_img = img_gry[left_eye_region['top_y']:left_eye_region['bottom_y'], left_eye_region['left_x']:left_eye_region['right_x']]
    # _, right_cropped_img2 = cv2.threshold(right_cropped_img, 0, 255, cv2.THRESH_OTSU)
    # _, left_cropped_img2 = cv2.threshold(left_cropped_img, 0, 255, cv2.THRESH_OTSU)
    _, cropped_img2 = cv2.threshold(cropped_img, 0, 255, cv2.THRESH_OTSU)
    cv2.imwrite('sample.jpg', cropped_img2)
    # return right_cropped_img, left_cropped_img, right_eye_region, left_eye_region, face_region
    return cropped_img #, eye_region
    # print(cropped_img.shape)
    # img_pil = Image.fromarray(cropped_img)
    # return transform(img_pil)







# eye_region = detect_eye_region(landmark)
# print(eye_region)


# img2 = img_gry[eye_region['top_y']:eye_region['bottom_y'], eye_region['left_x']:eye_region['right_x']]


# ret, img3 = cv2.threshold(img_gry, 0, 255, cv2.THRESH_OTSU)
# ret, img3 = cv2.threshold(img2, 80, 255, cv2.THRESH_BINARY)

# print(img2.shape)
# cv2.imwrite('sample5.jpg', img2)






transform = transforms.Compose([
            transforms.Resize((120, 320)),
            # transforms.CenterCrop(240),
            transforms.ToTensor(),
            # transforms.Normalize((0.5), (0.5))
        ])




# def imshow(img, name):
#     img = img / 2 + 0.5     # unnormalize
#     npimg = img.to('cpu').detach().numpy().copy()
#     plt.imshow(np.transpose(npimg, (1, 2, 0)))
#     plt.savefig(f'{name}.jpg')






# new_image = Image.fromarray(img2)
# new_image = transform(new_image)
# imshow(new_image, 'test')
# print(new_image.shape)





def make_filepath_list():
    test_file_list = glob.glob('img/test/*/image*.jpg')

    return test_file_list





def test(file_list, eye_img0):
    cos = nn.CosineSimilarity(dim=0)
    for i, f in enumerate(file_list):
        img = cv2.imread(f, cv2.IMREAD_GRAYSCALE)
        landmark = detect_landmark(img)
        if landmark is not None:
            eye_img = eye_crop(img, landmark)
            # eye_img = draw(landmark, img)
            transformed_img0 = transform(Image.fromarray(eye_img0))
            transformed_img = transform(Image.fromarray(eye_img))
            result = cos(torch.flatten(transformed_img0), torch.flatten(transformed_img)).item()
            print(f'{result:.6f}\t{i}\t{result < 0.96}\t{f}')





start = time.time()

img_gry0_0 = cv2.imread('./img/temp/image0.jpg', cv2.IMREAD_GRAYSCALE)
# img_gry0_1 = cv2.imread('./img/faces/image_00001.jpg', cv2.IMREAD_GRAYSCALE)
img_gry1_0 = cv2.imread('./img/temp/image1.jpg', cv2.IMREAD_GRAYSCALE)
# img_gry1_1 = cv2.imread('./img/faces/image_00007.jpg', cv2.IMREAD_GRAYSCALE)
img_gry2_0 = cv2.imread('./img/temp/image2.jpg', cv2.IMREAD_GRAYSCALE)
# img_gry2_1 = cv2.imread('./img/faces/image_00013.jpg', cv2.IMREAD_GRAYSCALE)


landmark0_0 = detect_landmark(img_gry0_0)
# landmark0_1 = detect_landmark(img_gry0_1)
landmark1_0 = detect_landmark(img_gry1_0)
# landmark1_1 = detect_landmark(img_gry1_1)
landmark2_0 = detect_landmark(img_gry2_0)
# landmark2_1 = detect_landmark(img_gry2_1)


# right_eye_img0_0, left_eye_img0_0, right_eye_region1, left_eye_region1 = eye_crop(img_gry0_0, landmark0_0, transform)
# right_eye_img0_1, left_eye_img0_1, right_eye_region2, left_eye_region2 = eye_crop(img_gry0_1, landmark0_1, transform)
# right_eye_img1_0, left_eye_img1_0, right_eye_region3, left_eye_region3 = eye_crop(img_gry1_0, landmark1_0, transform)
# right_eye_img1_1, left_eye_img1_1, right_eye_region4, left_eye_region4 = eye_crop(img_gry1_1, landmark1_1, transform)

img0_0 = eye_crop(img_gry0_0, landmark0_0)
# img0_1 = eye_crop(img_gry0_1, landmark0_1)
# img1_0 = eye_crop(img_gry1_0, landmark1_0)
# img1_1 = eye_crop(img_gry1_1, landmark1_1)
# img2_0 = eye_crop(img_gry2_0, landmark2_0)
# img2_1 = eye_crop(img_gry2_1, landmark2_1)



# cv2.imwrite('sample5.jpg', eye_img0_0)



# print(torch.flatten(eye_img0_0))

# print(cos(torch.flatten(eye_img0_0), torch.flatten(eye_img0_1)))
# print(cos(torch.flatten(eye_img0_0), torch.flatten(eye_img1_0)))
# print(cos(torch.flatten(eye_img0_0), torch.flatten(eye_img1_1)))
# print(cos(torch.flatten(eye_img0_1), torch.flatten(eye_img1_0)))
# print(cos(torch.flatten(eye_img0_1), torch.flatten(eye_img1_1)))
# print(cos(torch.flatten(eye_img1_0), torch.flatten(eye_img1_1)))

# print(time.time() - start)

test_file_list = make_filepath_list()

print()
test(test_file_list, img0_0)
# print()
# print()
# test(test_file_list, img1_0)
# print()
# print()
# test(test_file_list, img2_0)

# # print(landmark0_0)
# start = time.time()

def draw(landmark, input_img):
    face_outline = list(landmark[:17])
    face_outline.extend(reversed(list(landmark[17:27])))
    # print(face_outline)
    img = np.full((240, 320), 255, np.uint8)
    # face_img, face_region = eye_crop(input_img, landmark)
    # img[face_region['top_y']:face_region['bottom_y'], face_region['left_x']:face_region['right_x']] = face_img
    for i in range(len(face_outline)):
        if i == len(face_outline) - 1:
            cv2.line(img, pt1=face_outline[i], pt2=face_outline[0], color=(0, 0, 0), thickness=2)
        else:
            cv2.line(img, pt1=face_outline[i], pt2=face_outline[i+1], color=(0, 0, 0), thickness=2)
    right_eye_img, left_eye_img, right_eye_region, left_eye_region, face_region = eye_crop(input_img, landmark)
    img[right_eye_region['top_y']:right_eye_region['bottom_y'], right_eye_region['left_x']:right_eye_region['right_x']] = right_eye_img
    img[left_eye_region['top_y']:left_eye_region['bottom_y'], left_eye_region['left_x']:left_eye_region['right_x']] = left_eye_img
    # _, img2 = cv2.threshold(img, 0, 255, cv2.THRESH_OTSU)
    # _, img2 = cv2.threshold(img, 80, 255, cv2.THRESH_BINARY)
    img2 = img[face_region['top_y']:face_region['bottom_y'], face_region['left_x']:face_region['right_x']]
    # print(img2.shape)
    # cv2.imwrite('sample11.jpg', img2)
    return transform(Image.fromarray(img2))

# # print(img.shape)
# # print(eye_img0_0.shape)
# # print(img[eye_region['top_y']:eye_region['bottom_y'], eye_region['left_x']:eye_region['right_x']].shape)
# # blend = cv2.addWeighted(img[eye_region['top_y']:eye_region['bottom_y'], eye_region['left_x']:eye_region['right_x']], 0.5, eye_img0_0, 0.5, 0)

# print(time.time() - start)
# # cv2.imwrite('sample6.jpg', eye_img0_0)
# cv2.imwrite('sample10.jpg', img)
# # cv2.imwrite('sample8.jpg', blend)



# img0_0 = draw(landmark0_0, img_gry0_0)
# img0_1 = draw(landmark0_1, img_gry0_1)
# img1_0 = draw(landmark1_0, img_gry1_0)
# img1_1 = draw(landmark1_1, img_gry1_1)
# img2_0 = draw(landmark2_0, img_gry2_0)
# img2_1 = draw(landmark2_1, img_gry2_1)


# print(cos(torch.flatten(img0_0), torch.flatten(img0_1)))
# print(cos(torch.flatten(img0_0), torch.flatten(img1_0)))
# print(cos(torch.flatten(img0_0), torch.flatten(img1_1)))
# print(cos(torch.flatten(img0_1), torch.flatten(img1_0)))
# print(cos(torch.flatten(img0_1), torch.flatten(img1_1)))
# print(cos(torch.flatten(img1_0), torch.flatten(img1_1)))

# test(test_file_list, img0_0)
# print()
# print()
# test(test_file_list, img1_0)
# print()
# print()
# test(test_file_list, img2_0)