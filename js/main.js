$(document).ready(function(){

	$('.hands').waypoint(function(direction){
		if (direction == 'down'){
			$('.header-container').show();	
			$('.mini-header').hide();
		} else {
			$('.header-container').hide();
			$('.mini-header').show();
		}
	});
});
