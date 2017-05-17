import unittest
import numpy
import scipy

import sys
sys.path.insert(0, '../')
from classes.kSpace import kSpace

class Simple2DkSpaceTestCase(unittest.TestCase) :
    def setUp(self) :
        self.kspace = kSpace(numpy.array([ [1, 2, 3, 4, 5],
                                           [1, 2, 3, 4, 5],
                                           [1, 2, 3, 4, 5],
                                           [1, 2, 3, 4, 5],
                                           [1, 2, 3, 4, 5] ]))

    def tearDown(self) :
        self.kspace = None

class Simple3DkSpaceTestCase(unittest.TestCase) :
    def setUp(self) :
        self.kspace = kSpace(numpy.array([
            [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ],
            [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ],
            [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ] ]))
    def tearDown(self) :
        self.kspace = None
            

        
class Zeros2DkSpaceTestCase(unittest.TestCase) :
    def setUp(self) :
        self.kspace = kSpace(numpy.zeros((5, 5)))

    def tearDown(self) :
        self.kspace = None

class Zeros3DkSpaceTestCase(unittest.TestCase) :
    def setUp(self) :
        self.kspace = kSpace(numpy.zeros((5, 5, 5)))
    def tearDown(self) :
        self.kspace = None
        
class Inverse2DFTReconstructionTestCase(Simple2DkSpaceTestCase) :
    def test_image_is_not_accessible_before_recon(self) :
        with self.assertRaises(ValueError) :
            image = self.kspace.image

    def test_result_matches_matlab(self) :
        image = self.kspace.IFT()
        matlab = numpy.array([
            [3+0j, -0.5-0.688190960235587j, -0.5-0.162459848116453j, -0.5+0.162459848116453j, -0.5+0.688190960235587j],
            [0+0j, 0+0j, 0+0j, 0+0j, 0+0j],
            [0+0j, 0+0j, 0+0j, 0+0j, 0+0j],
            [0+0j, 0+0j, 0+0j, 0+0j, 0+0j],
            [0+0j, 0+0j, 0+0j, 0+0j, 0+0j]
        ])

        isCloseEnough = numpy.allclose(self.kspace.image, matlab)
        self.assertTrue(isCloseEnough)
        
class ValidationTestCases(Zeros3DkSpaceTestCase) :
    def test_require_numpy_array(self) :
        self.assertEqual(type(self.kspace.data), numpy.ndarray)
        with self.assertRaises(TypeError) :
            kspace = kSpace([[1, 2], [1, 2]])

    def test_require_two_or_three_dimensions(self) :
        self.assertEqual(self.kspace.data.shape, (5, 5, 5))
        with self.assertRaises(ValueError) :
            kspace = kSpace(numpy.zeros((1)))
            

class Inverse3DFTReconstructionTestCase(Simple3DkSpaceTestCase) :
    def test_image_is_not_accessible_before_recon(self) :
        with self.assertRaises(ValueError) :
            image = self.kspace.image

    def test_result_matches_matlab(self) :
        image = self.kspace.IFT()
        matlab = numpy.array([
            [[2+0j, -0.5-0.288675134594813j, -0.5+0.288675134594813j ], [0,0,0], [0,0,0] ],
            [[0,0,0], [0,0,0], [0,0,0] ],
            [[0,0,0], [0,0,0], [0,0,0] ] ])
        isCloseEnough = numpy.allclose(self.kspace.image, matlab)
        self.assertTrue(isCloseEnough)

            
if __name__ == '__main__' :
    unittest.main()
