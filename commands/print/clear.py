import os
import shutil
import re

path = os.getcwd()
print(path)
path = path + "\queue"

pathList = os.listdir(path)

print('Press any button to clear print queue.')
input()

for i in pathList:
    os.remove(path + '\\' + i)
