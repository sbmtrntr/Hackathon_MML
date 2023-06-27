import glob

import dlib
from imutils import face_utils
import cv2

import torch.utils.data as data




face_detector = dlib.get_frontal_face_detector()
predictor_path = 'app/models/shape_predictor_68_face_landmarks.dat'
face_predictor = dlib.shape_predictor(predictor_path)










def make_filepath_list(user):
    train_file_list = glob.glob(f'app/image/{user}/train/*/image*.jpg')
    return train_file_list




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

    cropped_img = img[top_y:bottom_y, left_x:right_x]
    resized_img = cv2.resize(cropped_img, (156, 156))
    hist_img = cv2.equalizeHist(resized_img[:52, :])

    return hist_img








class EyeDataset(data.Dataset):
    def __init__(self, file_list, transform):
        super().__init__()
        self.file_list = file_list
        self.transform = transform
        self.imgs = []
        self.labels = []
        for i, f in enumerate(file_list):
            img = cv2.imread(f, cv2.IMREAD_GRAYSCALE)
            landmark = detect_landmark(img)
            if landmark is None:
                continue
            eye_img = eye_crop(img, landmark)
            self.imgs.append(eye_img)
            self.labels.append(int(file_list[i].split('/')[4]))
            # windowsの場合
            # split_name = file_list[i].split('/')[3]
            # self.labels.append(int(split_name.split('\\')[1]))

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, index):
        img = self.imgs[index]
        return self.transform(img), self.labels[index]




