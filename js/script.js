document.getElementById('tacticPlan').addEventListener('change', function () {
    const value = this.value; // Get the selected option's value
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
       