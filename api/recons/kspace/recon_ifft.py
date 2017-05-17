import numpy
from classes.kSpace import kSpace

        
def main() :
    #kspace = kSpace(numpy.zeros((5,5)))

    kspace = kSpace(numpy.array([
            [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ],
            [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ],
            [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ] ]))

    kspace.IFT()
    print(kspace.image)
    
if __name__ == "__main__" :
    main()
