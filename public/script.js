

import {  apiKey } from './api.js';

// import {moment}  from '../node_modules/moment/ts3.1-typings/moment.d.ts';
// moment()


const api = 'https://api.github.com/graphql'
const options = {
    method:'POST',
    headers:{
      'content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization' : `bearer ${apiKey} `,
      // 'keys':'9a15f62e068bdc58336d10a0555ea4bb182e75f9'
  },
    body: JSON.stringify({
        query : `
        {
          repositoryOwner(login: "yabacoder") {
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

getRepo()

async function getRepo() {
    const resp = await fetch(api, options);
    const respData = await resp.json();
    console.log(respData);

getRepos(respData.data.repositoryOwner.repositories)
getDetails(respData.data.repositoryOwner)
}

function getRepos(details) {
    console.log(details)
    details.nodes.reverse().forEach(detail => {
       let myDate = new Date(detail.updatedAt)
    
      // m = moment(detail.updatedAt, 'YYYY-MM-DD')
      console.log(myDate)
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
                        updated on 1st of october

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
 
    console.log(profileDetails.name);
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