const urlBase = 'http://proctest.group25ftw.xyz/API';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin()
{
    userId = 0;
    firstName = "";
    lastName = "";

    // PLACEHOLDERS are for both username and password
    // input fields from index.html
    let user = document.getElementById("username-login").value;
    let password = document.getElementById("password-login").value;

    // PLACEHOLDER is for element in index.html that will store
    // username and password, this line clears this information
    document.getElementById("loginResult").innterHTML = "";

    let temp = {login:user, password:password};
    let jsonPayload = JSON.stringify(temp);

    let url = urlBase + '/login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                if(userId < 1)
                {
                    document.getElementById('loginResult').innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.FirstName;
                lastName = jsonObject.LastName;

                saveCookie();

                window.location.href = "postlogin.html";
            }
        };
        xhr.send(jsonPayload);

    }
    catch(err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    }

}

function saveCookie()
{
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ",expires=" + date.toGMTString();
}

function readCookie()
{
    userId = -1;
    let data = document.cookie;
    let splits = data.split(",");
    for ( var i = 0; i < splits.length; i++)
    {
        let thsOne = splits[i].trim;
        let tokens = thisOne.splut("=");
        if(tokens[0] == "firstName")
        {
            firstName = tokens[1];
        }
        else if( tokens[0] == "lastName" )
        {
            lastName = tokens[1];
        }
        else if( tokens[0] == "userId" )
        {
            userId = parseInt( tokens[1].trim() );
        }
    }

    if (userId < 0)
    {
        window.location.href = "index.html";
    }

}

function doLogout()
{
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html"; 
}

function signUp()
{
    userId = 0;
    firstName = "";
    lastName = "";

    // PLACEHOLDERS are for both username and password
    // input fields from index.html
    let firstNameSignUp = document.getElementById("first-name").value;
    let lastNameSignUp = document.getElementById("last-name").value;
    let user = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // // PLACEHOLDER is for element in index.html that will store
    // // username and password, this line clears this information
    // document.getElementById("loginResult").innterHTML = "";

    let temp = {FirstName:firstNameSignUp, LastName:lastNameSignUp, login:user, password:password};
    let jsonPayload = JSON.stringify(temp);

    let url = urlBase + '/signup.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.id;

                if(userId < 1)
                {
                    document.getElementById('signupResult').innerHTML = "User Account Already Exists";
                    return;
                }

                firstName = jsonObject.FirstName;
                lastName = jsonObject.LastName;

                saveCookie();

                window.location.href = "postlogin.html";
            }
        };
        xhr.send(jsonPayload);

    }
    catch(err)
    {
        document.getElementById("signupResult").innerHTML = err.message;
    }


}

function createContact()
{
	let newFirstName = document.getElementById("firstName").value;
    let newLastName = document.getElementById("lastName").value;
    let newPhone = document.getElementById("phone").value;
    let newEmail = document.getElementById("email").value;

	document.getElementById("contactAddResult").innerHTML = "";

	let tmp = { FirstName:newFirstName, LastName:newLastName, Phone:newPhone, Email:newEmail, UserID:userId };
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/create.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
	
}

function retrieveContact()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	let contactList = "";

	let tmp = {search:srch,UserId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/retrieve.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
	
}

function deleteContact(firstName, lastName) 
{
    document.getElementById("contactDeleteResult").innerHTML = "";

    let tmp = { FirstName: firstName, LastName:lastName, UserID:userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "/delete." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try 
	{
        xhr.onreadystatechange = function () 
		{
            if (this.readyState == 4 && this.status == 200) 
			{
                document.getElementById("contactDeleteResult").innerHTML = "Contact has been deleted";
            }
        };
        xhr.send(jsonPayload);
    } 
	catch (err) 
	{
        document.getElementById("contactDeleteResult").innerHTML = err.message;
    }
}

function updateContact() 
{
    let newFirstName = document.getElementById("firstName").value;
    let newLastName = document.getElementById("lastName").value;
    let newPhone = document.getElementById("phone").value;
    let newEmail = document.getElementById("email").value;

    document.getElementById("contactUpdateResult").innerHTML = "";

    let tmp = { FirstName:newFirstName, LastName:newLastName, Phone:newPhone, Email:newEmail, UserID:userId };
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + "/update." + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try 
	{
        xhr.onreadystatechange = function () 
		{
            if (this.readyState == 4 && this.status == 200) 
			{
                document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated";
            }
        };
        xhr.send(jsonPayload);
    } 
	catch (err) 
	{
        document.getElementById("contactUpdateResult").innerHTML = err.message;
    }
}
