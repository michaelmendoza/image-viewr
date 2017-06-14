import numpy
from classes.kSpace import kSpace

        
def main() :
    #kspace = kSpace(numpy.zeros((5,5)))

    #kspace = kSpace(numpy.array([
    #        [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ],
    #        [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ],
    #        [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ] ]))

    #kspace.IFT()
    #print(kspace.image)

    #kspace = kSpace(numpy.random.rand(512, 512, 512))
    #kspace.recon()

    kspace2 = kSpace(numpy.random.rand(10000,10000))
    kspace2.recon()
    
if __name__ == "__main__" :
    main()
