import numpy as np

import torch
import torch.nn as nn
import torch.optim as optim




threshold_loss = 1e-4


class Train:
    def __init__(self, net, train_loader):
        self.net = net
        self.train_loader = train_loader
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

            epoch += 1

        print("---------------")
        print('Finished Training')
        print()




    # def test_accuracy(self):
    #     running_loss = 0.0
    #     correct = 0
    #     total = 0

    #     with torch.no_grad():
    #         for data in self.test_loader:
    #             images, labels = data

    #             outputs = self.net(images)

    #             loss = self.criterion(outputs, labels)
    #             running_loss += loss.item()

    #             _, predicted = torch.max(outputs.data, 1)
    #             total += labels.size(0)
    #             correct += (predicted == labels).sum().item()

    #     test_loss = running_loss / total
    #     test_acc = 100 * correct / total

    #     print(f'test\tloss: {test_loss:f}  accuracy: {test_acc:.3f} %')

