import numpy
import pyfftw
import time

class kSpace(object) :
    # Getter and setter for image reconstruction validation:
    def get_image(self) :
        if self._image is None :
            raise ValueError("Data must be reconstructed before an image is available!")
        else :
            return self._image

    def set_image(self, image) :
        self._image = image

    # Member variables:
    image = property(get_image, set_image)
    
    # Constructor:
    def __init__(self, initialData) :
        self.data = self.validateData(initialData)
        self._image = None

    # Methods:
    def validateData(self, data) :
        if type(data) is not numpy.ndarray :
            raise TypeError("The constructor requires a numpy array!")
        elif (len(data.shape) is not 2) and (len(data.shape) is not 3) :
            raise ValueError("The array must be two or three dimensional!")
        return data

    # Recon Methods:
    def IFT(self) :
        if len(self.data.shape) is 2 :
            
           # Try the numpy:
            tas = time.time()
            self.image = numpy.fft.ifft2(self.data)
            tas = time.time() - tas
            print("numpy 2D IFFT computed in: ", tas)
            
            # try the fftw:
            tas = time.time()
            self.image = pyfftw.interfaces.numpy_fft.ifft2(self.data)
            tas = time.time() - tas
            print("fftw 2D IFFT computed in: ", tas)
            
        else :
            # try the numpy:
            tas = time.time()
            self.image = numpy.fft.ifftn(self.data)
            tas = time.time() - tas
            print("numpy 3D IFFT computed in: ", tas)

            # try the fftw:
            tas = time.time()
            self.image = pyfftw.interfaces.numpy_fft.ifftn(self.data)
            tas = time.time() - tas
            print("fftw 3D IFFT computed in: ", tas)
            
    def ellipticalRecon(self) :
        print("Perform elliptical model recon")

    def spiralRecon(self) :
        print("Perform spiral recon")
