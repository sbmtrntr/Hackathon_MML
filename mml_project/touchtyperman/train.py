# coding: utf-8


import numpy as np
from PIL import Image
import time

import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import transforms

import cnn
import data_prep




threshold_loss = 1e-4


class Train:
    def __init__(self, net, train_loader, test_loader):
        self.net = net
        self.train_loader = train_loader
        self.test_loader = test_loader
        self.criterion = nn.CrossEntropyLoss()
        self.optimizer = optim.SGD(net.parameters(), lr=0.001, momentum=0.9)
        self.device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        self.net.to(self.device)




    def training(self, max_epoch):
        optimizer = optim.SGD(self.net.parameters(), lr=0.001, momentum=0.9)

        train_loss = np.inf
        epoch = 0
        while train_loss > threshold_loss and epoch < max_epoch:
            print("---------------")
            print("epoch", epoch + 1)
            running_loss = 0.0
            correct = 0
            total = 0
            for data in self.train_loader:
                inputs, labels = data[0].to(self.device), data[1].to(self.device)
                
                optimizer.zero_grad()

                outputs = self.net(inputs)
                loss = self.criterion(outputs, labels)
                loss.backward()
                optimizer.step()

                _, predicted = torch.max(outputs.data, 1)

                total += labels.size(0)
                correct += (predicted == labels).sum().item()
                running_loss += loss.item()
                
            train_loss = running_loss / total
            train_acc = 100 * correct / total
            print(f'train\tloss: {train_loss:f}  accuracy: {train_acc:.3f} %')
            self.test_accuracy()

            epoch += 1

        torch.save(self.net.state_dict(), 'models/params/model_weight.pth')
        print("---------------")
        print('Finished Training')
        print()







    def test_accuracy(self):
        running_loss = 0.0
        correct = 0
        total = 0

        with torch.no_grad():
            for data in self.test_loader:
                images, labels = data
                
                outputs = self.net(images)
                
                loss = self.criterion(outputs, labels)
                running_loss += loss.item()

                _, predicted = torch.max(outputs.data, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()
                
        test_loss = running_loss / total
        test_acc = 100 * correct / total
        
        print(f'test\tloss: {test_loss:f}  accuracy: {test_acc:.3f} %')









if __name__ == '__main__':
    transform = transforms.Compose([transforms.ToTensor()])

    train_file_list, test_file_list = data_prep.make_filepath_list()

    train_dataset = data_prep.EyeDataset(file_list=train_file_list, transform=transform)
    test_dataset = data_prep.EyeDataset(file_list=test_file_list, transform=transform)

    batch_size = 4

    train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=2)
    test_loader = torch.utils.data.DataLoader(test_dataset, batch_size=batch_size, shuffle=False, num_workers=2, drop_last=False)


    net = cnn.CNN()

    max_epoch = 50
    train = Train(net, train_loader, test_loader)
    train.training(max_epoch)






























# import chainer
# import chainer.functions as F
# import chainer.links as L
# import numpy as np
# from chainer import Chain, Variable
# from chainer import optimizers
# from sklearn.model_selection import train_test_split
# from chainer.serializers import load_npz

# import cnn
# import data





# if __name__ == '__main__':
#     batch_size = 8
#     n_epoch = 20

#     # df_train = pd.read_csv('./input/raw_data/train_data.csv') #TODO csvファイルを作成しなくては...
#     # X = df_train.iloc[:, 2:].astype(np.float32).values
#     # y = (df_train.iloc[:, 1].astype(np.int32) - 2).values

#     train_file_list, test_file_list = data.make_filepath_list()

#     train_dataset, train_labels = data.make_dataset(train_file_list)
#     train_dataset = train_dataset.astype(np.float32)
#     train_labels = train_labels.astype(np.int32)

#     test_dataset, test_labels = data.make_dataset(test_file_list)
#     test_dataset = test_dataset.astype(np.float32)
#     test_labels = test_labels.astype(np.int32)



#     # X /= 255.0

#     # 訓練データとテストデータに分割
#     # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1)

#     N = train_labels.size
#     N_test = test_labels.size

#     # 画像を (nsample, channel, height, width) の4次元テンソルに変換
#     # X_train = X_train.reshape((len(X_train), 1, 32, 96))
#     # X_test = X_test.reshape((len(X_test), 1, 32, 96))

#     net = cnn.CNN()
#     load_npz('/workspaces/mml_project/touchtyperman/models/cnn_model.npz', net, strict=True)

#     # gpu_flag = -1

#     # if gpu_flag >= 0:
#     #     cuda.get_device_from_id(gpu_flag).use()
#     #     model.to_gpu()
#     # xp = np if gpu_flag < 0 else cuda.cupy

#     optimizer = optimizers.MomentumSGD(lr=0.01)
#     optimizer.setup(net)
#     # 訓練ループ
#     # start_time = time.clock()
#     for epoch in range(n_epoch):
#         print(f'epoch: {epoch + 1}')

#         perm = np.random.permutation(N)
#         sum_loss = 0.0
#         for i in range(0, N, batch_size):
#             train_batch = Variable(np.asarray(train_dataset[perm[i:i + batch_size]]))
#             train_label_batch = Variable(np.asarray(train_labels[perm[i:i + batch_size]]))

#             net.cleargrads()

#             loss = F.softmax_cross_entropy(net(train_batch), train_label_batch)

#             loss.backward()

#             optimizer.update()
#             net.cleargrads()

#             sum_loss += float(loss.array) * len(train_batch)

#         print(f'train mean loss: {sum_loss / N}')

#         with chainer.using_config('train', True):
#             sum_accuracy = 0
#             for i in range(0, N_test, batch_size):
#                 test_batch = np.asarray(test_dataset[i:i + batch_size])
#                 test_label_batch = np.asarray(test_labels[i:i + batch_size])

#                 acc = F.accuracy(net(test_batch), test_label_batch)
#                 sum_accuracy += float(acc.data) * len(test_label_batch)

#         print(f'test accuracy: {(sum_accuracy / N_test) * 100}')

#     # end_time = time.clock()
#     # print(end_time - start_time)

#     # from chainer.serializers import save_npz

#     # # CPU環境でも学習済みモデルを読み込めるようにCPUに移してからダンプ
#     # net.to_cpu()
#     # save_npz("output/cnn_model.npz", net)
