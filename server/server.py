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
		print(__file__ + ': Sending result of add...')
		return res

	def sos (self, images) :
		res = Basic.sos(images)
		print(__file__ + ': Sending result of sos...')
		return res

# Create the server:
port = str(os.environ.get('PORT', '4242'));
print(__file__ + ": Python server, binding to tcp://0.0.0.0:" + port)
s = zerorpc.Server(ImageService())
s.bind("tcp://0.0.0.0:" + port)
s.run()