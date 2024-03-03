var userData = JSON.parse(localStorage.getItem('userData'))
if(!userData){
    userData = []
}

document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.querySelector(".login-form"); 
    var regForm = document.querySelector('.reg-form')
    const [ msg_login,msg_reg ] = document.getElementsByClassName('msg')
    const content_text = document.getElementById('content-txt')

    const reg_link = document.getElementById('reg-link')
    const login_link = document.getElementById('login-link')
    const login_box = document.getElementById('login-box')
    const reg_box = document.getElementById('reg-box')
    const content = document.getElementById('content')

    const swicthToLogin = () =>{
        msg_login.innerHTML = ""
        reg_box.style.display = 'none'
        login_box.style.display = 'block'
        content.style.display = 'none'
    }
    const switchToReg = () => {
        msg_reg.innerHTML = ""
        login_box.style.display = 'none'
        reg_box.style.display = 'block'
        content.style.display = 'none'
    }
    const switchToContent = () => {
        login_box.style.display = 'none'
        reg_box.style.display = 'none'
        content.style.display = 'block'
    }

    reg_link.addEventListener('click',switchToReg)
    login_link.addEventListener('click',swicthToLogin)

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();    
        const username = document.getElementById('login-username').value
        const password = document.getElementById('login-password').value
        const user = userData.find((item) => item.username === username)
        if(!user){
            msg_login.innerHTML = "User doesn't exists..."
            return;
        }
        if(user.password === password){
            content_text.innerHTML = "Hooray!! , you are now logged in..."
            switchToContent()
        } else {
            msg_login.innerHTML = "Invalid Password"
        }
    });

    const validatePassword = (value,confirm_value) => {
        if(value.length < 8){
            msg_reg.innerHTML = "The password should atleast contain 8 characters"
            return false
        } else if(value !== confirm_value){
            msg_reg.innerHTML = "The password value and confirm password value should match"
            return false
        } else {
            return true
        }
    }

    regForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById('reg-username').value
        const password = document.getElementById('reg-password').value
        const confirm_password = document.getElementById('confirm-password').value
        
        const oldUser = userData.find((item) => item.username == username)
        if(oldUser){
            msg_reg.innerHTML = "User Already exists, try logging in"
            return
        }
        if(!validatePassword(password,confirm_password)){
            return
        }
        userData.push({
            username : username,
            password : password
        })
        localStorage.setItem('userData',JSON.stringify(userData))  
        content_text.innerHTML = "Redirecting to login...."
        switchToContent()
        setTimeout(()=>{
            swicthToLogin()
        },1000)
    });
});
