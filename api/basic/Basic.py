## Basic Image Operations
 # Methods
 #     add - Adds a list of images together
 #     sos - root sum of squares
##

import numpy
from PIL import Image
from io import BytesIO

class Basic (object) :

	@classmethod
	def convertToNumPy (self, images_bytes) :
		images = []
		for im_bytes in images_bytes :
			buf = BytesIO()
			buf.write(im_bytes)
			buf.seek(0)
			images.append(numpy.array(Image.open(buf)).astype('int64'))
			buf.close()
		return(images)

	@classmethod
	def convertToBuffer (self, image) :
		# If we have a grayscale, then scale it:
		if len(image.shape) is 2 :
			image = (image - image.min()) / (image.max() - image.min()) # normalize the array
			im = Image.fromarray((image * 255).astype(numpy.uint8)) # scale the array to be saved as uint8
		# If we have a color image (3D), do this:
		else :
			im = Image.fromarray(image.astype(numpy.uint8))

		buf = BytesIO()
		im.save(buf, format="PNG")
		return(buf.getvalue())

	@staticmethod
	def add (images_bytes) :
		images = Basic.convertToNumPy(images_bytes) # Convert the data into a numpy array
		result = sum(images) # Take the sum
		return(Basic.convertToBuffer(result)) # Now convert into bytes to send back

	@staticmethod
	def sos (images_bytes) :
		images = Basic.convertToNumPy(images_bytes) # convert to numpy array
		result = numpy.sqrt(sum(numpy.multiply(images, numpy.conj(images)))) # take the sum of squares and then the sqrt of it all
		return(Basic.convertToBuffer(result)) # return as a byte stream and send back