(function($){

	var count=0;
	$.fn.scrollfade=function(option){
		if(typeof(option)=='object'||typeof(option)=='undefined'){
      var args=(typeof(option)=='object'?[option]:[]);
			return this.each(function(){
			  return methods.init.apply(this,args);
			});
		}else if(typeof option=='string'&&typeof methods[option]=='function'){
      var args=Array.prototype.slice.call(arguments,1);
			return this.each(function(){
				return methods[option].apply(this,args);
				$.error('Element is not a scrollfade plugin');
			});
		}else $.error('Requested scrollfade method not found.');
	};

	var methods={
	// V A R S
		init:function(settings){
	    var self=this;
	    this.settings=$.extend({
		    'arrow-color':'black',
		    'click-scroll':100,
		    'time-fade-in':100,
		    'time-fade-out':200,
		    'delay-fader':1000,
		    'animate-multiplier':0
  		},settings);
	    this.index=count++;
	    this.scrollbar=false;
	    this.resizing=false;
	    this.manual=false;
	    this.timerFader=null;
	    this.timerResize=null;
	    this.timerNoise=null;
	    this.noise=false;
	    this.innerHeight=0;
	    this.thumbHeight=0;
	    this.thumbTop=0;
	    this.ignore=false;
	    this.mouseScrollbar=false;
	// C O N T E N T
			this.$content=$('<div class="scroll-fade-content">').css({padding:$(this).css('padding')}).html($(this).html());
	    this.$inner=$('<div class="scroll-fade-inner">').html(this.$content);
	    this.$scroll=$('<div class="scroll-fade-scroll">').html(this.$inner).scroll(function(){$(self).scrollfade('position');$(self).scrollfade('fader');});
			// T H U M B
	    this.$thumb=$('<div class="scroll-fade-thumb">').mousedown(function(e){
    		$(window).unbind('mousemove.scroll'+self.index).unbind('mouseup.mouseup'+self.index).unbind('selectstart.scroll'+self.index);
	    	if(self.ignore)return;
	    	var start=e.pageY;
	    	var scrollTop=self.$scroll.scrollTop();
	    	var top={
	    		scrollbar:((self.thumbTop/100)*self.$track.height()),
	    		page:(self.$scroll.scrollTop())
	    	}
	    	var avaiable={
	    		scrollbar:self.$track.height()-self.$thumb.height(),
	    		page:self.innerHeight-self.$outer.height()
	    	}
	    	self.manual=true;
	    	var ratio=avaiable.page/avaiable.scrollbar;
	    	$(window).attr('unselectable','on').css('user-select','none').bind('selectstart.scroll'+self.index,function(e){return false;});
	    	$(window).bind('mousemove.scroll'+self.index,function(e){
	    		var difference=e.pageY-start;
	    		difference=difference*ratio;
	    		if(difference<0){
	    			if(top.page<1)return;
	    			if(top.page<difference*-1)difference=top.page*-1;
	    		}else{
	    			if(top.page+avaiable.page>=self.innerHeight)return;
	    			if(top.page+difference>self.innerHeight)difference=self.innerHeight-avaiable.page;
	    		}
	    		self.$scroll.scrollTop(scrollTop+difference);
	    	});
	    	$(window).bind('mouseup.mouseup'+self.index,function(e){
	    		$(window).unbind('mousemove.scroll'+self.index).unbind('mouseup.mouseup'+self.index).unbind('selectstart.scroll'+self.index);
		    	$(self).scrollfade('position');
		    	self.manual=false;
	    	});
	    });
			// A R R O W S
	    this.$up=$('<div class="scroll-fade-button scroll-fade-up scroll-fade-'+(self.settings['arrow-color']=='black'?'black':'white')+'">').click(function(){
	    	if(self.ignore)return;
	    	var top=self.$scroll.scrollTop();
	    	if(top<1)return;
	    	var amount=(top<self.settings['click-scroll']?top:self.settings['click-scroll']);
	    	var time=(+self.settings['animate-multiplier'])*amount;
	    	self.$scroll.animate({scrollTop:'-='+amount},time);
	    });
	    this.$down=$('<div class="scroll-fade-button scroll-fade-down scroll-fade-'+(self.settings['arrow-color']=='black'?'black':'white')+'">').click(function(){
	    	if(self.ignore)return;
	    	var total=self.innerHeight;
	    	var bottom=self.$scroll.scrollTop()+self.$outer.height();
	    	if(bottom>=total)return;
	    	var amount=((bottom+self.settings['click-scroll']>total)?(total-bottom):self.settings['click-scroll']);
	    	var time=(+self.settings['animate-multiplier'])*amount;
	    	self.$scroll.animate({scrollTop:'+='+amount},time);
	    });
			// T R A C K   I N N E R   O U T E R
	    this.$track=$('<div class="scroll-fade-track">').append(this.$thumb);
	    this.$scrollbar=$('<div class="scroll-fade-scrollbar">').append(this.$up,this.$track,this.$down).mouseenter(function(e){self.mouseScrollbar=true;}).mouseleave(function(){self.mouseScrollbar=false;});
	    this.$outer=$('<div class="scroll-fade-outer">').append(this.$scroll,this.$scrollbar);
	    if($(this).css('position').toLowerCase()!='absolute')$(this).css('position','relative');
	    $(this).css({overflow:'hidden'}).html(this.$outer);
	// E V E N T S
	    $(this).mousemove(function(e){
	    	$(this).scrollfade('fader',e.pageX+'x'+e.pageY);
	    });
	    $(window).bind('resize.win'+self.index,function(){
	    	var key=$(window).width()+'x'+$(window).height();
	    	if(self.key==$(window).width()+'x'+$(window).height())return;
	    	self.$inner.width(self.$scroll.width()/2);
      	self.resizing=true;
	    	$(self).scrollfade('fader',key);
	      clearTimeout(self.timerResize);
	      self.timerResize=setTimeout(function(){
	      	self.resizing=false;
	      },+self.settings['delay-fader']);
	    });
	    self.$inner.width(self.$scroll.width()/2);
	    $(this).scrollfade('fader');
		},
		html:function(html){
	    this.$content.html(html);
    	$(this).scrollfade('fader');
		},
		append:function(html){
	    this.$content.append(html);
    	$(this).scrollfade('fader');
		},
		prepend:function(html){
	    this.$content.prepend(html);
    	$(this).scrollfade('fader');
		},
// P O S I T I O N
		position:function(){
    	var additional=parseInt(this.$inner.children().children().first().css('margin-top'))+parseInt(this.$inner.children().children().last().css('margin-bottom'));
    	this.innerHeight=this.$inner.height()+additional;
    	if(this.innerHeight<=$(this).height()){
    		this.ignore=true;
    		if(this.scrollbar||this.resizing)this.$scrollbar.fadeOut(+this.settings['time-fade-out']);
    		return;
    	}
    	this.ignore=false;
      this.thumbHeight=Math.round(($(this).height()/this.innerHeight)*10000)/100;
      this.thumbTop=Math.round((this.$scroll.scrollTop()/this.innerHeight)*10000)/100;
      this.$thumb.css({height:this.thumbHeight+'%',top:this.thumbTop+'%'});
		},
		fader:function(key){
			var self=this;
			if(self.noise)return;
			self.noise=true;
			this.timerNoise=setTimeout(function(){
				self.noise=false;
			},50);
	    $(this).scrollfade('position');
			if(this.ignore||this.mouseScrollbar||(key&&self.key==key))return;
			self.key=key;
      clearTimeout(self.timerFader);
			if(!self.scrollbar){
				self.scrollbar=true;
	      self.$scrollbar.fadeIn(+self.settings['time-fade-in']);
			}
      self.timerFader=setTimeout(function(){
      	if(self.mouseScrollbar||self.manual)return false;
				self.scrollbar=false;
        self.$scrollbar.fadeOut(+self.settings['time-fade-out']);
      },+self.settings['delay-fader']);
		}
	};

}(jQuery));