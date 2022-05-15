import os
import shutil
import re

path = os.getcwd()
print(path)
path = path + "\queue"

pathList = os.listdir(path)

for i in pathList:
    file = open(path + '\\' + i, encoding='utf8')
    print(file.readline())

input()
