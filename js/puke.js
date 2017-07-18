$(function(){
	let arr=[];//定义一个数组来存放扑克牌
	let hsarr=['c','d','h','s'];//定义一个数组存放四种花色
	let sign={};//定义一个对象，存放已经循环过的牌
//	let i=0;
	while(arr.length<52){//循环arr数组
//		i++;
		let sz=Math.ceil(Math.random()*13);
		let hs=hsarr[Math.floor(Math.random()*hsarr.length)];
		if(!sign[sz+'-'+hs]){
			sign[sz+'-'+hs]=true;
			arr.push({sz,hs});
		}
	}
	let n=0;
	for(let i=0;i<7;i++){
		for(let j=0;j<i+1;j++){
			$('<li class=pai>').attr({'id':i+'-'+j,value:arr[n].sz}).appendTo('ul').delay(n*50).animate({
				left:300-50*i+100*j,
				top:50*i,
				opacity:1,
			}).css('background-image',`url(img/${arr[n].sz}${arr[n].hs}.png)`);
			n++;
		}
	}
	for(;n<52;n++){
		$("<li class='pai zuo'>").attr({'id':'7-'+n,value:arr[n].sz}).appendTo('ul').delay(n*50).animate({
				left:100,
				top:470,
				opacity:1,
			}).css('background-image',`url(img/${arr[n].sz}${arr[n].hs}.png)`);
	}
	let current=null;
	$('li').click(function(){
		let x=parseInt($(this).attr('id').split('-')[0]);
		let y=parseInt($(this).attr('id').split('-')[1]);
		console.log($(`#${x+1}-${y}`).length==1||$(`#${x+1}-${y+1}`).length==1);
		if($(`#${x+1}-${y}`).length==1||$(`#${x+1}-${y+1}`).length==1){
			return;
		}
		$(this).toggleClass('active');
		if(!current){
			if($(this).attr('value')==13){
				$(this).animate({
					left:600,
					top:0,
					opacity:0,
				},400,function(){
					$('.active').remove();
				});
				
			}else{
				current=$(this);
			}
		}else{
			if(parseInt(current.attr('value'))+parseInt($(this).attr('value'))==13){
				$('.active').animate({
					left:600,
					top:0,
					opacity:0,
				},400,function(){
					$('.active').remove();
					current=null;
				})
			}else{
				setTimeout(function(){
					$('.active').removeClass('active');
				});
				current=null;
			}
		}
		
	});
	let index=1;
	$('div.r').click(function(){
		$('.zuo').removeClass('active')
		$('.zuo').last().addClass('you').removeClass('zuo').css('z-index',++index).animate({
			left:500,
		},400);
	})
	$('div.l').click(function(){
		$('.you').removeClass('active')
		$('.you').addClass('zuo').removeClass('you').css('z-index',++index).each(function(index){
			$(this).delay(50*index).animate({
				left:100,
			},400)
		})
	})
})