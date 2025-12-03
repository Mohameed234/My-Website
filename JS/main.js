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
sr.reveal(`.tab`, {interval: 200})
sr.reveal(`.skills .container-skills h1` ,{origin: 'left'})
sr.reveal(`.skills .skill` ,{origin: 'left' , delay: 600 , interval: 100})
sr.reveal(`.skills .container-imges` ,{origin: 'right'})
sr.reveal(`.content-footer h2` ,{delay: 600} )
sr.reveal(`.content-footer p` )
sr.reveal(`.contact-list li` )
sr.reveal(`.contact-form` )


const roleSpan = document.querySelector('.container-text h3 span')
const phrases = ["Front End", "Back End", "Full Stack"]
let phraseIndex = 0
let charIndex = 0
let isDeleting = false
function tick(){
    if(!roleSpan) return
    const current = phrases[phraseIndex]
    roleSpan.textContent = current.substring(0, charIndex)
    if(!isDeleting){
        if(charIndex < current.length){
            charIndex++
            setTimeout(tick, 80)
        }else{
            setTimeout(()=>{ isDeleting = true; tick() }, 800)
        }
    }else{
        if(charIndex > 0){
            charIndex--
            setTimeout(tick, 50)
        }else{
            isDeleting = false
            phraseIndex = (phraseIndex + 1) % phrases.length
            setTimeout(tick, 300)
        }
    }
}
tick()

const tabs = document.querySelectorAll('.projects .tab')
const projectCards = document.querySelectorAll('.projects .project-card')
tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
        tabs.forEach(t=>t.classList.remove('active'))
        tab.classList.add('active')
        const filter = tab.dataset.filter
        projectCards.forEach(card=>{
            if(filter === 'all' || card.dataset.category === filter){
                card.classList.remove('hidden')
            }else{
                card.classList.add('hidden')
            }
        })
    })
})

const modal = document.getElementById('case-study-modal')
const modalImg = modal?.querySelector('.modal-image img')
const modalTitle = modal?.querySelector('.modal-title')
const modalDesc = modal?.querySelector('.modal-description')
const modalDemo = modal?.querySelector('.modal-demo')
const modalCode = modal?.querySelector('.modal-code')
const modalClose = modal?.querySelector('.modal-close')
const modalBadges = modal?.querySelector('.modal-badges')
const modalDetails = modal?.querySelector('.modal-details')

let lastFocus = null
function getFocusable(){
    if(!modal) return []
    return Array.from(modal.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'))
}
function openModal(){
    if(!modal) return
    lastFocus = document.activeElement
    modal.classList.add('open')
    document.body.style.overflow = 'hidden'
    modal.setAttribute('aria-hidden', 'false')
    setTimeout(()=>{ modalClose?.focus() }, 0)
}
function closeModal(){
    if(!modal) return
    modal.classList.remove('open')
    document.body.style.overflow = ''
    modal.setAttribute('aria-hidden', 'true')
    if(lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus()
}
modalClose?.addEventListener('click', closeModal)
modal?.addEventListener('click', (e)=>{ if(e.target === modal) closeModal() })
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal() })
modal?.addEventListener('keydown', (e)=>{
    if(e.key !== 'Tab') return
    const f = getFocusable()
    if(f.length === 0) return
    const first = f[0]
    const last = f[f.length - 1]
    const active = document.activeElement
    if(e.shiftKey && active === first){ e.preventDefault(); last.focus() }
    else if(!e.shiftKey && active === last){ e.preventDefault(); first.focus() }
})

projectCards.forEach(card=>{
    const btn = document.createElement('button')
    btn.className = 'case-study-btn'
    btn.textContent = 'Case Study'
    btn.addEventListener('click', ()=>{
        const img = card.querySelector('img')
        const title = card.querySelector('.project-text h5')
        const desc = card.querySelector('.project-text p')
        const demo = card.querySelector('a.demo')
        const code = Array.from(card.querySelectorAll('a')).find(a=>!a.classList.contains('demo'))
        const cat = card.dataset.category || ''
        const labelMap = { htmlcss: 'HTML & CSS', js: 'JavaScript', react: 'React', vue: 'Vue', laravel: 'Laravel', fullstack: 'Full Stack' }
        const techMap = { htmlcss: ['HTML','CSS'], js: ['JavaScript','HTML','CSS'], react: ['React'], vue: ['Vue'], laravel: ['Laravel','Blade','MySQL'], fullstack: ['Laravel','React'] }
        const techAttr = (card.dataset.tech || '').split(',').map(t=>t.trim()).filter(Boolean)
        const techList = techAttr.length ? techAttr : (techMap[cat] || [])

        if(modalImg){
            modalImg.src = img ? img.src : ''
            modalImg.alt = img ? img.alt : ''
        }
        if(modalTitle){ modalTitle.textContent = title ? title.textContent : '' }
        const descText = card.dataset.description || (desc ? desc.textContent : '')
        if(modalDesc){ modalDesc.textContent = descText }
        if(modalBadges){ modalBadges.innerHTML = techList.map(t=>`<span class="badge">${t}</span>`).join('') }
        if(modalDetails){
            const demoStatus = demo && demo.href ? 'Available' : 'Not available'
            const codeStatus = code && code.href ? 'Available' : 'Not available'
            modalDetails.innerHTML = `
                <li><strong>Category:</strong> ${labelMap[cat] || cat}</li>
                <li><strong>Demo:</strong> ${demoStatus}</li>
                <li><strong>Code:</strong> ${codeStatus}</li>
            `
        }

        if(modalDemo){
            if(demo && demo.href){
                modalDemo.style.display = ''
                modalDemo.href = demo.href
            }else{
                modalDemo.style.display = 'none'
                modalDemo.removeAttribute('href')
            }
        }
        if(modalCode){
            if(code && code.href){
                modalCode.style.display = ''
                modalCode.href = code.href
            }else{
                modalCode.style.display = 'none'
                modalCode.removeAttribute('href')
            }
        }
        openModal()
    })
    card.appendChild(btn)
})

const contactForm = document.getElementById('contact-form')
contactForm?.addEventListener('submit', (e)=>{
    e.preventDefault()
    const formData = new FormData(contactForm)
    const name = String(formData.get('name')||'').trim()
    const email = String(formData.get('email')||'').trim()
    const message = String(formData.get('message')||'').trim()
    const subjectInput = String(formData.get('subject')||'').trim()
    if(!name || !email || !message) return
    const subject = encodeURIComponent(subjectInput || `New message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:mohamedibrahimy911@gmail.com?subject=${subject}&body=${body}`
})

