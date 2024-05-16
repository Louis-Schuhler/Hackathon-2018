import os
from PIL import Image
import glob

def extractFrames(inGif, outFolder):
    frame = Image.open(inGif)
    nframes = 0
    average = 0
    spikes = []

    while frame:
        frame.save( '%s/%s-%s.gif' % (outFolder, os.path.basename(inGif), nframes ) , 'GIF')
        frameSaved = Image.open('%s/%s-%s.gif' % (outFolder, os.path.basename(inGif), nframes))
        print(frameSaved.filename)
        width, height = frameSaved.size

        average2 = averageFrame(frameSaved, width, height)

        if (average == 0):
            average = average2
            nframes += 1
            continue

        percentage = average2/average * 100

        print(average2)
        print(average)

        if (percentage > 90 and percentage < 110 or percentage == 0):
            spikes.append(False)
        else: 
            spikes.append(True)
        
        average = average2

        nframes += 1
        try:
            frame.seek( nframes )
        except EOFError:
            return (nframes, spikes)
            break
    return True

def averageFrame(frame, width, height):
    newFrame = frame.convert("RGB")

    counter = 0
    total = 0

    for j in range (0, width):
        for k in range(0, height):
            coordinate = x,y = j,k
            rgb = newFrame.getpixel(coordinate)
            total += rgb[0]+rgb[1]+rgb[2]
            counter += 1

    return total/counter

def isSeizure(gifName, output):
    nframes, spikes = extractFrames(gifName, output)

    numSpikes = 0
    for spike in spikes:
        if (spike == True):
            numSpikes += 1

    files = glob.glob('output/*')
    for f in files:
        os.remove(f)

    print("Number of frames " + str(nframes))    
    print("Number of spikes: " + str(numSpikes))

    percentage = numSpikes/nframes * 100
    if (percentage <= 10):
        return False
    else:
        return True

print(isSeizure('test4.gif', 'output'))


# from PIL import Image
# import numpy as np

# img = Image.open('test.gif')
# print ('num frames: {}'.format(img.n_frames))
# print ('frame duration (millis): {}'.format(img.info['duration']))

# frames = []
# i = 0
# mypalette = img.getpalette()
# try:
#     while True:
#         if not img.getpalette() and mypalette:
#             img.putpalette(mypalette)
#         newImg = Image.new("RGB", img.size)
#         newImg.paste(img)
#         print(newImg.getpalette())
#         frames.append(np.asarray(newImg))
#         i += 1
#         img.seek(img.tell() + 1)
# except EOFError:
#     # end of sequence
#     pass

# print (frames)
