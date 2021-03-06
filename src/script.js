import { KEY } from "babel-dotenv"

const api = 'https://api.github.com/graphql'
const options = {
    method:'POST',
    headers:{
      'content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : `bearer ${KEY} `,
  
  },
    body: JSON.stringify({
        query : `
        {
          repositoryOwner(login: "IreAy0") {
            login
            repositories(last: 20) {
              nodes {
                forkCount
                name
                stargazerCount
                updatedAt
                description
                descriptionHTML
                primaryLanguage {
                  color
                  name
                }
              }
              totalCount
            }
            avatarUrl
            ... on User {
              id
              email
              avatarUrl
              bio
              bioHTML
              name
            }
          }
        }
        
        `,
        variables: {},
    }),
   
}
const repos = document.getElementById('repos')
const repoUl = document.getElementById('repoUl')
const profileCard = document.getElementById('profileCard');
const cardImg = document.getElementById('cardImg')
const nameEl = document.getElementById('name')
const username = document.getElementById('username')
const bio = document.getElementById('bio')
const bioSmall = document.getElementById('bioSmall')
const totalRepo = document.getElementById('totalRepo')
const avatarSmall = document.getElementById('avatar-small')
const optionsMenu =document.getElementById('options-menu')
const menu =document.getElementById('menu')
const navBtn = document.getElementById('navBtn')
const navMenu = document.getElementById('navMenu')

// getRepo()

// async function getRepo() {
//     const resp = await fetch(api, options);
//     const respData = await resp.json();
//     console.log(respData);

// getRepos(respData.data.repositoryOwner.repositories)
// getDetails(respData.data.repositoryOwner)
// }

fetch(api, options)
.then((resp) =>resp.json())
.then((data)=>{
  getRepos(data.data.repositoryOwner.repositories)
   getDetails(data.data.repositoryOwner)
  // console.log(data)
})

function diff_months(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24 * 7 * 4);
  return Math.abs(Math.round(diff));
  
 }
function diff_years(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff/365.25));
   
 }


function formatDate(date) {
  let presentDate = new Date()
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = presentDate - date;
 let diffMnth = diff_months(date, presentDate)
 let diffYears = diff_years(date, presentDate)
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = Math.round(diffSec / 60);
  let diffHour = Math.round(diffMin / 60);
  let diffDays = Math.round(diffSec / 3600 / 24);
  let diffWeeks = Math.round( diffMs / (7 * 24 * 60 * 60 * 1000))


  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'right now';
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`
  } else if (diffDays < 1) {
    return `${diffHour} hours ago`
  }
  else if(diffWeeks < 1 ){
    return ` ${diffDays} Day(s) ago`
  }
  else if (diffMnth <= 2){
    return `${diffWeeks} weeks ago`
  }
  else if (diffYears < 1){
    return `${diffMnth} months ago`
  }
  
   else {
    return `${dayOfMonth}.${month}.${year} `
  }
}
function getRepos(details) {
    // console.log(details)
    details.nodes.reverse().forEach(detail => {
       let myDate = new Date(detail.updatedAt)
    
    
      // console.log(myDate)
       let lng ='';// typeof(detail.primaryLanguage);
       let color = '';
       if(detail.primaryLanguage !== null) {
           lng = detail.primaryLanguage.name
           color= detail.primaryLanguage.color
           color = `<svg aria-hidden="true" class="h-4 md:h-6 " style="-ms-transform:rotate(360deg);-webkit-transform:rotate(360deg)" transform="rotate(360)" viewBox="0 0 16 16">
           <defs/>
           <path fill="${color}" fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8z"/>
           </svg>`;
       } 
       
       
        const repoEl = document.createElement('li');
       repoEl.classList.add('border-b', 'py-4')
        repoEl.innerHTML = `
        
      
        <div class="flex justify-between items-center">
           <div class="">
                <h5 id="repoName" class=" text-base md:text-lg leading-6  text-blue-700 dark:text-white font-bold">
                   ${detail.name}
                </h5>
                <div class="repoInfo mt-1">
                  <ul class="flex flex-wrap">
                    <li class="flex justify-center items-center text-xs lg:text-sm">
                      <span>
                      ${color}
                      
                      </span>
                        <span class="language ">
                        ${lng}

                        </span>
                    </li>
                    <li class="ml-4 flex justify-center items-center text-xs lg:text-sm">
                      <span>
                      <svg aria-hidden="true" class="h-4 " style="-ms-transform:rotate(360deg);-webkit-transform:rotate(360deg)" transform="rotate(360)" viewBox="0 0 24 24">
<defs/>
<path fill="#626262" fill-rule="evenodd" d="M12 0a1 1 0 011 1l3 6 7 1a1 1 0 010 1l-5 5 1 7a1 1 0 01-1 1l-6-4-6 4a1 1 0 01-1-1l1-7-5-5a1 1 0 010-1l7-1 3-6a1 1 0 011-1zm0 3L9 8 3 9l4 4a1 1 0 011 1l-1 6 5-3 5 3-1-6a1 1 0 011-1l4-4-6-1-3-5z"/>
</svg>
                      
                      </span>
                        <span class="starNumber ml-1">
                         ${detail.stargazerCount}

                        </span>
                    </li>
                     <li class="ml-4 flex justify-center items-center text-xs lg:text-sm">
                      <span>
                      <svg aria-hidden="true" class="h-4" style="-ms-transform:rotate(360deg);-webkit-transform:rotate(360deg)" transform="rotate(360)" viewBox="0 0 24 24">
<defs/>
<path fill="#626262" fill-rule="evenodd" d="M12 21a2 2 0 110-3 2 2 0 010 3zm-3-2a3 3 0 106 0 3 3 0 00-6 0zM6 7a2 2 0 110-4 2 2 0 010 4zM3 5a3 3 0 106 0 3 3 0 00-6 0zm15 2a2 2 0 110-4 2 2 0 010 4zm-3-2a3 3 0 107 0 3 3 0 00-7 0z"/>
<path fill="#626262" fill-rule="evenodd" d="M7 8v1a2 2 0 002 2h6a2 2 0 003-2V8h1v1a4 4 0 01-4 4H9a4 4 0 01-4-4V8h2z"/>
<path fill="#626262" fill-rule="evenodd" d="M11 16v-5h2v5h-2z"/>
</svg>
                      
                      </span>
                        <span class="forkNumber ml-1">
                         ${detail.forkCount}

                        </span>
                    </li>
                     <li class="ml-4 flex justify-center items-center text-xs lg:text-sm">
                      
                        <span class="forkNumber ml-1">
                        ${formatDate(myDate)}

                        </span>
                    </li>
                  </ul>
                </div>
                
            </div>
            <div class="flex-shrink-0">
                <div class="flex items-center justify-center text-sm py-3 px-2 h-6  rounded-md border border-gray-500">
                   <span>
                      <svg aria-hidden="true" class="h-4 " style="-ms-transform:rotate(360deg);-webkit-transform:rotate(360deg)" transform="rotate(360)" viewBox="0 0 24 24">
<defs/>
<path fill="#626262" fill-rule="evenodd" d="M12 0a1 1 0 011 1l3 6 7 1a1 1 0 010 1l-5 5 1 7a1 1 0 01-1 1l-6-4-6 4a1 1 0 01-1-1l1-7-5-5a1 1 0 010-1l7-1 3-6a1 1 0 011-1zm0 3L9 8 3 9l4 4a1 1 0 011 1l-1 6 5-3 5 3-1-6a1 1 0 011-1l4-4-6-1-3-5z"/>
</svg>
                      
                      </span>
                        <span class="starNumber ml-1">
                        ${detail.forkCount}

                        </span>
                </div>
            </div>
           
        </div>
  
        
        `

        repoUl.appendChild(repoEl)
    })
}

function getDetails(profileDetails) {
    const repoLen = profileDetails.repositories.nodes.length
    
    totalRepo.innerText = repoLen
 
    // console.log(profileDetails.name);
    cardImg.src =profileDetails.avatarUrl;
    cardImg.alt = profileDetails.name
    nameEl.innerText = profileDetails.name
username.innerText = profileDetails.login
bio.innerText = profileDetails.bio
bioSmall.innerText = profileDetails.bio
avatarSmall.src =profileDetails.avatarUrl;
avatarSmall.alt=profileDetails.name

}

optionsMenu.addEventListener('click',()=>{
    menu.classList.toggle('hidden')
})
navBtn.addEventListener('click',() =>{
    navMenu.classList.toggle('hidden')
})