import sys

class PyPort (object) :
	@staticmethod
	def set_port (port) :
		f = open('pyport', 'w')
		f.write(port)
		f.close()
		return(port)

	@staticmethod
	def get_port () :
		f = open('pyport', 'r')
		port = f.readLine()
		f.close()
		return(port)
