 import EventEmitter from 'events';

 class ViewStateStore extends EventEmitter {

 	constructor() {
 		super();
		this.view = 'horizontal';
		this.views = ['hidden', 'vertical', 'horizontal'];
		this.show = [true, false, false];
 	}
 	
 	setVertical() { this.view = 'vertical'; this.emit('update'); }

 	setHorizontal() { this.view = 'horizontal'; this.emit('update'); }

 	setHidden() { this.view = 'hidden'; this.emit('update'); } 

 	togglePane(index) { this.show[index] = !this.show[index]; this.emit('update'); }

 	setTo2D() { 
 		this.show = [true, false, false];
 		this.emit('update');
 	}

 	setTo3D() { 
 		this.show = [true, true, true];
 		this.emit('update');
 	}

 	getToggleClass(index) {
 		return this.show[index] ? 'active' : '';
    this.emit('update');
 	}

 	getVerticalClass() {
 		return this.view == 'vertical' ? 'active' : '';
 	}

 	getHorizontalClass() {
 		return this.view == 'horizontal' ? 'active' : '';
 	}

 	getViewerClass() {
 		var options = {
 			'horizontal' : 'layout-row',
 			'vertical' : 'layout-column',
 			'hidden' : 'hidden'
 		}
 		return options[this.view];
 	}

 	getViewerPaneClassArray() { 
 		var count = 0;
 		this.show.forEach((show) => { if(show) count++; })
 		var paneClass = ['', '', 'two-panes', 'three-panes'][count];

 		var classes = ['','','']; 
 		classes[0] = this.show[0] ? paneClass : 'hidden';
 		classes[1] = this.show[1] ? paneClass : 'hidden';
 		classes[2] = this.show[2] ? paneClass : 'hidden';
 		return classes;
 	} 
 }

 export default new ViewStateStore();
