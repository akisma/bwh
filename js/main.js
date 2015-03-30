BWH = {};

BWH.nav = {
	initialize: function(){
		var view = this;

		$('.js-piece-load').on('click', function(e){
			var url = $(e.target).attr('href');

			e.preventDefault();

			$.get(url, view.loadPiece);
		});
	},

	loadPiece: function(data){
		$('.js-content').empty();
		$('.js-content').append(data);

		//TODO: update URL #hash for bookmarking
	}
};

//TODO
//make both slideshows run, colors on body, photos in frame, never full opacity on photos

BWH.photoModulator = function(){
	return {
		initialize: function(options){
			//$('.main').on('mousemove', this.listener);

			this.$slideshow = options.$slideshow;

			//kickoff animation
			this.transitionToNext();
		},

		listener: function(e){
			//make decisions based on position
		},

		changeHue: function(){

		},

		transitionToNext: function(){
			console.log('called');

			var $next = (this.$slideshow.find('.js-active').is(this.$slideshow.find('img').eq(0))) ? this.$slideshow.find('.js-active').next() : this.$slideshow.find('.js-active').prev(),
				view = this,
				opacity = (this.$slideshow.hasClass('js-photos')) ? .7 : 1,
				duration = (this.$slideshow.hasClass('js-photos')) ? 5000 : 20000;

			this.$slideshow.find('.js-active').animate({ opacity: 0 }, duration, function(){ $(this).removeClass('js-active active'); });
			$next.animate({ opacity: opacity }, duration, function(){ 
				$(this).addClass('js-active active'); 
				setTimeout(function(){ view.transitionToNext() }, 1000); 
			});
		}
	}
};




$(document).ready(function(){
	BWH.nav.initialize();

	BWH.widgets = {
		body: new BWH.photoModulator(),
		photos: new BWH.photoModulator()
	};

	BWH.widgets.body.initialize({ $slideshow: $('.js-slideshow').eq(0) });

	//delay the photos so they don't move at the same time
	

	$('.js-photos').find('.js-active').animate({ opacity: .7 }, 1000, function(){
		setTimeout(function(){
			BWH.widgets.photos.initialize({ $slideshow: $('.js-photos').eq(0) });
		}, 2000);
	});
});

