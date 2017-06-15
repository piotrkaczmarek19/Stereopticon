(function($){
	$.fn.stereopticon = function(options){
		var defaults = {
			sectionContainer: 'page',
			page_height: 900,
			speed: 1200,
			topPos : 0,
		    animationTime: 1000,
		    lastAnimation: 0,
		    currentIndex: 1,
		    maxIndex: 4
		};
		var settings = $.extend(defaults, options); 

		// unbind traditionnal scrolling
		$(document).unbind('mousewheel DOMMouseScroll');
		
		$(window).on('resize', function(event)
		{
			for (i = 0; i < $('section').length; i++)
			{
				console.log($('section')[i].css)
				$('section.index-'+i).css({
				    "-webkit-transform": "translate3d(0," +  0 + "px, 0)",
				    "-webkit-transition": "transform 0.1s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "-moz-transform": "translate3d(0," +  0  + "px, 0)",
				    "-moz-transition": "transform 0.1s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "-ms-transform": "translate3d(0," +  0  + "px, 0)",
				    "-ms-transition": "transform 0.1s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "transform": "translate3d(0," +  0  + "px, 0)",
				    "transition": "transform 0.1s cubic-bezier(0.39, 0.575, 0.565, 1)"						
					});	
			}
			settings.currentIndex = 1;
		})
		$('section.index-1').addClass('current');

		return this.each(function(e){
			//attributing index to each section
			var data_index = 1;
			$('section').each(function(index){
				this.style.height = "100vh";
			});
			data_index++;


			$(this).on('mousewheel DOMMouseScroll', function(event) {
			   event.preventDefault();
			   var mode = "scroll";
			   var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
			   init_scroll(event, delta, mode);
			});
			$(this).on('keyup', function(event){
				if(event.keyCode === 38){
					var delta = 1;
					init_scroll(event, delta, "swipe");
				}else if(event.keyCode === 40){
					var delta = -1;
					init_scroll(event, delta, "swipe");
				}
			})
			//Prevent default swipe scrolling
			$(document).on('touchmove', function(event){
				event.stopImmediatePropagation();
				event.preventDefault
			}, false);
			$('body').on('touchstart', function(event){
				start_coordinateY = event.originalEvent.touches[0].clientY;
			}).on('touchend', function(event){
				event.preventDefault;
				end_coordinateY = event.originalEvent.changedTouches[0].clientY;
				distance_moved = start_coordinateY - end_coordinateY;
				// trigger swipeDown/Up only if movement larger than 40px in height, else trigger click event on finishing el
				if(distance_moved>40 || distance_moved<-40){
					// delta is -distance moved to reflect swiping mechanic and swipe mode to allow smaller quiet time between scrolls
					var delta = -distance_moved;
					var mode = "swipe";
					init_scroll(event, delta, mode)
				}else{
					el = event.originalEvent.target
					
				}
			});




		});
		function moveDown(){	
			index = settings.currentIndex;
			console.log($('section.index-1').offset())	
			current_section_offset = $('section.index-'+index).offset().top;
			destination_offset = index + 1;
			destination_coordinates_A =  $(window).height()*(index-1/2);
			destination_coordinates_B =  $(window).height() * index ;
			

			if(index === settings.maxIndex){
				i = 1;
				while(i<settings.maxIndex){
					$('section.index-'+i).css({
				    "-webkit-transform": "translate3d(0," +  0 + "px, 0)",
				    "-webkit-transition": "transform 0.1s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "-moz-transform": "translate3d(0," +  0  + "px, 0)",
				    "-moz-transition": "transform 0.1s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "-ms-transform": "translate3d(0," +  0  + "px, 0)",
				    "-ms-transition": "transform 0.1s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "transform": "translate3d(0," +  0  + "px, 0)",
				    "transition": "transform 0.1s cubic-bezier(0.39, 0.575, 0.565, 1)"						
					})
					i++;

				}	
				setTimeout(function(){
					$('section.index-'+settings.maxIndex).css({
				    "-webkit-transform": "translate3d(0," +  0 + "px, 0)",
				    "-webkit-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "-moz-transform": "translate3d(0," +  0  + "px, 0)",
				    "-moz-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "-ms-transform": "translate3d(0," +  0  + "px, 0)",
				    "-ms-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "transform": "translate3d(0," +  0  + "px, 0)",
				    "transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)"						
					})					
				},100)
				settings.currentIndex = 1;
				return;
			}else{
				$('section.index-'+index+' div').children(".button-flat.scroll").addClass('hidden');
				for (i = index + 1; i<=settings.maxIndex; i++){
					$('section.index-'+i).addClass('animate');
				}
				$('.animate').css({
					    "-webkit-transform": "translate3d(0,-" +  destination_coordinates_A + "px, 0)",
					    "-webkit-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
					    "-moz-transform": "translate3d(0,-" +  destination_coordinates_A  + "px, 0)",
					    "-moz-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
					    "-ms-transform": "translate3d(0,-" +  destination_coordinates_A  + "px, 0)",
					    "-ms-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
					    "transform": "translate3d(0,-" +  destination_coordinates_A  + "px, 0)",
					    "transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)"
					    
				})
				setTimeout(function(){
					$('.animate').css({
				    "-webkit-transform": "translate3d(0,-" +  destination_coordinates_B + "px, 0)",
				    "-webkit-transition": "transform 0.6s cubic-bezier(0.47, 0, 0.745, 0.715)",
				    "-moz-transform": "translate3d(0,-" + destination_coordinates_B + "px, 0)",
				    "-moz-transition": "transform 0.6s cubic-bezier(0.47, 0, 0.745, 0.715)",
				    "-ms-transform": "translate3d(0,-" +  destination_coordinates_B + "px, 0)",
				    "-ms-transition": "transform 0.6s cubic-bezier(0.47, 0, 0.745, 0.715)",
				    "transform": "translate3d(0,-" + destination_coordinates_B + "px, 0)",
				    "transition": "transform 0.6s cubic-bezier(0.47, 0, 0.745, 0.715)"
					})		
						
				}, 600);
				setTimeout(function(){
		            $("section").removeClass("animate");

		        }, 1200);		
		        $('section.index-'+index).removeClass('current');		
				settings.currentIndex ++;
				$('section.index-'+settings.currentIndex).addClass('current');

				//Resetting layout of previous page if modified by inner scrolling
				var $section = $('section.index-'+index).children('.page');
				$section.children().css({
				    "-webkit-transform": "translate3d(0, 0 0)",
				    "-webkit-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "-moz-transform": "translate3d(0, 0, 0)",
				    "-moz-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "-ms-transform": "translate3d(0, 0, 0)",
				    "-ms-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
				    "transform": "translate3d(0, 0, 0)",
				    "transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)"				
				})
			}
		} 	
		function moveUp(){
			
			index = settings.currentIndex;	
			current_section_offset = $('section.index-'+index).offset().top;


			

			if(index === 1){
				destination_coordinates = settings.page_height * 3;
						$('section.index-4').css({
							"-webkit-transform": "translate3d(0,-" +  destination_coordinates + "px, 0)",
						    "-webkit-transition": "all 0.8s cubic-bezier(0.39, 0.575, 0.565, 1)",
						    "-moz-transform": "translate3d(0,-" +  destination_coordinates  + "px, 0)",
						    "-moz-transition": "all 0.8s cubic-bezier(0.39, 0.575, 0.565, 1)",
						    "-ms-transform": "translate3d(0,-" +  destination_coordinates  + "px, 0)",
						    "-ms-transition": "all 0.8s cubic-bezier(0.39, 0.575, 0.565, 1)",
						    "transform": "translate3d(0,-" +  destination_coordinates  + "px, 0)",
						    "transition": "all 0.8s cubic-bezier(0.39, 0.575, 0.565, 1)"
						})		
				setTimeout(function(){
					for (i = settings.maxIndex - 1; i>index; i--){
						destination_coordinates = settings.page_height * (i-1);
						$('section.index-'+i).css({
							"-webkit-transform": "translate3d(0,-" +  destination_coordinates + "px, 0)",
						    "-webkit-transition": "all 0.8s cubic-bezier(0.39, 0.575, 0.565, 1)",
						    "-moz-transform": "translate3d(0,-" +  destination_coordinates  + "px, 0)",
						    "-moz-transition": "all 0.8s cubic-bezier(0.39, 0.575, 0.565, 1)",
						    "-ms-transform": "translate3d(0,-" +  destination_coordinates  + "px, 0)",
						    "-ms-transition": "all 0.8s cubic-bezier(0.39, 0.575, 0.565, 1)",
						    "transform": "translate3d(0,-" +  destination_coordinates  + "px, 0)",
						    "transition": "all 0.8s cubic-bezier(0.39, 0.575, 0.565, 1)"
						})			
					}	
		        }, 600);

				settings.currentIndex = settings.maxIndex;
				console.log('resetting!' + settings.currentIndex)
				return;
			}else{
				destination_offset = index - 1;
				destination_coordinates_A =  $('section.index-'+destination_offset).position().top;
				destination_coordinates_B =  $('section.index-'+destination_offset).position().top ;
				$('section.index-'+index+' div').children(".button-flat.scroll").addClass('hidden');
				for (i = index; i<=settings.maxIndex; i++){
					$('section.index-'+i).addClass('animate');
				}
				$('.animate').css({
					    "-webkit-transform": "translate3d(0,-" +  destination_coordinates_A + "px, 0)",
					    "-webkit-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
					    "-moz-transform": "translate3d(0,-" +  destination_coordinates_A  + "px, 0)",
					    "-moz-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
					    "-ms-transform": "translate3d(0,-" +  destination_coordinates_A  + "px, 0)",
					    "-ms-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
					    "transform": "translate3d(0,-" +  destination_coordinates_A  + "px, 0)",
					    "transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)"
					    
				})

				setTimeout(function(){///workaround
		            $("section").removeClass("animate");

		        }, 600);							
		        $('section.index-'+index).removeClass('current');		
		        settings.currentIndex --;	
				$('section.index-'+settings.currentIndex).addClass('current');		
			}		

		}
		// Scrolling inside the content of the page
		function moveInner(offsetY, index){
			var $section = $('section.index-'+index).children('.page');
			$section.children().css({
			    "-webkit-transform": "translate3d(0," +  offsetY + "px, 0)",
			    "-webkit-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
			    "-moz-transform": "translate3d(0," +  offsetY  + "px, 0)",
			    "-moz-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
			    "-ms-transform": "translate3d(0," +  offsetY  + "px, 0)",
			    "-ms-transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)",
			    "transform": "translate3d(0," +  offsetY  + "px, 0)",
			    "transition": "transform 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)"				
			})
		}



		
		function init_scroll(event, delta, mode) {
		    var deltaOfInterest = delta,
			   	timeNow = new Date().getTime(),
			   	quietPeriod = mode === "scroll"? 1600 : 1300,
			    index = settings.currentIndex,
				overflow;
		   // Cancel scroll if currently animating or within quiet period
		   if(timeNow - settings.lastAnimation < quietPeriod) {
		      event.preventDefault();
		      return;
		   }

		   if (deltaOfInterest < 0) {
		   		moveDown()
		   } else if (deltaOfInterest>0) {
		   		moveUp()
		   }
		   settings.lastAnimation = timeNow;

	

		}
					
	}
}) (jQuery);