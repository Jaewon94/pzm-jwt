function login(){
    let formData = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value
    };
    fetch("/login", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(formData)
    })
        .then(responce => {
            if (!responce.ok){
                throw new Error("Login failed")
            }
            // JWT 토큰을 받기
            let jwtToken = responce.headers.get("Authorization");
            if (jwtToken && jwtToken.startsWith("Bearer ")) {
                jwtToken = jwtToken.slice(7);
                localStorage.setItem("token", jwtToken);
                console.log("Received JWT token : " +jwtToken);
                let authorities = jwtParsing(jwtToken);
                console.log("authorities :" + authorities); // [ , ]
                authorities.forEach(role => {
                    switch (role) {
                        case "ROLE_USER":
                            document.getElementById("userMenu").style.display="block";
                            break;
                        case "ROLE_MANAGER":
                            document.getElementById("managerMenu").style.display="block";
                            break;
                        case "ROLE_ADMIN":
                            document.getElementById("adminMenu").style.display="block";
                            break;
                        default:
                            break;
                    }
                }); // forEach()
                // Hide(none) login form | DisplayName block
                document.getElementById("loginForm").style.display="none";
                document.getElementById("greeting").style.display="block";
                document.getElementById("usernameDisplay").innerText=formData.username;
            } else {
                console.log("invalid JWT token received");
            }

        })
        .catch(error => {
            console.log("Login Faild : " +error)
        })
}

function jwtParsing(token){ // [0].[1].[2]

    try {
        let tokenPayload = token.split(".")[1];
        let decodedPayload = atob(tokenPayload);
        let payloadJson = JSON.parse(decodedPayload);

        let authorities = payloadJson.authorities;
        return authorities;
    } catch (error) {
        console.log("error");
        return [];
    }
}

function logout(){
    localStorage.removeItem("token");
    location.href="/";
}