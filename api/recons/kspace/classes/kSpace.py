import numpy
import pyfftw
import time
import os
ibasis = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import sys
sys.path.insert(0, ibasis)
from IBasis import IBasis

class kSpace(IBasis) :
    # Methods:
    def validateData(self, data) :
        if type(data) is not numpy.ndarray :
            raise TypeError("The constructor requires a numpy array!")
        elif (len(data.shape) is not 2) and (len(data.shape) is not 3) :
            raise ValueError("The array must be two or three dimensional!")
        return data

    # Recon Methods:
    def recon(self, option = "default") :

        # Default reconstruction method is a stright inverse Fourier Transform:
        if option is "default" :
            print("Default IFFT reconstruction running...")
            if len(self.data.shape) is 2 :
                self.image = pyfftw.interfaces.numpy_fft.ifft2(self.data)  
            else :
                self.image = pyfftw.interfaces.numpy_fft.ifftn(self.data)
                
            return(self.image)

        elif option is "elliptical" :
            print("Perform elliptical model recon")
            return numpy.zeros(self.data.shape)
        elif option is "spiral" :
            print("Perform spiral recon")
            return numpy.zeros(self.data.shape)
        else :
            raise ValueError("Must reconstruct with valid option!")
