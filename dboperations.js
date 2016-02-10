/**
 * Created by praba on 2/10/2016.
 */

//Method called from login-card ,to validate the user and returns role name to the login-card
exports.logincheck=function(connection,username,password,callback){

  var returnval;
  var rolename;
  var username={"Emp_ID":username};
  var password={"Password":password};
  //Fetching JOB_DESC of tthe logged user
  connection.query('SELECT * from OD_HR_Employee_Job_Desc where ? and ? ',[username,password], function(err, rows) {
    if(!err){
      if(rows.length>0){
          var depid={'Department_ID':rows[0].Department_ID};
        var roleid=rows[0].Role_ID;
  //Fetching Department of the logged user and identifying the role
        connection.query('SELECT * from MD_HR_Department where ? ',[depid], function(err, rows) {
          if(!err){
            if(rows.length>0)
            {
              var depname=rows[0].Department_Name;
              var Role_Name=depname+" "+roleid;
              var cond={"Role_Name":Role_Name};
              connection.query('SELECT * from MD_HR_Role where ? ',[cond], function(err, rows) {
                if(!err){
                  if(rows.length>0){
                    rolename=rows[0].Role_Name;
                    //Return logged user's rolename to the login card if it is a valid user
                    return callback(rolename);
                  }
                }
                else
                  console.log('error'+err);
              });
            }
          }
          else
            console.log("error...."+err);
        });
      }
      else{
        //If the logged user is not exist it returns invalid flag to the login card
        return callback("invalid");
        }
    }
    else
    {
    }
  });

}
