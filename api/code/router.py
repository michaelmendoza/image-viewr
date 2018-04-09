import sys
import base64
import StringIO
import contextlib
import numpy
from PIL import Image
from io import BytesIO

@contextlib.contextmanager
def stdoutIO(stdout=None):
	old = sys.stdout
	if stdout is None:
	    stdout = StringIO.StringIO()
	sys.stdout = stdout
	yield stdout
	sys.stdout = old

def show (image) :
	print(image)

def toNumPy (image) :
	buf = BytesIO()
	buf.write(image)
	buf.seek(0)
	num_image = numpy.array(Image.open(buf)).astype('int64')
	buf.close()
	return(num_image)

def toPNG (numpy_im) :
	_im = Image.fromarray(numpy_im.astype(numpy.uint8))
	buf = BytesIO()
	_im.save(buf, format="PNG")
	return(buf.getvalue())

_code = sys.argv[1] # user supplied code
images_base64 = sys.argv[2:] # base64 encoded png images

# decode base64
images = list()
for _im in images_base64 :
	images.append(base64.b64decode(_im))

with stdoutIO() as _res:
	exec _code

# base64 encode and then send back
print(base64.b64encode(_res.getvalue()))