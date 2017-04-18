var size = 0.5;

var boxVertices = 
[ // X, Y, Z - Counter-clockwise
	// Top
	-size, size, -size,  0.5, 0.5, 0.5,
	-size, size, size,   0.5, 0.5, 0.5,
	size, size, size,    0.5, 0.5, 0.5,
	size, size, -size,   0.5, 0.5, 0.5,

	// Left
	-size, size, size,   0.75, 0.25, 0.5,
	-size, -size, size,  0.75, 0.25, 0.5,
	-size, -size, -size, 0.75, 0.25, 0.5,
	-size, size, -size,  0.75, 0.25, 0.5,

	// Right
	size, size, size,    0.25, 0.25, 0.75,
	size, -size, size,   0.25, 0.25, 0.75,
	size, -size, -size,  0.25, 0.25, 0.75,
	size, size, -size,   0.25, 0.25, 0.75,

	// Front
	size, size, size,    1.0, 0.0, 0.15,
	size, -size, size,   1.0, 0.0, 0.15,
	-size, -size, size,  1.0, 0.0, 0.15,
	-size, size, size,   1.0, 0.0, 0.15,

	// Back
	size, size, -size,   0.0, 1.0, 0.15,
	size, -size, -size,  0.0, 1.0, 0.15,
	-size, -size, -size, 0.0, 1.0, 0.15,
	-size, size, -size,  0.0, 1.0, 0.15,

	// Bottom
	-size, -size, -size, 0.5, 0.5, 1.0,
	-size, -size, size,  0.5, 0.5, 1.0,
	size, -size, size,   0.5, 0.5, 1.0,
	size, -size, -size,  0.5, 0.5, 1.0

];

var boxIndices = 
[
	// Top
	0, 1, 2,
	0, 2, 3,

	// Left
	5, 4, 6,
	6, 4, 7,

	// Right
	8, 9, 10,
	8, 10, 11,

	// Front
	13, 12, 14,
	15, 14, 12,

	// Back
	16, 17, 18,
	16, 18, 19,

	// Bottom
	21, 20, 22,
	22, 20, 23
];

var Geometry = {
	box: { vertices:boxVertices, indices:boxIndices }
};

export default Geometry;
