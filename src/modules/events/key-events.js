
class KeyEvents {

	keydown(event) {
		var keyCode = event.keyCode;
		var panStep = 20;

		/***** Escape (ESC) *****/
		if(keyCode == '27') { // ESC
			return;
		}

		else if(keyCode == '37') { // Left Arrow
			this.panImageFixedAmount(-panStep, 0);
			return;
		} 

		else if(keyCode == '38') { // Up Arrow
			this.panImageFixedAmount(0, -panStep);
			return;
		}

		else if(keyCode == '39') { // Right Arrow
			this.panImageFixedAmount(panStep, 0);			
			return;
		}

		else if(keyCode == '40') { // Down Arrow
			this.panImageFixedAmount(0, panStep);			
			return;
		}

		else if(keyCode == '190' || keyCode == '187') { // Period, or Equals Button
			this.zoomIn();
			return;
		}

		else if(keyCode == '188' || keyCode == '189') { // Comma, or Dash Button
			this.zoomOut();
			return;
		}

	}
}

export default KeyEvents;

