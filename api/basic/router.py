import sys
import base64
from Basic import Basic

func = sys.argv[1] # desired function
images_base64 = sys.argv[2:] # base64 encoded png images

# decode base64
images = list()
for im in images_base64 :
	images.append(base64.b64decode(im))

# send to correct function
res = {
	'add' : Basic.add,
	'sos' : Basic.sos
}[func](images)

# base64 encode and then send back
print(base64.b64encode(res))