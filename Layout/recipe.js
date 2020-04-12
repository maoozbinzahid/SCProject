 export var calculateServing  = function (ing,qty)
{ 
    var qd = 0;
    var i;
    for( i=0; i < qty.length; i++)
    {
         var q=qty[i];
        
      
        if (q !="-") 
        { 
          q= parseFloat(q);
          q = q%10; 
          qd  = qd+ parseFloat(q)        
         
        }
    
    }
    console.log("sum of quantity" +qd);
    qd = (qd/i);
    console.log("sum of quantity" +qd);
    if (ing.length>8)
    {
        qd = (qd * ing.length) /2;
        console.log("sum of quantity" +qd);
    }
    else
    {
        qd = (qd * ing.length) + 1;
        console.log("sum of quantity" +qd);
    }
    
    return qd; 

}
