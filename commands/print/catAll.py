import os
import shutil
import re

path = os.getcwd()
print(path)
path = path + "\queue"

pathList = os.listdir(path)

bigmsg = ''
for i in pathList:
    msg = ''

    if i[-4:] == '.png':
        continue
    
    with open(path + '\\' + i, encoding='utf8') as infile:
        for line in infile:
            msg = msg + line
    print(msg)
    bigmsg = bigmsg + '\n' + msg

with open('big.txt', 'w', encoding='utf8') as f:
    f.write(bigmsg)

    f.close()

os.startfile('big.txt', 'Print')
input()
