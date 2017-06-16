import zerorpc
import logging
logging.basicConfig()
import os, sys
api_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, api_path)
from api.basic.Basic import Basic

class ImageService (object) :
	def add (self, images) :
		res = Basic.add(images)
		print(__file__ + ': returning something!')
		return res

# Create the server:
print(__file__ + ": Python server, binding to tcp://0.0.0.0:4242")
s = zerorpc.Server(ImageService())
s.bind("tcp://0.0.0.0:4242")
s.run()