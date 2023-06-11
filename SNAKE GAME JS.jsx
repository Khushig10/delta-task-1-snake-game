let points=0;
    let time=60;
    let foodCheck=1;
    let gameNO=0;
     let words=['delta','games','snake','bonus','tails','heads','start','point','speed','walls'];

   

    /*DOM elements */
    const snake=document.querySelector('.snake');
    const snakeBody=document.querySelector('.snakeBody');
    const snakeTail=document.querySelector('.snakeTail');

    let food1=document.querySelector('.food1');
    let food2=document.querySelector('.food2');
    let food3=document.querySelector('.food3');
    let food4=document.querySelector('.food4');

   


    let scorebox=document.querySelector('scorebox');
    let point=document.querySelector('.points');
    const song=document.querySelector('snakeSong');
    const text=document.querySelector('.text');
    let timer=document.querySelector('.time');

    const up=document.querySelector('.up');
    const down=document.querySelector('.down');
    const left=document.querySelector('.left');
    const right=document.querySelector('.right');
    const start=document.querySelector('.start');

    let rank1=document.querySelector('.rank1');
    let rank2=document.querySelector('.rank2');
    let rank3=document.querySelector('.rank3');

    let leaderboardButton=document.querySelector('.leaderBoard');
    let leaderBox=document.querySelector('.leaderboard');
 

    /getting the object from the jsonstring and specifying the ranks in the div/
    const score=JSON.parse(localStorage.getItem('score1'));
    rank1.innerHTML=`rank1:${score.rank1} `;
    rank2.innerHTML=`rank2:${score.rank2} `;
    rank3.innerHTML=`rank3:${score.rank3} `;    
   

    /*showing the leaderboard when the leaderboard button is clicked which is 
    ranked based on time*/
    leaderboardButton.addEventListener("click",function(){
            
        showBoard();
        
     })
     function showBoard(){
        leaderBox.style.opacity='1';
           
    }
    /updation of new high scores/
    function pointsCounter(){
        if(points>score.rank1){
            score.rank2=score.rank1;
            score.rank1=points;   
        }
        else if(points<score.rank1&&points>score.rank2){
            score.rank3=score.rank2;
            score.rank2=points;   
        }
        else if(points<score.rank2&&points>score.rank3){
            score.rank3=points;   
        }
        localStorage.setItem('score1',JSON.stringify(score));
        
       
    }
    /if start is clicked the game starts so does the counter/
    start.addEventListener("click",function(){
        startgame();
    });
    

    function startgame(){




        /*functions when either snake is controlled through keyboard or
        onscreen commands*/
        up.addEventListener("click",function(){
            moveUp();
        });
        down.addEventListener("click",function(){
            moveDown();
        });
        left.addEventListener("click",function(){
            moveLeft();
        });
        right.addEventListener("click",function(){
            moveRight();
        });
    
        
        document.addEventListener("keydown",(event)=>{
            if(event.key==='ArrowDown'){
              moveDown();   
            }
            if(event.key==='ArrowUp'){
               moveUp();
            }
            if(event.key==='ArrowRight'){
                moveRight();
            }
            if(event.key==='ArrowLeft'){
                moveLeft();   
            }   
        });
        

        let upTimer=0;

        food1.style.opacity='1';
        food2.style.opacity='1';
        food3.style.opacity='1';
        food4.style.opacity='1';
         
        



        
     let coordinates={
        head:{x:300,y:300},
        body:{x:280,y:300},
        tail:{x:260,y:300},
   
    food1:{x:Math.floor(Math.random()*30)*20,y:Math.floor(Math.random()*30)*20},
    food2:{x:Math.floor(Math.random()*30)*20,y:Math.floor(Math.random()*30)*20},
    food3:{x:Math.floor(Math.random()*30)*20 ,y:Math.floor(Math.random()*30)*20 },
    food4:{x:Math.floor(Math.random()*30)*20 ,y:Math.floor(Math.random()*30)*20 }

};



        food1.style.left=coordinates.food1.x +'px';
        food1.style.top=coordinates.food1.y +'px';
        food2.style.left=coordinates.food2.x +'px';
        food2.style.top=coordinates.food2.y +'px';
        food3.style.left=coordinates.food3.x +'px';
        food3.style.top=coordinates.food3.y +'px';
        food4.style.left=coordinates.food4.x +'px';
        food4.style.top=coordinates.food4.y +'px';

        
     
        let z=setInterval(function(){
            timecontrol();
        },1000);
        function timecontrol(){
            time--;
            timer.innerHTML=`${time}`;
           
        }
        
        
        
        /functions used when snake is moved up ,down,left,right/
        function moveUp(){
            if(coordinates.head.x<=580 && coordinates.head.x>=0 && coordinates.head.y>=0
                && coordinates.head.y<=580 && time>=0 ){
                    clearInterval(upTimer);
    
                    coordinates.tail.x=coordinates.body.x;
                    snakeTail.style.left=coordinates.tail.x+'px';
                    coordinates.body.x=coordinates.head.x;
                    snakeBody.style.left=coordinates.body.x+'px';
                  
            
                    coordinates.tail.y=coordinates.body.y;
                    snakeTail.style.top=coordinates.tail.y+'px';
                    coordinates.body.y=coordinates.head.y;
                    snakeBody.style.top=coordinates.body.y+'px';
                    coordinates.head.y -=20;
                    snake.style.top=coordinates.head.y+'px';
    
                    eat();
                   
                 upTimer=setInterval( function(){
                    moveUp();},150);
                    
        }
        else{
            /*either when the game is over or when the snake collides with the wall
            following statements are true*/
           
            
                 pointsCounter();
                
                 
                clearInterval(z);   
        }
    }
    
        function moveDown(){
            
            if(coordinates.head.x<=580 && coordinates.head.x>=0 && coordinates.head.y>=0
                && coordinates.head.y<=580 && time>=0 ){
                    coordinates.body.x=coordinates.head.x;
                    snakeBody.style.left=coordinates.body.x+'px';
                    coordinates.tail.x=coordinates.body.x;
                    snakeTail.style.left=coordinates.tail.x+'px';
                    clearInterval(upTimer);
            
            
                    coordinates.tail.y=coordinates.body.y;
                    snakeTail.style.top=coordinates.tail.y+'px';
                    coordinates.body.y=coordinates.head.y;
                    snakeBody.style.top=coordinates.body.y+'px';
                    coordinates.head.y +=20;
                    snake.style.top=coordinates.head.y+'px';
    
                   
                    eat();
                       
                
                upTimer=setInterval( function(){
                    moveDown();},150);
                }  
                else{
                   
                 pointsCounter();
                
                 
                 clearInterval(z); 
        }
    }
        function moveLeft(){
    
            if(coordinates.head.x<=580 && coordinates.head.x>=0 && coordinates.head.y>=0
                && coordinates.head.y<=580 && time>=0 ){
                    coordinates.tail.y=coordinates.body.y;
                    snakeTail.style.top=coordinates.tail.y+'px';
                    coordinates.body.y=coordinates.head.y;
                    snakeBody.style.top=coordinates.body.y+'px';
                    clearInterval(upTimer);
            
                    coordinates.tail.x=coordinates.body.x;
                    snakeTail.style.left=coordinates.tail.x+'px';
                    coordinates.body.x=coordinates.head.x;
                    snakeBody.style.left=coordinates.body.x+'px';
                    coordinates.head.x -=20;
                    snake.style.left=coordinates.head.x+'px';
    
                    eat();
                
                upTimer=setInterval( function(){
                    moveLeft();},150);
                }  
                else{
                   
                 pointsCounter();
                
                
                 clearInterval(z); 
        }
    }
        function moveRight(){
            
            
            if(coordinates.head.x<=580 && coordinates.head.x>=0 && coordinates.head.y>=0
                && coordinates.head.y<=580 && time>=0 ){
                    coordinates.tail.y=coordinates.body.y;
            snakeTail.style.top=coordinates.tail.y+'px';
            coordinates.body.y=coordinates.head.y;
            snakeBody.style.top=coordinates.body.y+'px';
            clearInterval(upTimer);
    
            coordinates.tail.x=coordinates.body.x;
            snakeTail.style.left=coordinates.tail.x+'px';
            coordinates.body.x=coordinates.head.x;
            snakeBody.style.left=coordinates.body.x+'px';
            coordinates.head.x +=20;
            snake.style.left=coordinates.head.x+'px';

            eat();
    
            upTimer=setInterval( function(){
                moveRight();},150);
       
        }
        else{
            
           
            pointsCounter();
            clearInterval(z); 
    }
} 

    /defines in which order the snake has to eat/
        function eat(){
            
            if(coordinates.head.x===coordinates.food1.x && 
        coordinates.head.y===coordinates.food1.y && foodCheck%4 ===1 ){
                food1.style.opacity='0';
                points++;
                point.innerHTML=`${points}`;
                time+=4;
                foodCheck++;
                console.log('hello');
            }
            else if(coordinates.head.x===coordinates.food2.x && 
        coordinates.head.y===coordinates.food2.y &&foodCheck%4 ===2){
                food2.style.opacity='0';
                points++;
                point.innerHTML=`${points}`;
                time+=4;
                foodCheck++;
            }
            else if(coordinates.head.x===coordinates.food3.x && 
            coordinates.head.y===coordinates.food3.y && foodCheck%4 ===3){
                food3.style.opacity='0';
                points++;
                point.innerHTML=`${points}`;
                time+=4;
                foodCheck++;
            }
            else if(coordinates.head.x===coordinates.food4.x && 
            coordinates.head.y===coordinates.food4.y && foodCheck%4 ===0){
                
                food4.style.opacity='0';
                points++;
                foodCheck++;
                time+=4;
                point.innerHTML=`${points}`;
                gameNO++;

                startgame();
            }        
    } 
    }