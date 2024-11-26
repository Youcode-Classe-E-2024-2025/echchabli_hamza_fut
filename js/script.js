import { playersData } from "../data/data.js";

let teamSquad=['442' , null ,null ,null ,null ,null ,null ,null ,null ,null ,null,null];

document.getElementById('formation').addEventListener('change', function () {
    const value = this.value; // Get the selected option's value
    teamSquad[0]=value;
    if (value) {
        changeLayout(parseInt(value));
    }
});

        function changeLayout(number) {
            
            const numStr = number.toString();
        
            
            const defenceCount = parseInt(numStr.charAt(0));
            const middleCount = parseInt(numStr.charAt(1)); 
            const attackCount = parseInt(numStr.charAt(2)); 
        
            
            const attackDivs = Array.from(document.getElementById('attack').children); 
            const middleDivs = Array.from(document.getElementById('middle').children); 
            const defenceDivs = Array.from(document.getElementById('defence').children);  
            console.log();
            
           
            const allDivs = [...defenceDivs, ...middleDivs, ...attackDivs];
        
            
            const newDefenceDivs = allDivs.slice(0, defenceCount); 
            const newMiddleDivs = allDivs.slice(defenceCount, defenceCount + middleCount); 
            const newAttackDivs = allDivs.slice(defenceCount + middleCount, defenceCount + middleCount + attackCount); 
        
          
            document.getElementById('defence').innerHTML = '';
            document.getElementById('middle').innerHTML = '';
            document.getElementById('attack').innerHTML = '';
        
           
            newDefenceDivs.forEach(div => document.getElementById('defence').appendChild(div));
            newMiddleDivs.forEach(div => document.getElementById('middle').appendChild(div));
            newAttackDivs.forEach(div => document.getElementById('attack').appendChild(div));
            console.log(teamSquad);
        }
       

        function playerCard( obj ) {

            let container = document.createElement('div');
            container.className='wrapper';

            container.innerHTML=`
            
            <div class="h-[10%]"></div>
            <div class="topContent w-full h-fit flex">
                <div class="w-1/4   flex flex-col flexGapStat  justify-center gap-1 content-center ">
                  <div class="flex justify-center h-fit  ratingText mbFlag">${obj.rating}</div>
                  <div class="flex justify-center h-fit textSIZE mbFlag">${obj.position}</div>
                  <div class="flex justify-center w-full"><img class="w-3/6" src="${obj.flag}" alt="${obj.nationality}" draggable="false"/></div>
                  <div class="flex justify-center w-full "><img class="w-3/6" src="${obj.logo}" alt="${obj.club}" draggable="false"/></div>
                </div>
                
                <div class="w-3/4 flex"><img class=" w-11/12  mt-[2.8%] " src="${obj.photo}" alt="${obj.name}" draggable="false"/>
                </div>
              </div>



              <div class="playerName w-full h-fit  flex justify-center items-center">${obj.name}</div>
              <hr class="m-auto w-4/5 border-none " id="firstHR">
              <div class="bottomContent w-3/4  m-auto flex justify-evenly">
                <div class="  ">
                    <div class="stat flex justify-center"><span>${obj.pace}</span>PAC</div>
                    <div class="stat flex justify-center"><span>${obj.shooting}</span>SHO</div>
                    <div class="stat flex justify-center"><span>${obj.passing}</span>PAS</div>
                </div>
                <hr class=  " mt-1 h-10  w-[1px] bg-[#3D341B] border-none" >
                <div class="  ">
                    <div class="stat flex justify-center"><span>${obj.dribbling}</span>DRI</div>
                    <div class="stat flex justify-center"><span>${obj.defending}</span>DEF</div>
                    <div class="stat flex justify-center"><span>${obj.physical}</span>PHY</div>
                </div>
              </div>
              
            
            
            `
            return container ;

            
        }

        function emptyCard() {
            let container = document.createElement('div');
            container.classList.add('cardWrapper', 'flex', 'justify-center', 'text-9xl', 'text-white', 'cursor-pointer');

            container.innerHTML=`+` ;

            return container ;

            
        }
  
let selectedCard = null; 
let cardNum =null;


document.querySelectorAll('.wrapper').forEach(card => {
    card.addEventListener('click', function () {

        selectedCard = this;
         cardNum = this.getAttribute('data-card-number');
        document.getElementById('rightPlayers').classList.remove('hidden'); 
    });
});


function rightSidePlayers() {
    let res = JSON.parse(localStorage.getItem('playersList')) || playersData;

    res.forEach(element => {
        let retunedDiv = playerCard(element);
        retunedDiv.classList.add('cursor-pointer');

          
        retunedDiv.addEventListener('click', function () {
            let NtextSize =10; 
            let mtext=0;
            if (element.name.length>=20) {
                console.log(element.name.length);
                mtext=4;
                NtextSize=8;
            } 
          
            teamSquad[cardNum]=element.name;

            if (selectedCard){
                selectedCard.innerHTML = `
                   <div class="h-[10%]"></div>
                    <div class="topContent w-full h-fit flex">
                        <div class="w-1/4 flex flex-col flexGapStat justify-center gap-1 content-center">
                            <div class="flex justify-center h-fit ratingText mbFlag">${element.rating}</div>
                            <div class="flex justify-center h-fit textSIZE mbFlag">${element.position}</div>
                            <div class="flex justify-center w-full"><img class="w-3/6" src="${element.flag}" alt="${element.nationality}" draggable="false"/></div>
                            <div class="flex justify-center w-full"><img class="w-3/6" src="${element.logo}" alt="${element.club}" draggable="false"/></div>
                        </div>
                        <div class="w-3/4 flex">
                            <img class="w-11/12 mt-[2.8%]" src="${element.photo}" alt="${element.name}" draggable="false"/>
                        </div>
                    </div>
                    <div class="playerName w-full h-fit nameSIZE flex justify-center items-center  text-[#FFD700]" style="font-size: ${NtextSize}px;  margin-top:${mtext}px ; margin-bottom: ${mtext}px;">${element.name}</div>
                    <hr class="m-auto w-4/5 border-none" id="firstHR">
                    <div class="bottomContent w-3/4 m-auto flex justify-evenly">
                        <div>
                            <div class="stat flex justify-center"><span>${element.pace}</span>PAC</div>
                            <div class="stat flex justify-center"><span>${element.shooting}</span>SHO</div>
                            <div class="stat flex justify-center"><span>${element.passing}</span>PAS</div>
                        </div>
                        <hr class="mt-1 h-10 w-[1px] bg-[#3D341B] border-none">
                        <div>
                            <div class="stat flex justify-center"><span>${element.dribbling}</span>DRI</div>
                            <div class="stat flex justify-center"><span>${element.defending}</span>DEF</div>
                            <div class="stat flex justify-center"><span>${element.physical}</span>PHY</div>
                        </div>
                    </div>
                `;
                console.log(teamSquad);

                document.getElementById('rightPlayers').classList.add('hidden');
                selectedCard = null; 
            }
        });

        document.getElementById('rightPlayers').appendChild(retunedDiv);
        
        
    });
}


rightSidePlayers();


document.getElementById('addBtn').addEventListener('click' , ()=>{
    document.getElementById('playerFormContainer').classList.remove('hidden');
})
    

