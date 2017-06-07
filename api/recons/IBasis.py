from abc import ABCMeta, abstractmethod
import matplotlib.pyplot as plt

####################################################
## An interface for all basis classes:
# Properties:
#    'data'
#        This property is the raw data that you load
#        that you want to perform some reconstrution
#    'image'
#        This property is the output of the recon()
#        method. It is only accessible after recon()
#        is called.
#
# Methods:
#    'recon(**kwargs)'
#        This method performs the reconstruction.
#        **kwargs are the options needed to perform
#        the reconstruction.
#    'show()'
#        This method generates a plot from the
#        image. Mostly for debugging.
####################################################

class IBasis(object) :
    __metaclass__ = ABCMeta

    def __init__(self, initialData) :
        self.data = self.validateData(initialData)
        self._image = None

    @property
    def image(self) :
        if self._image is None :
            raise ValueError("Must call recon before reconstructed data is available!")
        else :
            return self._image

    @image.setter
    def image(self, im) :
        self._image = im
    
    @abstractmethod
    def validateData(self, data) :
        raise NotImplementedError("All Bases should specifiy a validation function!")
    @abstractmethod
    def recon(self, **kwargs):
        raise NotImplementedError("All Bases should implement a recon method!")

    def show(self) :
        if self._image is None :
            raise ValueError("Must call recon before reconstructed data is available!")
        else :
            plt.imshow(abs(self._image))
            plt.show()
