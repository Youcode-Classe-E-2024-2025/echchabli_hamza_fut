import { players } from "../data/data.js";

localStorage.clear();

let playersData = JSON.parse(localStorage.getItem('playersLISTE')) || players ;

let teamSquad= JSON.parse(localStorage.getItem('current11')) || ['433' , null ,null ,null ,null ,null ,null ,null ,null ,null ,null,null];
console.log('fromStorage' , teamSquad);

let value;
document.getElementById('formation').addEventListener('change', function () {
     value = this.value; // Get the selected option's value
    teamSquad[0]=value;
    localStorage.setItem('current11', JSON.stringify(teamSquad));
    console.log(JSON.parse(localStorage.getItem('current11')));
    

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
            // console.log(teamSquad);
        }
       

        function playerCard( obj ) {

            let container = document.createElement('div');
            container.className='wrapper';
            let NtextSize =8; 
            let mtext=0;
            if (obj.name.length>=20) {

                console.log(obj.name.length);
                mtext=4;
                NtextSize=6;

            } 

           

            container.innerHTML=`
            <div class="cardContent">
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



              <div class="playerName w-full h-fit  flex justify-center items-center text-[#FFD700]" style="font-size: ${NtextSize}px;  margin-top:${mtext}px ; margin-bottom: ${mtext}px;">${obj.name}</div>
              <hr class="m-auto w-4/5 border-none " id="firstHR">
              <div class="bottomContent w-3/4  m-auto flex justify-evenly">
                <div class="  ">
                    <div class="stat flex justify-center "><span>${obj.pace}</span>PAC</div>
                    <div class="stat flex justify-center "><span>${obj.shooting}</span>SHO</div>
                    <div class="stat flex justify-center "><span>${obj.passing}</span>PAS</div>
                </div>
                <hr class=  " mt-1 h-10  w-[1px] bg-[#3D341B] border-none" >
                <div class="  ">
                    <div class="stat flex justify-center "><span>${obj.dribbling}</span>DRI</div>
                    <div class="stat flex justify-center "><span>${obj.defending}</span>DEF</div>
                    <div class="stat flex justify-center "><span>${obj.physical}</span>PHY</div>
                </div>
              </div>
              </div>
            
            
            `
            return container ;

            
        }
        function smallPlayerCard( obj ) {

            let container = document.createElement('div');
            container.className='wrapper';
            let NtextSize =8; 
            let mtext=0;
            let samllText=7;
            if (obj.name.length>=20) {

                console.log(obj.name.length);
                mtext=4;
                NtextSize=6;

            } 

           

            container.innerHTML=`
            <div class="cardContent">
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



              <div class="playerName w-full h-fit  flex justify-center items-center text-[#FFD700]" style="font-size: ${NtextSize}px;  margin-top:${mtext}px ; margin-bottom: ${mtext}px;">${obj.name}</div>
              <hr class="m-auto w-4/5 border-none " id="firstHR">
              <div class="bottomContent w-3/4  m-auto flex justify-evenly">
                <div class="  ">
                    <div class="stat flex justify-center"><span style="font-size: ${samllText}px;" >${obj.pace}PAC</span></div>
                    <div class="stat flex justify-center"><span style="font-size: ${samllText}px;" >${obj.shooting}SHO</span></div>
                    <div class="stat flex justify-center"><span style="font-size: ${samllText}px;" >${obj.passing}PAS</span></div>
                </div>
                <hr class=  " mt-1 h-10  w-[1px] bg-[#3D341B] border-none" >
                <div class="  ">
                    <div class="stat flex justify-center"><span style="font-size: ${samllText}px;" >${obj.dribbling}DRI</span></div>
                    <div class="stat flex justify-center"><span style="font-size: ${samllText}px;" >${obj.defending}DEF</span></div>
                    <div class="stat flex justify-center"><span style="font-size: ${samllText}px;" >${obj.physical}PHY</span></div>
                </div>
              </div>
              </div>
            
            
            `
            return container ;

            
        }

        // function emptyCard() {
        //     let container = document.createElement('div');
        //     container.classList.add('Wrapper', 'flex', 'justify-center', 'text-4xl', 'text-white', 'cursor-pointer');

        //     container.innerHTML=`+` ;

        //     return container ;

            
        // }
  
let selectedCard = null; 
let cardNum =null;
let Pposition =null ; 


document.querySelectorAll('.wrapper').forEach(card => {
    card.addEventListener('click', function () {

        selectedCard = this;
        cardNum = this.getAttribute('data-card-number');
        Pposition = this.getAttribute('role');
        
        rightSidePlayers();
        
        document.getElementById('rightPlayers').classList.remove('hidden'); 
    });
});


function rightSidePlayers() {
    let liste = playersData;
    document.getElementById('rightPlayersDisplay').innerHTML='';
   
    let filteredRes=liste.filter(item => item.position == Pposition);
    let res = filteredRes.filter(obj => !teamSquad.includes(obj.name));  // console.log(res);
    
    res.forEach(element => {
        let retunedDiv = playerCard(element);
        retunedDiv.classList.add('cursor-pointer' ,'basis-[15%]');

          
        retunedDiv.addEventListener('click', function () {
            let NtextSize =10; 
            let mtext=0;
            if (element.name.length>=20) {

                console.log(element.name.length);
                mtext=4;
                NtextSize=6;

            } 
          
            teamSquad[cardNum]=element.name;
            localStorage.setItem('current11', JSON.stringify(teamSquad));
            console.log(JSON.parse(localStorage.getItem('current11')));
    

            if (selectedCard){
                selectedCard.classList.remove('flex');
                selectedCard.classList.remove('basis-[15%]');
                selectedCard.classList.add('basis-[10%]');
                selectedCard.dataset.playerName = element.name ;

                selectedCard.innerHTML = `
                <div class="cardContent">
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
                         <div class="bottomContent w-3/4 m-auto flex justify-evenly">
                            <div>
                            <div class="stat flex justify-center "><span class=" text-xsmall">${element.pace}PAC</span></div>
                            <div class="stat flex justify-center text-xsmall"><span class=" text-xsmall">${element.shooting}SHO</span></div>
                            <div class="stat flex justify-center text-xsmall"><span class=" text-xsmall">${element.passing}PAS</span></div>
                        </div>
                        <hr class="mt-1 h-6 w-[1px] bg-[#3D341B] border-none">
                        <div>
                            <div class="stat flex justify-center text-xsmall"><span class=" text-xsmall" >${element.dribbling}DRI</span></div>
                            <div class="stat flex justify-center text-xsmall"><span class=" text-xsmall">${element.defending}DEF</span></div>
                            <div class="stat flex justify-center text-xsmall"><span class=" text-xsmall">${element.physical}PHY</span></div>
                        </div>
                    </div>
                    </div>
                `;
                // console.log(teamSquad);

                document.getElementById('rightPlayers').classList.add('hidden');
                selectedCard = null; 
            }
            displayPlayersInFooter(playersData);
        });

        document.getElementById('rightPlayersDisplay').appendChild(retunedDiv);
        
        
    });

    console.log('switch');
    
    

}


document.getElementById('closePlayerEdit').addEventListener('click', function () {
   
    document.getElementById('rightPlayers').classList.add('hidden');
});



document.getElementById('removePlayer').addEventListener('click' , ()=>{


    let cardContent = document.querySelector('[data-card-number="'+cardNum+'"]');
    

    teamSquad = teamSquad.map(item => {
        const playerName = selectedCard.getAttribute('data-player-name'); // Get the data-player-name attribute
        console.log(item, 'test', playerName);
    
        if (item === playerName) { // Compare item.name with the attribute value
            return null; // Replace the matching item with null
        }
        return item; // Keep the item if it doesn't match
    });
        localStorage.setItem('current11', JSON.stringify(teamSquad));
        // console.log(JSON.parse(localStorage.getItem('current11')));

         
    
    
    cardContent.innerHTML=`
     <div class="cardContent flex justify-center items-center text-xl text-white cursor-pointer">+`+Pposition+`</div>
    `;
    console.log(cardContent);
    document.getElementById('rightPlayers').classList.add('hidden');
    
    displayPlayersInFooter(playersData);

}
 
)




document.getElementById('addBtn').addEventListener('click' , ()=>{
    document.getElementById('playerFormContainer').classList.remove('hidden');
})

document.getElementById('addFormClose').addEventListener('click' , ()=>{
    document.getElementById('playerFormContainer').classList.add('hidden');
})

// Add an event listener to handle form submission
document.getElementById('playerForm').addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve form values
    const playerData = {
        name: this.elements[0].value,
        photo: this.elements[1].value,
        position: this.elements[2].value,
        nationality: this.elements[3].value,
        flag: this.elements[4].value,
        club: this.elements[5].value,
        logo: this.elements[6].value,
        rating: parseInt(this.elements[7].value),
        pace: parseInt(this.elements[8].value),
        shooting: parseInt(this.elements[9].value),
        passing: parseInt(this.elements[10].value),
        dribbling: parseInt(this.elements[11].value),
        defending: parseInt(this.elements[12].value),
        physical: parseInt(this.elements[13].value),
    };
    
    playersData.push(playerData);
    
    console.log('test' , playersData);
    
    
    localStorage.setItem('playersLISTE', JSON.stringify(playersData));
    // console.log(JSON.parse(localStorage.getItem('playersLISTE')));
    


    


    // Optional: Hide the form after submission
    document.getElementById('playerFormContainer').classList.add('hidden');
    rightSidePlayers();
    displayPlayersInFooter(playersData);
});

function fillDeleteContainer() { 

    let con = document.getElementById('deleteContainer');
    con.innerHTML='';
    playersData.forEach(element => {

        let retunedDiv = smallPlayerCard(element);
        retunedDiv.classList.add('cursor-pointer');

        retunedDiv.addEventListener('click' , function () {
   
            document.getElementById('deletePlayerName').innerHTML=element.name; 
            
        })

        con.appendChild(retunedDiv);
        

    });
}
    

document.getElementById('deleteBtn').addEventListener('click' , ()=>{
    fillDeleteContainer();
    document.getElementById('deletePlayers').classList.remove('hidden');
})

document.getElementById('confirmDelete').addEventListener('click' , ()=>{
   let res = document.getElementById('deletePlayerName').textContent;
//    console.log(res);
   
   playersData=playersData.filter(item => item.name!==res);
   localStorage.setItem('playersLISTE', JSON.stringify(playersData));

//    console.log(JSON.parse(localStorage.getItem('playersLISTE')));
   
   fillDeleteContainer();
   displayPlayersInFooter(playersData);
   document.getElementById('deletePlayers').classList.add('hidden');
})


// document.getElementById('updateBtn').addEventListener('click' , ()=>{
//      document.getElementById('updatePlayerContainer').classList.remove('hidden');
// })
   

document.getElementById('updateFormClose').addEventListener('click' , ()=>{
    document.getElementById('updatePlayerContainer').classList.add('hidden');

})

let target=null ;

document.getElementById('allBtn').addEventListener('click' , ()=>{
    document.getElementById('sidePlayers').classList.remove('hidden');
    document.getElementById('sidePlayersContainer').innerHTML='';
    playersData.forEach(element => {

        let retunedDiv = smallPlayerCard(element);
        retunedDiv.onclick=function() {
            document.getElementById('updatePlayerContainer').classList.remove('hidden');
            target= element.name; 
            document.getElementById('updatedPlayerName').textContent=element.name;
            

 

            document.getElementById('sidePlayers').classList.add('hidden');
            fillForm(target);
            
        };
        document.getElementById('sidePlayersContainer').appendChild(retunedDiv);
        
    });
})

function fillForm(name) {
    // Find the player object by name
    let obj = playersData.find(item => item.name === name);
    console.log('fill' , obj);
    

    if (obj) {
      
       
        document.getElementById('playerPosition').value = obj.position || '';
        document.getElementById('playerNationality').value = obj.nationality || '';
        document.getElementById('playerFlagUrl').value = obj.flag || '';
        document.getElementById('playerClub').value = obj.club || '';
        document.getElementById('playerClubLogo').value = obj.logo || '';
        document.getElementById('playerRating').value = obj.rating || '';
        document.getElementById('playerPace').value = obj.pace || '';
        document.getElementById('playerShooting').value = obj.shooting || '';
        document.getElementById('playerPassing').value = obj.passing || '';
        document.getElementById('playerDribbling').value = obj.dribbling || '';
        document.getElementById('playerDefending').value = obj.defending || '';
        document.getElementById('playerPhysical').value = obj.physical || '';

        console.log('Form filled with data:', obj);
    }else{
        console.error('Player not found:', name);
    }
}


document.getElementById('updatePlayerForm').addEventListener('submit', function (event) {
 
    // Prevent the default form submission behavior
    event.preventDefault();
     
    // Retrieve form values
    const playerData = {
        position: this.elements[0].value,   
        nationality: this.elements[1].value, 
        flag: this.elements[2].value,       
        club: this.elements[3].value,     
        logo: this.elements[4].value,        
        rating: parseInt(this.elements[5].value),       
        shooting: parseInt(this.elements[7].value),  
        passing: parseInt(this.elements[8].value),  
        dribbling: parseInt(this.elements[9].value),
        defending: parseInt(this.elements[10].value),
        physical: parseInt(this.elements[11].value), 
    };
   
    playersData = playersData.map(element => {
        if (element.name === target) {
            playerData.name = element.name;
            playerData.photo = element.photo;
            return playerData;
        }
        return element
    });
    localStorage.setItem('playersLISTE', JSON.stringify(playersData));
    console.log('testLocalStorge' , JSON.parse(localStorage.getItem('playersLISTE')));

    
    document.getElementById('updatePlayerContainer').classList.add('hidden');
   
});

document.getElementById('updateFormClose').addEventListener('click', function () {
   
    document.getElementById('updatePlayerContainer').classList.add('hidden');
});


function reloadForm() {
    
     teamSquad;
    teamSquad.forEach((playerName, index) => {
        // Find the card by its data-card-number attribute
        let selectedCard = document.querySelector(`[data-card-number="${index + 0}"]`);
        console.log(playerName , index);
        
        if (!selectedCard) return; // Skip if no card exists for this number
    
        if (playerName === null) {
            // Clear the card for empty slots
            selectedCard.innerHTML = `<div class="cardContent flex justify-center items-center text-xl text-white cursor-pointer">+${selectedCard.getAttribute('role')}</div>`;
            selectedCard.removeAttribute('data-player-name');
        } else {
            // Find the player object in playersData
            let element = playersData.find(player => player.name === playerName);
            console.log(element);
            
            if (element) {
                // Update the card with player data
                selectedCard.classList.remove('flex');
                selectedCard.classList.remove('basis-[15%]');
                selectedCard.classList.add('basis-[10%]');
                selectedCard.dataset.playerName = element.name;
              console.log(selectedCard);
              let NtextSize =8; 
              let mtext=0;
              if (obj.name.length>=20) {
  
                  console.log(obj.name.length);
                  mtext=4;
                  NtextSize=6;
  
              } 
              
                selectedCard.innerHTML = `
                    <div class="cardContent">
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
                            //here
                        </div>
                        <div class="playerName w-full h-fit nameSIZE flex justify-center items-center text-[#FFD700]" style="font-size: ${NtextSize}px; margin-top: 0px; margin-bottom: 0px;">${element.name}</div>
                        <hr class="m-auto w-4/5 border-none" id="firstHR">
                        <div class="bottomContent w-3/4 m-auto flex justify-evenly">
                            <div>
                            <div class="stat flex justify-center "><span class=" text-xsmall">${element.pace}PAC</span></div>
                            <div class="stat flex justify-center text-xsmall"><span class=" text-xsmall">${element.shooting}SHO</span></div>
                            <div class="stat flex justify-center text-xsmall"><span class=" text-xsmall">${element.passing}PAS</span></div>
                        </div>
                        <hr class="mt-1 h-6 w-[1px] bg-[#3D341B] border-none">
                        <div>
                            <div class="stat flex justify-center text-xsmall"><span class=" text-xsmall" >${element.dribbling}DRI</span></div>
                            <div class="stat flex justify-center text-xsmall"><span class=" text-xsmall">${element.defending}DEF</span></div>
                            <div class="stat flex justify-center text-xsmall"><span class=" text-xsmall">${element.physical}PHY</span></div>
                        </div>
                        </div>
                    </div>`;
            }
        }
    });
    displayPlayersInFooter(playersData);
    
}




let footer=document.getElementById('footerDiv');

function displayPlayersInFooter(players) {
    footer.innerHTML='';
    players.forEach(player => {
        // Skip if the player's name exists in the teamSquad array
        if (teamSquad.includes(player.name)) {
            console.log(`Skipping player: ${player.name}`);
            return;
        }
        // Create a player card and append it to the footer
        let card = playerCard(player);
        footer.appendChild(card);
    });
}
// displayPlayersInFooter(playersData);
window.onload = () => {
    
    reloadForm();
    changeLayout(teamSquad[0]);
    displayPlayersInFooter(playersData);
    
}