import os
import shutil
import re
import time

def printThenDelete(fpath):
    msg = ''
    with open(path + '\\' + i, encoding='utf8') as infile:
        for line in infile:
            msg = msg + line
    print(msg)
    
    time.sleep(.3);

    os.remove(path + '\\' + i);

path = os.getcwd()
path = path + "\queue"

st_time = int(time.time_ns())

while(True):
    cr_time = int(time.time_ns())
    if ((st_time - cr_time) % 300000000000 == 0):
        print('up for ' + str(((st_time - cr_time) / 300000000000)) + 'mins')
        cr_time = cr_time + 1

    pathList = os.listdir(path)

    for i in pathList:
        printThenDelete(path + '\\' + i)

