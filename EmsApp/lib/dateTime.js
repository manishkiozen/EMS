module.exports = {
    
    getDate: function(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        
        return dd+'-'+mm+'-'+yyyy;
    },

    getTime: function(){
         var d = new Date(),
          h = (d.getHours()<10?'0':'') + d.getHours(),
          m = (d.getMinutes()<10?'0':'') + d.getMinutes(),
          s = (d.getSeconds()<10?'0':'') + d.getSeconds();
        
        return h+':'+m+':'+s;
    }

}
