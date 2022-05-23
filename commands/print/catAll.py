import os
import shutil
import re

path = os.getcwd()
print(path)
path = path + "\queue"

pathList = os.listdir(path)

for i in pathList:
    msg = ''

    if i[-4:] == '.png':
        continue
    
    with open(path + '\\' + i, encoding='utf8') as infile:
        for line in infile:
            msg = msg + line
    print(msg)

input()
