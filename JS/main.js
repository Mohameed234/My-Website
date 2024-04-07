const menu = document.getElementById('menu');
const action = document.getElementById('actions');

menu.addEventListener('click', () => {
    hundleMenu()
});


function hundleMenu(){
    menu.classList.toggle("is-active")
    action.classList.toggle("is-active")
}


const homeLink = document.querySelector('.home-link')
const aboutLink = document.querySelector('.about-link')
const servicesLink = document.querySelector('.services-link')
const projectslink = document.querySelector('.projects-link')
const skillsLink = document.querySelector('.skills-link')
const contact = document.querySelector('.contact-link')


homeLink.addEventListener("click", ()=>{
    hundleMenu()
})
aboutLink.addEventListener("click", ()=>{
    hundleMenu()
})
servicesLink.addEventListener("click", ()=>{
    hundleMenu()
})
projectslink.addEventListener("click", ()=>{
    hundleMenu()
})
skillsLink.addEventListener("click", ()=>{
    hundleMenu()
})
contact.addEventListener("click", ()=>{
    hundleMenu()
})







const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 400,
    // reset: true,

})


sr.reveal(`.container-text`)
sr.reveal(`.home .container-imges img`)
sr.reveal(`.content .social` ,{delay: 600})
sr.reveal(`.about .container-imges` ,{origin: 'left'})
sr.reveal(`.about .container-texts` ,{origin: 'right'})
sr.reveal(`.services .card` ,{interval: 200})
sr.reveal(`.services h1`, )
sr.reveal(`.project-card` ,{interval: 200})
sr.reveal(`.projects h1`, )
sr.reveal(`.skills .container-skills h1` ,{origin: 'left'})
sr.reveal(`.skills .skill` ,{origin: 'left' , delay: 600 , interval: 100})
sr.reveal(`.skills .container-imges` ,{origin: 'right'})
sr.reveal(`.content-footer h2` ,{delay: 600} )
sr.reveal(`.content-footer p` )



