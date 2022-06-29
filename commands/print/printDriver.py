import os
import shutil
import re
import time
import win32print
import win32ui
from PIL import Image, ImageWin

def printSingleImage(imgpath):
    #
    # Constants for GetDeviceCaps
    #
    #
    # HORZRES / VERTRES = printable area
    #
    HORZRES = 8
    VERTRES = 10
    #
    # LOGPIXELS = dots per inch
    #
    LOGPIXELSX = 88
    LOGPIXELSY = 90
    #
    # PHYSICALWIDTH/HEIGHT = total area
    #
    PHYSICALWIDTH = 110
    PHYSICALHEIGHT = 111
    #
    # PHYSICALOFFSETX/Y = left / top margin
    #
    PHYSICALOFFSETX = 112
    PHYSICALOFFSETY = 113

    printer_name = win32print.GetDefaultPrinter ()
    file_name = imgpath

    #
    # You can only write a Device-independent bitmap
    #  directly to a Windows device context; therefore
    #  we need (for ease) to use the Python Imaging
    #  Library to manipulate the image.
    #
    # Create a device context from a named printer
    #  and assess the printable size of the paper.
    #
    hDC = win32ui.CreateDC ()
    hDC.CreatePrinterDC (printer_name)
    printable_area = hDC.GetDeviceCaps (HORZRES), hDC.GetDeviceCaps (VERTRES)
    printer_size = hDC.GetDeviceCaps (PHYSICALWIDTH), hDC.GetDeviceCaps (PHYSICALHEIGHT)
    printer_margins = hDC.GetDeviceCaps (PHYSICALOFFSETX), hDC.GetDeviceCaps (PHYSICALOFFSETY)

    #
    # Open the image, rotate it if it's wider than
    #  it is high, and work out how much to multiply
    #  each pixel by to get it as big as possible on
    #  the page without distorting.
    #
    bmp = Image.open (file_name)
    if bmp.size[0] > bmp.size[1]:
        bmp = bmp.rotate(90, expand=1)


    ratios = [1.0 * printable_area[0] / bmp.size[0], 1.0 * printable_area[1] / bmp.size[1]]
    scale = min (ratios)

    #
    # Start the print job, and draw the bitmap to
    #  the printer device at the scaled size.
    #
    hDC.StartDoc (file_name)
    hDC.StartPage ()

    dib = ImageWin.Dib (bmp)
    scaled_width, scaled_height = [int (scale * i) for i in bmp.size]
    x1 = int ((printer_size[0] - scaled_width) / 2)
    y1 = int ((printer_size[1] - scaled_height) / 2)
    x2 = x1 + scaled_width
    y2 = y1 + scaled_height
    dib.draw (hDC.GetHandleOutput (), (x1, y1, x2, y2))

    hDC.EndPage ()
    hDC.EndDoc ()
    hDC.DeleteDC ()

def printThenDelete(fpath):
    if fpath[-4:] == '.txt':
        os.startfile(fpath, 'Print')
        #addText(fpath)
    elif fpath[-4:] == '.png':
        printSingleImage(fpath)

    time.sleep(.3);

    #os.remove(fpath);

def addText(given):
    msg = ''
    with open(given, encoding='utf8') as infile:
        for line in infile:
            msg = msg + line
        infile.close()

    #print(msg)
    with open('big.txt', 'a+', encoding='utf8') as outfile:
        print('writing ' + given + ' to big.txt')
        outfile.write('\n' + msg)
        outfile.close()

path = os.getcwd()
path = path + "\queue\\"

st_time = int(time.time_ns())

while(True):
    pathList = os.listdir(path)
    time.sleep(1)

    if len(pathList) == 0:
        time.sleep(3)

    for i in range(len(pathList)):
        print('printing ' + pathList[i])
        curFile = path + '\\' + pathList[i]
        printThenDelete(curFile)

    for i in range(len(pathList)):
        curFile = path + '\\' + pathList[i]
        os.remove(curFile)

    """
    cr_time = int(time.time_ns())
    if ((st_time - cr_time) % 300000000000 == 0):
        print('up for ' + str(((st_time - cr_time) / 300000000000)) + 'mins')
        cr_time = cr_time + 1

    pathList = os.listdir(path)
    time.sleep(.5)

    if len(pathList) == 0:
        time.sleep(1)
        continue
    elif len(pathList) == 1:
        os.startfile(path + pathList[0], 'Print')
        os.remove(path + pathList[0])

    for i in range(len(pathList)):
        print('printing ' + pathList[i])
        if i == len(pathList)-1:
            break

        curFile = path + '\\' + pathList[i]
        nextFile = path + '\\' + pathList[i+1]
        printThenDelete(curFile)
        if curFile[-4:] == '.txt' and nextFile[-4:] != '.txt':
            os.startfile('big.txt', 'Print')

    printThenDelete(path + pathList[len(pathList)-1])
    if os.path.exists('big.txt'):
        os.startfile('big.txt', 'Print')
        with open('big.txt', 'w', encoding='utf8') as big:
            big.write('')
            big.close()
            """

