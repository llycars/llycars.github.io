//由于在IE10之前的版本 没有getElementByClassName这个标签，所以得考虑兼容性的问题，就把这个标签封装起来
function getByClass(clsName,parent){
  var oParent=parent?document.getElementById(parent):document,
  //当传过来的参数中有父元素parent时，获取这个父元素的ID名，若没有传过来父元素时，就是doument了
      eles=[],
      //创建一个数组，用于后面存储相同className的元素
      elements=oParent.getElementsByTagName('*');
//获取全部的TagName
//遍历元素
  for(var i=0,l=elements.length;i<l;i++){
  	//如果传过来的class参数和elements中的相同时
    if(elements[i].className==clsName){
    	//那么将这些相同的元素存储到创建的eles数组中
      eles.push(elements[i]);
    }
  }
  //getByClass函数返回一个数组
  return eles;
}
//加载完成时执行drag函数
window.onload=drag;

function drag(){
	//首先获取了可拖动部分的class类名
   var oTitle=getByClass('login_logo_webqq','loginPanel')[0];
   // 拖曳 点击鼠标时就是onmousedown执行fnDown函数
   oTitle.onmousedown=fnDown;
   // 关闭  右上方的按钮 点击关闭整个界面
   var oClose=document.getElementById('ui_boxyClose');
   oClose.onclick=function(){
   	  document.getElementById('loginPanel').style.display='none';
   }
   // 切换状态
   var loginState=document.getElementById('loginState'),
   //界面下方部分
       stateList=document.getElementById('loginStatePanel'),
       //ul部分 选择状态
       lis=stateList.getElementsByTagName('li'),
       //获取全部的li标签
       stateTxt=document.getElementById('login2qq_state_txt'),
       //获取当前显示的 在线
       loginStateShow=document.getElementById('loginStateShow');
       //获取小图标

   loginState.onclick=function(e){
   	 e = e || window.event;
     if(e.stopPropagation){
          e.stopPropagation();
          //如果支持stopPropagation时 用stopPropagation来阻止继续冒泡
     }else{
          e.cancelBubble=true;
          //如果是IE不支持stopPropagation时 用cancelBubble来阻止继续冒泡
     }
   	 stateList.style.display='block';
   }

   // 鼠标滑过、离开和点击状态列表时
   for(var i=0,l=lis.length;i<l;i++){
      lis[i].onmouseover=function(){
      	this.style.background='#567';
      }
      lis[i].onmouseout=function(){
      	this.style.background='#FFF';
      }
      lis[i].onclick=function(e){
      	//67-72 是让各种浏览器都兼容
      	e = e || window.event;
      	if(e.stopPropagation){
          e.stopPropagation();
      	}else{
          e.cancelBubble=true;
      	}
      	var id=this.id;
      	stateList.style.display='none';
        stateTxt.innerHTML=getByClass('stateSelect_text',id)[0].innerHTML;
        //让选择的状态显示出来
        loginStateShow.className='';
        loginStateShow.className='login-state-show '+id;
      }
   }
   document.onclick=function(){
   	  stateList.style.display='none';
   }
}

function fnDown(event){
  event = event || window.event;
  var oDrag=document.getElementById('loginPanel'),
      // 光标按下时光标和面板之间的距离
      disX=event.clientX-oDrag.offsetLeft,
      disY=event.clientY-oDrag.offsetTop;
  // 移动
  
  //oDrag.offsetLeft==608
  document.onmousemove=function(event){
  	event = event || window.event;
  	fnMove(event,disX,disY);
  }
  // 释放鼠标
  document.onmouseup=function(){
  	document.onmousemove=null;
  	document.onmouseup=null;
  }
}

function fnMove(e,posX,posY){
  var oDrag=document.getElementById('loginPanel'),
      l=e.clientX-posX,
      //l是移动后整个面板和左侧屏幕的距离
      t=e.clientY-posY,
      //t是移动后整个面板和上方屏幕的距离
      winW=document.documentElement.clientWidth || document.body.clientWidth,
      //屏幕的宽度
      winH=document.documentElement.clientHeight || document.body.clientHeight,
      //屏幕的长度
      maxW=winW-oDrag.offsetWidth-10,
      maxH=winH-oDrag.offsetHeight;
      
      //l==639
  if(l<0){
    l=0;
  }else if(l>maxW){
    l=maxW;
  }
  if(t<0){
    t=10;
  }else if(t>maxH){
    t=maxH;
  }
  oDrag.style.left=l+'px';
  oDrag.style.top=t+'px';
}