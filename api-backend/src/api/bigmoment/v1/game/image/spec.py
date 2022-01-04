from PIL import Image
import os
import sys


def image_Spec(path):
    ot = [45]
    filename, file_extension = os.path.splitext(path)
    im = Image.open(path)
    width, height = im.size
    return ot


image_Spec(sys.argv[1])
