
var CanvasModes = {
	PIXEL: 'pixel',
	PAN: 'pan',
	PAN_UPDATE: 'pan_update',
	PAN_SLICE_UPDATE: 'pan_slice_update',
	ROI: 'roi',
	ROI_UPDATE_POSITION: 'roi_position',
	ROI_UPDATE_RADIUS: 'roi_radius',
	CUSTOM_ROI: 'custom_roi',
	CUSTOM_ROI_ADD_POINT: 'custom_roi_add_point',
	CUSTOM_ROI_UPDATE_POINT: 'custom_roi_update_point',
	CUSTOM_ROI_UPDATE_POSITION: 'custom_roi_update_position',	
	CONTRAST: 'contrast',
	THRESHOLD: 'threshold',
	THRESHOLD_EYEDROPPER: 'threshold_eyedropper',
	ZOOM: 'zoom', 
	ZOOM_UPDATE: 'zoom_update'
}

var CanvasModesTest = {
	PIXEL: 											{ id:'pixel',     status:0 },
	PAN: 												{ id:'pan',       status:0 },
	PAN_UPDATE: 								{ id:'pan',       status:1 },
	PAN_SLICE_UPDATE: 					{ id:'pan',       status:2 },
	ROI: 												{ id:'roi',       status:0 },
	ROI_UPDATE_POSITION: 				{ id:'roi',       status:1 },
	ROI_UPDATE_RADIUS:  				{ id:'roi',       status:2 },
	CUSTOM_ROI: 								{ id:'croi',      status:0 },
	CUSTOM_ROI_ADD_POINT: 			{ id:'croi',      status:1 },
	CUSTOM_ROI_UPDATE_POINT: 		{ id:'croi',      status:2 },
	CUSTOM_ROI_UPDATE_POSITION: { id:'croi',      status:3 },
	CONTRAST: 									{ id:'contrast',  status:0 },
	THRESHOLD: 									{ id:'threshold', status:0 },
	THRESHOLD_EYEDROPPER: 			{ id:'threshold', status:1 },
	ZOOM: 											{ id:'zoom',      status:0 },
	ZOOM_UPDATE: 								{ id:'zoom',      status:1 }
}

export default CanvasModes;