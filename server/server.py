import SocketServer
import base64
import os
import sys
api_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, api_path)
from api.basic.Basic import Basic
from PyPort import PyPort

class ImageService (object) :
	def __init__ (self) :
		PyPort.set_port(os.environ.get('PORT', 6000))

	@staticmethod
	def add (images) :
		res = Basic.add(images)
		print(__file__ + ': Sending result of add...')
		return res

	@staticmethod
	def sos (images) :
		res = Basic.sos(images)
		print(__file__ + ': Sending result of sos...')
		return res

# Start up a server:
class MyTCPHandler (SocketServer.StreamRequestHandler) :
	def handle (self) :
		func = self.rfile.readline().rstrip()
		num_images = self.rfile.readline()
		self.data = list()

		for im in range(0, int(num_images)) :
			self.data.append(base64.b64decode(self.rfile.readline()))

		self.wfile.write({
			'add' : ImageService.add,
			'sos' : ImageService.sos
		}[func](self.data))

if __name__ == '__main__' :
	PORT = int(os.environ.get('PORT', 6000))
	httpd = SocketServer.TCPServer(('localhost', PORT), MyTCPHandler)
	print(__file__ + ": Python server, binding to tcp://0.0.0.0:" + str(os.environ.get("PORT", 6000)))
	httpd.serve_forever()
