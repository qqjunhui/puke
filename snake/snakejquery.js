$(function(){
    class Game{
        constructor(obj){//��ֵ��ֵ
            this.obj=obj;
            this.way="right";
            this.t=0;
            this.food={x:0,y:0};
            this.snake=[{x:0,y:0},{x:1,y:0},{x:2,y:0}];
        }
        drawscene() {//���쳡��
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 20; j++) {
                    let div = document.createElement("div");
                    this.obj.appendChild(div);
                    let idname = 'c' + j + '-' + i;
                    div.id = idname;
                }
            }
        }
        drawsnake(){//����
            this.snake.forEach((val)=>{
                let idname=val.x+'-'+val.y;
                let domobj=document.querySelector("#c"+idname);
                domobj.className="snake";
            })
        }
        drawfood() {//��ʳ��
            do {
                let {random:ran,floor:f}=Math;
                this.food.x = f(ran() * 20);
                this.food.y = f(ran() * 20);
            } while (this.check(this.food.x,this.food.y, this.snake));
            let fruit = document.querySelector("#c" + this.food.x + "-" + this.food.y);
            fruit.className = 'food';
            this.food = {x:this.food.x, y:this.food.y};
        }
        check(x,y,arr){//���ʳ���Ƿ�����������Ϻͼ���Ƿ�Ե��Լ�
            return arr.some((obj)=>{
                return obj.x==x&&obj.y==y;
            })
        }
        move(){//��������Ƿ��ȥ���Լ���������ƶ��������ж��Ƿ�Ե�ʳ�������Լ���
            //ͷ����Ƚ�
            this.t=setInterval(()=>{
                let oldhead=this.snake[this.snake.length-1];
                let newhead;
                switch(this.way){
                    case 'right':newhead={x:oldhead.x+1,y:oldhead.y};break;
                    case 'left':newhead={x:oldhead.x-1,y:oldhead.y};break;
                    case 'top':newhead={x:oldhead.x,y:oldhead.y-1};break;
                    case 'bottom':newhead={x:oldhead.x,y:oldhead.y+1};break;
                }
                let newobj=document.querySelector('#c'+newhead.x+'-'+newhead.y);
                //console.log(new)
                if(newobj==null||this.check(newhead.x,newhead.y,this.snake)){
                    alert("game over");
                    clearInterval(this.t);
                    return;
                }
                this.snake.push(newhead);
                newobj.className="snake";
                if(newhead.x==this.food.x&&newhead.y==this.food.y){
                    this.drawfood();
                }else{
                    let oldend=document.querySelector("#c"+this.snake[0].x+"-"+this.snake[0].y);
                    oldend.className="";
                    this.snake.shift();
                }
            },200)
        }
        keydown(){//������¼�
            document.onkeydown=((e)=>{
                let code=e.keyCode;
                switch(code){
                    case 37:
                        if(this.way=='right'){
                            return;
                        }
                        this.way='left';
                        break;
                    case 38:
                        if(this.way=='bottom'){
                            return;
                        }
                        this.way='top';
                        break;
                    case 39:
                        if(this.way=='left'){
                            return;
                        }
                        this.way='right';
                        break;
                    case 40:
                        if(this.way=='top'){
                            return;
                        }
                        this.way='bottom';
                        break;
                        }
            })
        }
        play(){
            this.drawscene();
            this.drawsnake();
            this.drawfood();
            this.move();
            this.keydown();
        }
    }
    let box=document.querySelector(".box");
    let newgame=new Game(box);
    newgame.play();
})