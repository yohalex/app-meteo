const saisi = document.querySelector(".saisi");
const btnValider = document.querySelector(".btn-valider");
const citys = document.querySelectorAll('.city') ; 
const countrys = document.querySelectorAll('.country')
const temp = document.querySelector('.degre')
const condition = document.querySelector('.condition')
const verification = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;


// par defaut 
async function getMeteoByIp(){
    const getIpUser = await fetch('https://api.ipify.org?format=json')
                            .then(resp=>resp.json())
                            .then(resp=> resp.ip)
                            .catch((error)=>{
                                console.log('Erreur de réseaux)
                            })

    const getLocalisation = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=7a9508a8a4324494ba822367fbc41cb1&ip_address=${getIpUser}`)
                                  .then(resp => resp.json())
                                  .then(resp=> resp.city)

    const getMeteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getLocalisation}&appid=736237848bcf7bcc5d40d913471ccf2a`)
                           .then(resp=>resp.json())
                           .then(resp=> infosMeteo(resp) )

                          
                        
}

getMeteoByIp()

// au click du bouton valider 
btnValider.addEventListener('click',getMeteoBySearchVille)
async function getMeteoBySearchVille(e){
    e.preventDefault()
    const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${saisi.value}&appid=736237848bcf7bcc5d40d913471ccf2a`)
                        .then(res=>(res.ok)?res.json() : alert(`La ville n'a pas été trouvé `))
                        .then(resp=> resp)
                        .catch((error)=>{
                            alert("Veuillez vérifier votre connexion réseau \n Erreur "+ error.message)
                        })
       infosMeteo(meteo)

       saisi.value =""
       saisi.setAttribute('placeholder',meteo.name)
}

function infosMeteo(data){
    citys.forEach(city=> city.innerText = data.name )
    countrys.forEach(country=> country.innerText = data.sys.country )
    temp.innerText = Math.floor(data.main.temp - 273) 
    condition.innerText = data.weather[0].main

}


//close modal 
const crossClose = document.querySelector('.close-modal')
crossClose.addEventListener('click',()=>modalNews.style.display="none")
// newsletter meteo 

const btnMail = document.querySelector(".newsletter-meteo>button") ; 
const modalNews = document.querySelector('.modal-newsletter')
const mail = document.querySelector('.mail')
btnMail.addEventListener('click',()=>{
    modalNews.style.display ="flex"
    
})



//envoi de mail

function sendMail(params) {
    let tempParams = {
      from_name: "app-meto",
      to_name: "app-meteo",
      message: `J'attends la méteo du Dimanche ${mail.value}`,
    };
  
    emailjs
    .send("service_itor0ri", "template_uv1itjb", tempParams)
    .then((res) => {
        if(verification.test(mail.value)){
            alert("Message envoyé")
            mail.value=""
            modalNews.style.display="none"
        }else{
            alert("L'adresse email n'est pas correcte ")
        }
        
    })
  }
  const buttonSendmail = document.querySelector(".send-mail");
  buttonSendmail.addEventListener("click",(e)=>{
    e.preventDefault()
    sendMail();

  });


  
