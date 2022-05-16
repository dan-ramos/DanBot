import os
import shutil
import re
import time

def printThenDelete(fpath):
    file = open(fpath, encoding='utf8')
    line = file.readline()
    time.sleep(1);

    file.close()
    os.remove(path + '\\' + i);
    print(line)

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

