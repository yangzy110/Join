
jQuery(document).ready(function($) {
   			$(".myadd").click(function(event) {
   				/* Act on the event */
   				$(".fullmask").show();
   				$("#iadd").show();
   			});

   			$(".collect_see").mouseover(function(event) {
        	$(this).next().slideDown('400');
        });

        $(".moremenu").mouseleave(function(event) {
        	$(".moremenu").slideUp('200');
        });
		});



    	(function($, window, document, undefined) {   
		    var plugName = "dragMove",    
		        defaults = {    
		            childClass: '.drag',// 
		            limit: false,// �����ڴ�����    
		            callback: function($move, $replace) {}// ����λ�óɹ���Ļص�    
		        };    
		    
		    function Drag($this, options) {    
		        this.name = plugName;    
		        this.defaults = defaults;    
		        this.options = $.extend({}, defaults, options);    
		        this.init();    
		    }    
		    
		    Drag.prototype = {    
		        init: function() {    
		            this.handle();  
		        },    
		        handle: function() {  
		            var This = this;  
		  
		            // �϶�ʱ��ֹѡ���ı�    
		            $('<style>.DR_select{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.DR_maxIndex{z-index:99999}.DR_fixed{position:fixed !important;}.DR_holder{display:inline-block;}.DR_mid{vertical-align:middle;</style>').appendTo('head');   
		            $('[DR_drag]').addClass('DR_mid'); 

		            $(document).on('mousedown.DR', This.options.childClass, function(e) { 
		                if($('[DR_move]').length) return false;
		                var $p = $(this).parent();
		                $p.attr('DR_move', true);
		                var posX = $(this).position().left,// inner���ϵ����outer���ϵ��λ��    
		                    posY = $(this).position().top,    
		                    offX = e.offsetX,// ������inner�ڲ���λ��    
		                    offY = e.offsetY,    
		                    mouseX = e.clientX,// ���λ��    
		                    mouseY = e.clientY,    
		                    oWidth = $p.width(),    
		                    oHeight = $p.height();  
		                
		                $p.css({
		                    width: $p.width(),    
		                    height: "81px"  
		                });
		                if(+$p.attr('DR_replace')) {// �϶�����
		                    window.DR_replace = true;
		                    // ռλ  
		                    $('<i class="DR_holder"></i>').css({    
		                        width: $p.outerWidth(),    
		                        height: "81px"   
		                    }).addClass($('[DR_move]')[0].className).insertBefore($('[DR_move]')); 
		                }else {// �����϶�
		                    window.DR_replace = false;
		                }
		  
		                $('body').addClass('DR_select');   
		                $('[DR_move]').addClass('DR_maxIndex DR_fixed');
		                if(window.DR_replace) {
		                    $('[DR_move]').css({    
		                        left: mouseX - posX - offX,    
		                        top: mouseY - posY - offY    
		                    });
		                }
		  
		                $(document).on('mousemove.DR', function(e) {  
		                    mouseX = e.clientX;    
		                    mouseY = e.clientY;    
		    
		                    var diffX = mouseX - posX - offX,    
		                        diffY = mouseY - posY - offY,    
		                        maxW = $(window).width() - $('[DR_move]').outerWidth();    
		                        maxH = $(window).height() - $('[DR_move]').outerHeight();    
		    
		                    // ���Ʒ�Χ    
		                    if(This.options.limit) {    
		                        if(diffX <= 0) {    
		                            diffX = 0;    
		                        }    
		                        if(diffX >= maxW) {    
		                            diffX = maxW;    
		                        }    
		                        if(diffY <= 0) {    
		                            diffY = 0;    
		                        }    
		                        if(diffY >= maxH) {    
		                            diffY = maxH;    
		                        }    
		                    }    
		    
		                    $('[DR_move]').css({'left': diffX, 'top': diffY});  
		                });  
		            });  
		  
		            $(document).on('mouseup.DR', function() {  
		                if(!$('[DR_move]').length) return false;
		                if(window.DR_replace) {// �϶�����
		                    window.DR_replace = false;
		                    var $that = $('[DR_move]'), 
		                        DR_drag = $that.attr('DR_drag'),
		                        $all = $(This.options.childClass).parent('[DR_drag='+ DR_drag +']:not([DR_move])');// ��ͬ����ſɽ���λ��  
		                    if($all[0]) {// >=1
		                        $all.each(function(i) {  
		                            var $obj = $(this),
		                                col_c = $that.offset().left + $that.outerWidth()/2,
		                                row_c = $that.offset().top + $that.outerHeight()/2,
		                                left = $obj.offset().left,
		                                left_w = $obj.offset().left + $obj.outerWidth(),
		                                top = $obj.offset().top,
		                                top_h = $obj.offset().top + $obj.outerHeight();  
		                            if(left<col_c && left_w>col_c && top<row_c && top_h>row_c) { 
		                                window.$DR_obj = $obj;
		                                // ɾ�����߿�    
		                                $obj.after($('.DR_holder').clone().addClass('DR_holder_clone'));  
		                                $('.DR_holder:not(.DR_holder_clone)').replaceWith($obj);  
		                    
		                                $that.stop().animate({  
		                                    left: $('.DR_holder_clone').offset().left,  
		                                    top: $('.DR_holder_clone').offset().top  
		                                }, 100, function() {  
		                                    window.$DR_obj && This.options.callback($that, window.$DR_obj);
		                                    window.$DR_obj = null;
		                                    $('.DR_holder_clone').replaceWith($that);  
		                                    $that.removeAttr('style').removeAttr('DR_move');  
		                                    $that.removeClass('DR_maxIndex DR_fixed');  
		                                });  
		                            }else {  
		                                $that.stop().animate({  
		                                    left: $('.DR_holder').offset().left,  
		                                    top: $('.DR_holder').offset().top  
		                                }, 100, function() {  
		                                    window.$DR_obj && This.options.callback($that, window.$DR_obj);
		                                    window.$DR_obj = null;
		                                    $('.DR_holder').replaceWith($that);  
		                                    $that.removeAttr('style').removeAttr('DR_move');  
		                                    $that.removeClass('DR_maxIndex DR_fixed');
		                                });  
		                            }  
		                        });
		                    }else {// 0
		                        $that.stop().animate({  
		                            left: $('.DR_holder').offset().left,  
		                            top: $('.DR_holder').offset().top  
		                        }, 300, function() {  
		                            $('.DR_holder').replaceWith($that);  
		                            $that.removeAttr('style').removeAttr('DR_move');  
		                            $that.removeClass('DR_maxIndex DR_fixed');

		                        });
		                    }
		                }else {// �����϶�
		                    $('[DR_move]').removeAttr('DR_move');  
		                }
		                  
		                $('body').removeClass('DR_select');  
		                $(document).off('mousemove.DR');  
		            });  
		        },  
		    }    
		    
		    $.fn.extend({    
		        dragMove: function(options) {    
		            return this.each(function() {    
		                new Drag($(this), options);    
		            })    
		        }    
		    })    
		})(jQuery, window, document);

    $(function() {  
        // ���ò��
        $('body').dragMove({  
            limit: true,// �����ڴ�����  
        }); 

        $(".collect_see").click(function(event) {
        	/* Act on the event */
        	$("#tab_name_id").hide();
        	$("#tab_name_second").show();
        }); 
        $("#tab_name_second").click(function(event) {
        	/* Act on the event */
        	$("#tab_name_id").show();
        	$(this).hide();
        });


        $(".icreated_li").mouseover(function(event) {
        	$(this).children('.collect_see').fadeIn('400');
        	$(this).children('.roll').show();
            
        });
        $(".icreated_li").mouseleave(function(event) {
        	$(".collect_see").fadeOut('400');
        	$(".moremenu").slideUp('400');
        	$(this).children('.roll').hide();
        });


        //������
        $(".collect_see").mouseover(function(event) {
        	$(this).next().slideDown('400');
        });

        $(".moremenu").mouseleave(function(event) {
        	$(".moremenu").slideUp('200');
        });

        

    });  

    $(".sublist_cancel").click(function(event) {
    	/* Act on the event */
    	$(this).parent().parent().parent().remove();
    });

	// ;(function(){
    	$(".tab_name a").click(function(event) {
                 $(this).addClass('active');
                $(this).siblings().removeClass('active');
                              })
    	$(".no_btn").click(function(event) {
    		/* Act on the event */
    		$(".fullmask").hide();
    		$("#iadd").hide();
    	});
	// })()

// fans
		$(".tab_name a").click(function(event) {
                 $(this).addClass('active');
                $(this).siblings().removeClass('active');
                              })
		$(".watch_btn1").click(function(event) {
			/* Act on the event */
			$(".watch_btn2").show();
			$(".watch_btn1").hide();
		});
		$(".watch_btn2").click(function(event) {
			/* Act on the event */
			$(".watch_btn1").show();
			$(".watch_btn2").hide();
		});

		
