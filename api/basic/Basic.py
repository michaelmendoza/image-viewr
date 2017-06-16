## Basic Image Operations
 # Methods
 #     add - Adds a list of images together
##

import numpy
from PIL import Image
from io import BytesIO

class Basic (object) :
	@staticmethod
	def add (images_bytes) :

		# Loop over every image string and convert it into a numpy array:
		images = []
		for im_bytes in images_bytes :
			buf = BytesIO()
			buf.write(im_bytes)
			buf.seek(0)
			images.append(numpy.array(Image.open(buf)))
			buf.close()

		# Sum the list:
		result = sum(images)

		# Now convert into bytes to send back:
		im = Image.fromarray(result)
		buf = BytesIO()
		im.save(buf, format="PNG")
		
		return(buf.getvalue())