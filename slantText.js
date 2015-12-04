(function($) {

    $.fn.slantText = function(options) {

        // Default settings
        var settings = $.extend({
            direction : 'left',             // Direction of the slant
            angle : 45,                     // Angle of slant, must be positive. If slant is negative, use reverse
            content_wrapper : 'article',    // Wrapper around the text
            line_height : 28,               // Line height of the text
            additional : 0,                 // Adds additional slant shims
            min_width : 1024,               // Minimum window width to fire function
            reverse : false                 // Reverses slant
        }, options);

        var win_width = window.innerWidth;
        var angle_division = settings.angle / 10;
        var angle_increment =  0.25 * angle_division;
        var angle_divide = 2.4 - angle_increment;

        $('.slant', this).remove(); // Removes any unnecessary slants on resize.

        return this.each( function() {

            if(win_width >= settings.min_width){
                $(this).each(function(){
                    var text_height = $(settings.content_wrapper, this).height() / settings.line_height + settings.additional; // article height, divided by the line-height, plus any additional
                    var slant_amount = Math.round(text_height);
                    
                    if(settings.reverse === true){ // Reverse
                        for(i=slant_amount; i > 0; i--) {
                            slant_angle = settings.angle / angle_divide * i;
                            $(settings.content_wrapper, this).before('<div class="slant slant-'+settings.direction+'" style="width: '+slant_angle+'px; height: '+settings.line_height+'px;"></div>');       
                        }
                    } else {
                        for(i=0; i < slant_amount; i++) {
                            slant_angle = settings.angle / angle_divide * i;
                            $(settings.content_wrapper, this).before('<div class="slant slant-'+settings.direction+'" style="width: '+slant_angle+'px; height: '+settings.line_height+'px;"></div>');   
                        }
                    }
                });
            }
        });
    };
}(jQuery));