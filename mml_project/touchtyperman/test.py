
import argparse
import cv2
import os
import numpy as np
from PIL import Image
import dlib
from imutils import face_utils

from chainer.serializers import load_npz
import chainer.functions as F

import cnn






face_detector = dlib.get_frontal_face_detector()
predictor_path = 'models/shape_predictor_68_face_landmarks.dat'
face_predictor = dlib.shape_predictor(predictor_path)






def detect_landmark(img_gry):
    faces = face_detector(img_gry, 1)
    if len(faces) == 0:
        return None
    else:
        landmark = face_predictor(img_gry, faces[0])
        landmark = face_utils.shape_to_np(landmark)
        return landmark







def eye_crop(img, landmark):
    left_x = landmark[0][0] - 3
    right_x = landmark[16][0] + 3
    top_y = max([landmark[19][1], landmark[24][1]])
    bottom_y = landmark[8][1] - 5

    # face_region = {'left_x': left_x, 'right_x': right_x,'top_y': top_y, 'bottom_y': bottom_y}

    # cropped_img = img[face_region['top_y']:face_region['bottom_y'], face_region['left_x']:face_region['right_x']]
    cropped_img = img[top_y:bottom_y, left_x:right_x]
    print(cropped_img.shape)
    resized_img = cv2.resize(cropped_img, (156, 156))
    hist_img = cv2.equalizeHist(resized_img[:52, :])
    # resized_img = cv2.resize(hist_img, (96, 96))
    # print(cropped_img.shape)

    return hist_img #, face_region








def test(img):
    img = img.astype(np.float32)
    net = cnn.CNN()
    load_npz('/workspaces/mml_project/touchtyperman/models/cnn_model.npz', net, strict=True)
    prediction = F.softmax(net(img))
    print(prediction)
    return prediction




img = cv2.imread('/workspaces/mml_project/touchtyperman/img/temp/image.jpg', cv2.IMREAD_GRAYSCALE)
print(img.shape)

landmark = detect_landmark(img)
img2 = eye_crop(img, landmark)
cv2.imwrite('sample.jpg', img2)

# cropped_img = img2[:32, :]
# print(cropped_img.shape)
# cv2.imwrite('sample1.jpg', cropped_img)
# img3 = np.expand_dims(np.expand_dims(cropped_img, axis=0), axis=0)
# print(img3.shape)
# prediction = test(img3)
# print(prediction.data[0][0])


# img2 = img[0:32, 0:96]
# print(img2.shape)
# img3 = np.expand_dims(np.expand_dims(img2, axis=0), axis=0)
# print(img3.shape)
# test(img3)


