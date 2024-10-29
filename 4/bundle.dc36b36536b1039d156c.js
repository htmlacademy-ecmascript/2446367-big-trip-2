(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,i="beforeend"){t.insertAdjacentElement(i,e.getElement())}function i(){return'\n    <section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>\n  '}class n{getTemplate(){return i}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}function s(){return'\n    <form class="trip-filters" action="#" method="get">\n       <div class="trip-filters__filter">\n         <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n         <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n       </div>\n\n       <div class="trip-filters__filter">\n         <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n         <label class="trip-filters__filter-label" for="filter-future">Future</label>\n       </div>\n\n       <div class="trip-filters__filter">\n         <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n         <label class="trip-filters__filter-label" for="filter-present">Present</label>\n       </div>\n\n       <div class="trip-filters__filter">\n         <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n         <label class="trip-filters__filter-label" for="filter-past">Past</label>\n       </div>\n\n       <button class="visually-hidden" type="submit">Accept filter</button>\n     </form>\n  '}class a{getTemplate(){return s}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}function r(){return'\n    <ul class="trip-events__list">\n    </ul>\n  '}class l{getTemplate(){return r}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const o=(e,t)=>e.find((e=>e.type===t)),c=(e,t)=>Array.isArray(t)?e.filter((e=>t.find((t=>e.id===t)))):e.find((e=>e.id===t)),d=()=>Math.random()<.5;class p{constructor({waypoints:e,offers:t,destinations:i}){this.waypoints=e,this.offers=t,this.destinations=i}getTemplate(){return function(e,t,i){const{type:n,dateFrom:s,dateTo:a,isFavorite:r,basePrice:l,offers:d,destination:p}=e,f=c(i,p),{name:v}=f;return`\n    <li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime=${s}>JUL 10</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${n}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${n} ${v}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime=${s}>10:30</time>\n            &mdash;\n            <time class="event__end-time" datetime=${a}>11:00</time>\n          </p>\n          <p class="event__duration">30M</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${l}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n          ${c(o(t,n).offers,d).map((e=>function({title:e,price:t}){return`\n    <li class="event__offer">\n      <span class="event__offer-title">${e}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${t}</span>\n    </li>\n  `}(e))).join("")}\n        </ul>\n        <button class="event__favorite-btn ${r&&"event_favorite-btn--active"}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>\n  `}(this.waypoints,this.offers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}function f(){return'\n    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>\n  '}class v{getTemplate(){return f}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const _=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaraunt"];class u{constructor({waypoints:e,offers:t,destinations:i}){this.waypoints=e,this.offers=t,this.destinations=i}getTemplate(){return function(e,t,i){const{id:n,type:s,basePrice:a,offers:r,destination:l}=e,d=o(t,s),p=c(i,l),{name:f}=p;return`\n    <li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-${n}">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${s}.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${n}" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n                  ${_.map((e=>function(e,t,i){return`\n    <div class="event__type-item">\n      <input id="event-type-${e}-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}" ${t===e&&"checked"}>\n      <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-${i}">${n=e,n[0].toUpperCase()+n.slice(1)}</label>\n    </div>\n  `;var n}(e,s,n))).join("")}\n              </fieldset>\n            </div>\n          </div>\n\n            <div class="event__field-group  event__field-group--destination">\n              <label class="event__label  event__type-output" for="event-destination-${n}">\n                ${s}\n              </label>\n              <input class="event__input  event__input--destination" id="event-destination-${n}" type="text" name="event-destination" value="${f}" list="destination-list-${n}">\n              <datalist id="destination-list-${n}">\n                ${i.map((e=>`<option value=${e.name}></option>`))}\n              </datalist>\n            </div>\n\n            <div class="event__field-group  event__field-group--time">\n              <label class="visually-hidden" for="event-start-time-${n}">From</label>\n              <input class="event__input  event__input--time" id="event-start-time-${n}" type="text" name="event-start-time" value="10/07/2019 10:00">\n              &mdash;\n              <label class="visually-hidden" for="event-end-time-${n}">To</label>\n              <input class="event__input  event__input--time" id="event-end-time-${n}" type="text" name="event-end-time" value="11/07/2019 10:00">\n            </div>\n\n            <div class="event__field-group  event__field-group--price">\n              <label class="event__label" for="event-price-${n}">\n                <span class="visually-hidden">Price</span>\n                &euro;\n              </label>\n              <input class="event__input  event__input--price" id="event-price-${n}" type="text" name="event-price" value="${a}">\n            </div>\n\n            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n            <button class="event__reset-btn" type="reset">Delete</button>\n            <button class="event__rollup-btn" type="button">\n              <span class="visually-hidden">Open event</span>\n            </button>\n          </header>\n          <section class="event__details">\n            ${function({offers:e},t){return 0!==e.length?`\n      <section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n        <div class="event__available-offers">\n          ${e.map((e=>function(e,t){const{id:i,title:n,price:s}=e;return`\n    <div class="event__offer-selector">\n      <input class="event__offer-checkbox  visually-hidden" id="${i}" type="checkbox" name="${i}" ${t.includes(i)?"checked":""}>\n      <label class="event__offer-label" for="${i}">\n        <span class="event__offer-title">${n}</span>\n        &plus;&euro;&nbsp;\n        <span class="event__offer-price">${s}</span>\n      </label>\n    </div>\n  `}(e,t))).join("")}\n        </div>\n      </section>\n    `:""}(d,r)}\n            ${function(e){const{description:t,pictures:i}=e||{};return t.length>0||i.length>0?`\n      <section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">${t}</p>\n\n        ${function(e){return e.length>0?`\n      <div class="event__photos-container">\n        <div class="event__photos-tape">\n          ${e.map((e=>function(e){const{src:t,description:i}=e;return`\n    <img class="event__photo" src=${t} alt=${i}>\n  `}(e))).join("")}\n        </div>\n      </div>\n    `:""}(i)}\n      </section>\n    `:""}(p)}\n          </section>\n        </form>\n      </li>\n  `}(this.waypoints,this.offers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const b=[{id:"f4b62099-293f-4c3d-a702-94eec4a2808c-001",basePrice:1100,dateFrom:"2019-07-10T22:55:56.845Z",dateTo:"2019-07-11T11:22:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcab-001",isFavorite:d(),offers:["b4c3e4e6-9053-42ce-b747-e281314baa31-014"],type:"flight"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808c-002",basePrice:2100,dateFrom:"2019-07-10T22:55:56.845Z",dateTo:"2019-07-11T11:22:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcab-002",isFavorite:d(),offers:["b4c3e4e6-9053-42ce-b747-e281314baa31-011"],type:"drive"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808c-003",basePrice:100,dateFrom:"2019-07-10T22:55:56.845Z",dateTo:"2019-07-11T11:22:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcab-004",isFavorite:d(),offers:["b4c3e4e6-9053-42ce-b747-e281314baa31-017"],type:"check-in"},{id:"f4b62099-293f-4c3d-a702-94eec4a2808c-003",basePrice:450,dateFrom:"2019-07-10T22:55:56.845Z",dateTo:"2019-07-11T11:22:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcab-005",isFavorite:d(),offers:["b4c3e4e6-9053-42ce-b747-e281314baa31-018","b4c3e4e6-9053-42ce-b747-e281314baa31-019"],type:"sightseeing"}],m=[{type:"taxi",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-001",title:"Upgrade to a comfort class",price:120},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-002",title:"Upgrade to a business class",price:200},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-003",title:"Upgrade to a business+ class",price:300}]},{type:"bus",offers:[]},{type:"train",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-005",title:"Upgrade to a business class",price:500},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-006",title:"Add lunch",price:50},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-007",title:"Add dinner",price:50}]},{type:"ship",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-008",title:"Add breakfast",price:500},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-009",title:"Upgrade to a comfort class",price:1e3},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-010",title:"Upgrade to a business class",price:2300}]},{type:"drive",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-011",title:"B-Class car",price:200},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-012",title:"C-Class car",price:1200},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-013",title:"E-Class car",price:2e3}]},{type:"flight",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-014",title:"Upgrade to a extra-space seat",price:100},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-015",title:"Upgrade to a business class",price:1200},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-016",title:"Upgrade to a first class",price:2e3}]},{type:"check-in",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-017",title:"Business class desk",price:50}]},{type:"sightseeing",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-018",title:"Tour guide",price:50},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-019",title:"Add brochure",price:10}]},{type:"restaurant",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-020",title:"Included dessert",price:10},{id:"b4c3e4e6-9053-42ce-b747-e281314baa31-021",title:"Included drink",price:10}]}],h=[{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcab-001",description:"Belgrade is the capital and largest city of Serbia.",name:"Belgrade",pictures:[{src:"https://loremflickr.com/248/152?random=3",description:"Belgrade parliament building"},{src:"https://loremflickr.com/248/152?random=5",description:"Belgrade building"}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcab-002",description:"Bor is a city and the administrative center of the Bor District in the Timok Valley in eastern Serbia.",name:"Bor",pictures:[]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcab-003",description:"Novi Pazar is a city located in southwestern Serbia.",name:"Novi Pazar",pictures:[{src:"https://loremflickr.com/248/152?random=3",description:"Novi building"},{src:"https://loremflickr.com/248/152?random=4",description:"Novi building"}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcab-004",description:"Loznica is a city located in the Mačva District of western Serbia.",name:"Loznica",pictures:[{src:"https://loremflickr.com/248/152?random=10",description:"Loznica building"},{src:"https://loremflickr.com/248/152?random=11",description:"Loznica building"},{src:"https://loremflickr.com/248/152?random=12",description:"Loznica building"}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcab-005",description:"Novi Sad is the second largest city in Serbia after the capital Belgrade",name:"Novi Sad",pictures:[{src:"https://loremflickr.com/248/152?random=20",description:"Novi Sad building"},{src:"https://loremflickr.com/248/152?random=21",description:"Novi Sad"},{src:"https://loremflickr.com/248/152?random=22",description:"Novi Sad"}]}],y=document.querySelector(".trip-main"),g=document.querySelector(".trip-controls__filters"),$=document.querySelector(".trip-events"),w=new class{waypoints=b;offers=m;destinations=h;getWaypoints(){return this.waypoints}getOffers(){return this.offers}getDestinations(){return this.destinations}},T=new class{headerComponent=new n;listFilterComponent=new a;constructor({headerContainer:e,listFiltersContainer:t}){this.headerContainer=e,this.listFiltersContainer=t}init(){t(this.headerComponent,this.headerContainer,"afterbegin"),t(this.listFilterComponent,this.listFiltersContainer)}}({headerContainer:y,listFiltersContainer:g}),C=new class{listContainer=new l;listSortView=new v;constructor({boardContainer:e,waypointModel:t}){this.boardContainer=e,this.waypointModel=t}init(){const e=this.waypointModel.getWaypoints(),i=this.waypointModel.getOffers(),n=this.waypointModel.getDestinations();this.boardWaypoints=[...e],t(this.listSortView,this.boardContainer),t(this.listContainer,this.boardContainer),t(new u({waypoints:this.boardWaypoints[0],offers:i,destinations:n}),this.listContainer.getElement());for(let e=1;e<this.boardWaypoints.length;e++)t(new p({waypoints:this.boardWaypoints[e],offers:i,destinations:n}),this.listContainer.getElement())}}({boardContainer:$,waypointModel:w});T.init(),C.init()})();
//# sourceMappingURL=bundle.dc36b36536b1039d156c.js.map