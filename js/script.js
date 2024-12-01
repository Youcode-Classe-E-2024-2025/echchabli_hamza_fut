import { players } from "../data/data.js";

// localStorage.clear();

let playersData = JSON.parse(localStorage.getItem('playersLISTE')) || players ;

let teamSquad= JSON.parse(localStorage.getItem('current11')) || ['433' , null ,null ,null ,null ,null ,null ,null ,null ,null ,null,null];
console.log('fromStorage' , teamSquad);

let value;

//change the formation
document.getElementById('formation').addEventListener('change', function () {
     value = this.value;
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
          
        }
       

        // return full card 

        function playerCard( obj ) {

            let container = document.createElement('div');
            container.classList.add('wrapper');
            let NtextSize =9; 
            let mtext=0;
            // console.log('fix size');
            
            if (obj.name.length>=12 && obj.name.length<18) {

                // console.log('name' ,obj.name.length);
                mtext=2;
                NtextSize=8;

            }else if(obj.name.length>=18){

                // console.log('name' , obj.name.length);
                mtext=2;
                NtextSize=6;
            } 

           container.dataset.playerName = obj.name ;
           container.dataset.test = 'not' ;
            container.innerHTML=`
             <div class="cardContent">
                <div class="h-[10%]"></div>
                <div class="topContent w-full h-fit flex">
                    <div class="w-1/4 flex flex-col flexGapStat justify-center  content-center">
                        <div class="flex justify-center h-fit ratingText mbFlag">${obj.rating}</div>
                        <div class="flex justify-center h-fit textSIZE mbFlag">${obj.position}</div>
                        <div class="flex justify-center w-full"><img class="w-3/6" src="${obj.flag}" alt="Portugal" draggable="false"></div>
                        <div class="flex justify-center w-full"><img class="w-3/6" src="${obj.logo}" alt="Al Nassr" draggable="false"></div>
                    </div>
                     <div class="w-3/4 flex">
                    <img class="playerPhoto  m-auto" src="${obj.photo}" alt="Cristiano Ronaldo" draggable="false">
                </div>
                   
                </div>
                <div class="playerName w-full h-fit nameSIZE flex justify-center items-center text-[#FFD700]" >${obj.name}</div>
                <hr class="m-auto w-4/5 border-none" id="firstHR">
                <div class="bottomContent w-3/4 m-auto flex justify-evenly">
                    <div>
                    <div class="stat flex justify-center "><span class="statText ">${obj.pace}PAC</span></div>
                    <div class="stat flex justify-center "><span class="statText ">${obj.shooting}SHO</span></div>
                    <div class="stat flex justify-center "><span class="statText ">${obj.passing}PAS</span></div>
                </div>
                <hr class="mt-1 h-6 w-[1px] bg-[#3D341B] border-none">
                <div>
                    <div class="stat flex justify-center "><span class="statText ">${obj.dribbling}DRI</span></div>
                    <div class="stat flex justify-center "><span class="statText ">${obj.defending}DEF</span></div>
                    <div class="stat flex justify-center "><span class="statText ">${obj.physical}PHY</span></div>
                </div>
                </div>
            </div>
            
            `;
            return container ;

            
        }
        

       //set event to the formation  card to for adding  changing player  
  
let selectedCard = null; 
let cardNum =null;
let Pposition =null ; 

function setEvent() {
    document.querySelectorAll('.wrapper').forEach(card => {
    card.addEventListener('click', function () {

        selectedCard = this;
        cardNum = this.getAttribute('data-card-number');
        Pposition = this.getAttribute('role');
        
        rightSidePlayers();
        
        document.getElementById('rightPlayers').classList.remove('hidden'); 
    });
});
}


//display the players card in a popUp rightPlayersDisplay

function rightSidePlayers() {
    let liste = playersData;
    document.getElementById('rightPlayersDisplay').innerHTML='';
    console.log(Pposition);
    
    let filteredRes=liste.filter(item => item.position == Pposition);
    let res = filteredRes.filter(obj => !teamSquad.includes(obj.name)); 
    
    res.forEach(element => {
        let retunedDiv = playerCard(element);
        retunedDiv.classList.add('cursor-pointer');
        retunedDiv.style.height="fit-content";
        

          
        retunedDiv.addEventListener('click', function () {
           
           
          
            teamSquad[cardNum]=element.name;
            localStorage.setItem('current11', JSON.stringify(teamSquad));

            console.log(JSON.parse(localStorage.getItem('current11')));
               let x=selectedCard.parentNode;
               let newCard= playerCard(element) ;
               newCard.role=Pposition;
               newCard.setAttribute('data-card-number', cardNum);
               
               x.replaceChild(newCard,selectedCard);

           
               setEvent();
            document.getElementById('rightPlayers').classList.add('hidden');

            displayPlayersInFooter(playersData);
        });

        document.getElementById('rightPlayersDisplay').appendChild(retunedDiv);
        
        
    });

    
    
  

}



document.getElementById('closePlayerEdit').addEventListener('click', function () {
   
    document.getElementById('rightPlayers').classList.add('hidden');
});


// to remove player from the formation

document.getElementById('removePlayer').addEventListener('click' , ()=>{


    let cardContent = document.querySelector('[data-card-number="'+cardNum+'"]');
    
    // removeing the player from the teamSquad

    teamSquad = teamSquad.map(item => {
        const playerName = selectedCard.getAttribute('data-player-name'); 
        
    
        if (item === playerName) { 
            return null;
        }
        return item; 
    });

        localStorage.setItem('current11', JSON.stringify(teamSquad));
        

         
    
    
    cardContent.innerHTML=`
     <div class="cardContent flex justify-center items-center text-xl text-white cursor-pointer">+`+Pposition+`</div>
    `;
    
    document.getElementById('rightPlayers').classList.add('hidden');
    
    displayPlayersInFooter(playersData);
    rightSidePlayers();

}

)




document.getElementById('addBtn').addEventListener('click' , ()=>{
    document.getElementById('playerFormContainer').classList.remove('hidden');
})

document.getElementById('addFormClose').addEventListener('click' , (event)=>{
    event.preventDefault();
    document.getElementById('playerFormContainer').classList.add('hidden');
})


// get the data from the form and checking it 

document.getElementById('playerForm').addEventListener('submit', function (event) {
    
    event.preventDefault();

    const playerData = {
        name: this.elements[0].value.trim(),
        photo: this.elements[1].value.trim(),
        position: this.elements[2].value.trim(),
        nationality: this.elements[3].value.trim(),
        flag: this.elements[4].value.trim(),
        club: this.elements[5].value.trim(),
        logo: this.elements[6].value.trim(),
        rating: parseInt(this.elements[7].value),
        pace: parseInt(this.elements[8].value),
        shooting: parseInt(this.elements[9].value),
        passing: parseInt(this.elements[10].value),
        dribbling: parseInt(this.elements[11].value),
        defending: parseInt(this.elements[12].value),
        physical: parseInt(this.elements[13].value),
    };

    function isUrl(url) {
        return url.startsWith('http://') || url.startsWith('https://');
    }

    function isInRange(value, min, max) {
        return value >= min && value <= max;
    }

    // Validate empty fields
    if (!playerData.name) {
        alert("Name cannot be empty.");
        return;
    }

    if (!playerData.nationality) {
        alert("Nationality cannot be empty.");
        return;
    }

    if (!playerData.club) {
        alert("Club cannot be empty.");
        return;
    }

    // Validate URLs
    if (!isUrl(playerData.photo)) {
        alert("Photo URL must be valid and start with 'http://' or 'https://'");
        return;
    }

    if (!isUrl(playerData.flag)) {
        alert("Flag URL must be valid and start with 'http://' or 'https://'");
        return;
    }

    if (!isUrl(playerData.logo)) {
        alert("Club Logo URL must be valid and start with 'http://' or 'https://'");
        return;
    }

    // Validate numeric fields
    const stats = [
        { name: "Rating", value: playerData.rating },
        { name: "Pace", value: playerData.pace },
        { name: "Shooting", value: playerData.shooting },
        { name: "Passing", value: playerData.passing },
        { name: "Dribbling", value: playerData.dribbling },
        { name: "Defending", value: playerData.defending },
        { name: "Physical", value: playerData.physical },
    ];

    for (const stat of stats) {
        if (!isInRange(stat.value, 1, 100)) {
            alert(`${stat.name} must be a number between 1 and 100.`);
            return;
        }
    }

    
    playersData.push(playerData);
    

    localStorage.setItem('playersLISTE', JSON.stringify(playersData));

    
    document.getElementById('playerFormContainer').classList.add('hidden');

    rightSidePlayers();
    displayPlayersInFooter(playersData);
});


// to fill the delete popUp

function fillDeleteContainer() { 

    let con = document.getElementById('deleteContainer');
    con.innerHTML='';
    playersData.forEach(element => {

        let retunedDiv = playerCard(element);
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

   
   playersData=playersData.filter(item => item.name!==res);
   localStorage.setItem('playersLISTE', JSON.stringify(playersData));


   
   fillDeleteContainer();
   displayPlayersInFooter(playersData);
   document.getElementById('deletePlayers').classList.add('hidden');
})


// fill the update the popUP 

let target=null ;

document.getElementById('allBtn').addEventListener('click' , ()=>{
    document.getElementById('sidePlayers').classList.remove('hidden');
    document.getElementById('sidePlayersContainer').innerHTML='';
    playersData.forEach(element => {

        let retunedDiv = playerCard(element);
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


 // fill the update form with the existing data before editing     

function fillForm(name) {
   
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

// checking the data and changing it in the database

document.getElementById('updatePlayerForm').addEventListener('submit', function (event) {
    
    event.preventDefault();

    function isUrl(url) {
        return url.startsWith('http://') || url.startsWith('https://');
    }

    function isInRange(value, min, max) {
        return value >= min && value <= max;
    }

    const playerData = {
        position: this.elements[0].value.trim(),
        nationality: this.elements[1].value.trim(),
        flag: this.elements[2].value.trim(),
        club: this.elements[3].value.trim(),
        logo: this.elements[4].value.trim(),
        rating: parseInt(this.elements[5].value),
        pace: parseInt(this.elements[6].value),  
        shooting: parseInt(this.elements[7].value),
        passing: parseInt(this.elements[8].value),
        dribbling: parseInt(this.elements[9].value),
        defending: parseInt(this.elements[10].value),
        physical: parseInt(this.elements[11].value),
    };

   
    if (!playerData.nationality) {
        alert("Nationality cannot be empty.");
        return;
    }

    if (!playerData.club) {
        alert("Club cannot be empty.");
        return;
    }

    if (!isUrl(playerData.flag)) {
        alert("Flag URL must be valid and start with 'http://' or 'https://'");
        return;
    }

    if (!isUrl(playerData.logo)) {
        alert("Club Logo URL must be valid and start with 'http://' or 'https://'");
        return;
    }

    if (!isInRange(playerData.rating, 1, 100)) {
        alert("Rating must be a number between 1 and 100.");
        return;
    }

    if (!isInRange(playerData.pace, 1, 100)) {
        alert("Pace must be a number between 1 and 100.");
        return;
    }

    if (!isInRange(playerData.shooting, 1, 100)) {
        alert("Shooting must be a number between 1 and 100.");
        return;
    }

    if (!isInRange(playerData.passing, 1, 100)) {
        alert("Passing must be a number between 1 and 100.");
        return;
    }

    if (!isInRange(playerData.dribbling, 1, 100)) {
        alert("Dribbling must be a number between 1 and 100.");
        return;
    }

    if (!isInRange(playerData.defending, 1, 100)) {
        alert("Defending must be a number between 1 and 100.");
        return;
    }

    if (!isInRange(playerData.physical, 1, 100)) {
        alert("Physical must be a number between 1 and 100.");
        return;
    }

    playersData = playersData.map(element => {
        if (element.name === target) {
            playerData.name = element.name;
            playerData.photo = element.photo;
            return playerData;
        }
        return element;
    });

    localStorage.setItem('playersLISTE', JSON.stringify(playersData));
    console.log('Updated Local Storage:', JSON.parse(localStorage.getItem('playersLISTE')));

    fillDeleteContainer();
   displayPlayersInFooter(playersData);
    document.getElementById('updatePlayerContainer').classList.add('hidden');
});





document.getElementById('updateFormClose').addEventListener('click', function (event) {
   event.preventDefault();
   
    document.getElementById('updatePlayerContainer').classList.add('hidden');
});


//in relaod we take the liste teamsqaud form localstorage and used to display the formation back

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
                // selectedCard.classList.add('basis-[10%]');
                selectedCard.dataset.playerName = element.name;
              
              
                selectedCard.innerHTML =playerCard(element).innerHTML;
            }
        }
    });
    displayPlayersInFooter(playersData);
    
}

//  bench players card

function footerPlayerCard(obj) {
    let container = document.createElement('div');
    container.classList.add('footerWrapper');
   

    container.dataset.playerName = obj.name;
   
    container.innerHTML = `
        <div class="cardContent">
            <div class="h-[10%]"></div>
            <div class="topContent w-full h-fit flex">
                <div class="w-1/4 flex flex-col flexGapStat justify-center content-center">
                    <div class="flex justify-center h-fit ratingText mbFlag">${obj.rating}</div>
                    <div class="flex justify-center h-fit textSIZE mbFlag">${obj.position}</div>
                    <div class="flex justify-center w-full"><img class="w-3/6" src="${obj.flag}" alt="Portugal" draggable="false"></div>
                    <div class="flex justify-center w-full"><img class="w-3/6" src="${obj.logo}" alt="Al Nassr" draggable="false"></div>
                </div>
                <div class="w-3/4 flex">
                    <img class="playerPhoto m-auto" src="${obj.photo}" alt="Cristiano Ronaldo" draggable="false">
                </div>
            </div>
            <div class="footerPlayerName w-full h-fit nameSIZE flex justify-center items-center text-[#FFD700]">${obj.name}</div>
            <hr class="m-auto w-4/5 border-none" id="firstHR">
            <div class="bottomContent w-3/4 m-auto flex justify-evenly">
                <div>
                    <div class="stat flex justify-center"><span class="footerTextStat">${obj.pace}PAC</span></div>
                    <div class="stat flex justify-center"><span class="footerTextStat">${obj.shooting}SHO</span></div>
                    <div class="stat flex justify-center"><span class="footerTextStat">${obj.passing}PAS</span></div>
                </div>
                <hr class="mt-1 h-6 w-[1px] bg-[#3D341B] border-none">
                <div>
                    <div class="stat flex justify-center"><span class="footerTextStat">${obj.dribbling}DRI</span></div>
                    <div class="stat flex justify-center"><span class="footerTextStat">${obj.defending}DEF</span></div>
                    <div class="stat flex justify-center"><span class="footerTextStat">${obj.physical}PHY</span></div>
                </div>
            </div>
        </div>
    `;

  

    return container;
}


// fill the footer with bench players

let footer=document.getElementById('footerDiv');

function displayPlayersInFooter(players) {
    footer.innerHTML='';
    players.forEach(player => {
      
        if (teamSquad.includes(player.name)) {
           
            return;
        }
        

       
        let card = footerPlayerCard(player);
        
        // card.style.width = '120px';
        footer.appendChild(card);
    });
}


// set event , realod formation , display footer players on each reload

window.onload = () => {
    document.getElementById('formation').value=teamSquad[0];
    setEvent();
    reloadForm();
    changeLayout(teamSquad[0]);
    displayPlayersInFooter(playersData);
    
}